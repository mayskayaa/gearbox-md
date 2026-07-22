import { CasesSection } from "@/components/sections/CasesSection";
import { ContactsSection } from "@/components/sections/ContactsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SpecSection } from "@/components/sections/SpecSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { BlockGap } from "@/components/ui/BlockGap";
import { Marquee } from "@/components/ui/Marquee";
import { getSiteSettings, getVisibleSectionsMap } from "@/db/queries";
import { parseSectionSpacing } from "@/lib/section-spacing";
import { getSectionContent, getSiteLocaleServer } from "@/lib/site-locale";

export default async function HomePage() {
  const locale = await getSiteLocaleServer();
  const [sectionsMap, settings] = await Promise.all([getVisibleSectionsMap(), getSiteSettings()]);
  const spacing = parseSectionSpacing(settings.sectionSpacing);

  const hero = getSectionContent(sectionsMap.hero, locale);
  const specialization = getSectionContent(sectionsMap.specialization, locale);
  const stats = getSectionContent(sectionsMap.stats, locale);
  const services = getSectionContent(sectionsMap.services, locale);
  const cases = getSectionContent(sectionsMap.cases, locale);
  const cta = getSectionContent(sectionsMap.cta, locale);
  const contacts = getSectionContent(sectionsMap.contacts, locale);
  const phone = contacts?.phones?.[0] || "";

  const blocks = [
    sectionsMap.hero
      ? {
          key: "hero",
          node: <HeroSection content={hero} locale={locale} phone={phone} />,
        }
      : null,
    sectionsMap.specialization
      ? {
          key: "specialization",
          node: (
            <>
              <SpecSection content={specialization} />
              {specialization?.tickerItems?.length ? <Marquee items={specialization.tickerItems} /> : null}
            </>
          ),
        }
      : null,
    sectionsMap.stats ? { key: "stats", node: <StatsSection content={stats} /> } : null,
    sectionsMap.services ? { key: "services", node: <ServicesSection content={services} /> } : null,
    sectionsMap.cases ? { key: "cases", node: <CasesSection content={cases} /> } : null,
    sectionsMap.cta ? { key: "cta", node: <CtaSection content={cta} phone={phone} /> } : null,
    sectionsMap.contacts
      ? { key: "contacts", node: <ContactsSection content={contacts} locale={locale} /> }
      : null,
  ].filter(Boolean);

  return (
    <>
      {blocks.map((block, index) => (
        <BlockGap
          key={block.key}
          sectionKey={block.key}
          spacing={spacing}
          isLast={index === blocks.length - 1}
        >
          {block.node}
        </BlockGap>
      ))}
    </>
  );
}
