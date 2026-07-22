"use client";

import { MediaPickerField } from "@/components/admin/MediaPickerField";
import { MapConfigField } from "@/components/admin/MapConfigField";
import { FormSection } from "@/components/admin/ui/FormSection";

export const SECTION_LABELS = {
  hero: "Hero",
  specialization: "Специализация",
  stats: "Статистика",
  services: "Услуги",
  cases: "О компании / Оснащение",
  cta: "CTA",
  contacts: "Контакты",
  footer: "Футер",
};

export const SECTION_HELPERS = {
  hero: "Первый экран сайта: заголовок, кнопки и фоновое фото.",
  specialization: "Текст специализации и бегущая строка под hero.",
  stats: "Тёмные карточки с цифрами (пробег, гарантия и т.д.).",
  services: "Блок услуг с номерами и описаниями.",
  cases: "Блоки «О компании» и «Оснащение» с фото и статистикой/списком.",
  cta: "Тёмная плашка с записью на сервис и телефоном.",
  contacts: "Адрес, карта, телефоны, соцсети и форма заявки.",
  footer: "Логотип футера, навигация и копирайт.",
};

function Field({ label, value, onChange, multiline = false, helper }) {
  return (
    <label className="admin-label">
      {label}
      {helper ? <span className="admin-helper font-normal">{helper}</span> : null}
      {multiline ? (
        <textarea
          rows={3}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input focus-ring"
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input focus-ring"
        />
      )}
    </label>
  );
}

export function renderSectionFields(key, content, onChange) {
  switch (key) {
    case "hero":
      return (
        <div className="space-y-4">
          <FormSection title="Тексты" helper="Заголовок и подзаголовок первого экрана.">
            <Field label="Тег локации" value={content.locationTag} onChange={(v) => onChange({ locationTag: v })} helper="Мелкая строка над заголовком" />
            <Field label="Заголовок" value={content.title} onChange={(v) => onChange({ title: v })} multiline helper="Главный H1" />
            <Field label="Выделение в заголовке (красным)" value={content.titleHighlight} onChange={(v) => onChange({ titleHighlight: v })} />
            <Field label="Подзаголовок" value={content.subtitle} onChange={(v) => onChange({ subtitle: v })} multiline />
          </FormSection>
          <FormSection title="Кнопки" helper="CTA под заголовком.">
            <Field label="Текст кнопки" value={content.ctaText} onChange={(v) => onChange({ ctaText: v })} />
            <Field label="Текст второй кнопки" value={content.ctaSecondaryText} onChange={(v) => onChange({ ctaSecondaryText: v })} />
            <Field label="Ссылка CTA" value={content.ctaHref} onChange={(v) => onChange({ ctaHref: v })} />
          </FormSection>
          <FormSection title="Медиа" helper="Фоновое фото hero." tone="media">
            <MediaPickerField label="Фон" value={content.bgImageUrl} onChange={(v) => onChange({ bgImageUrl: v })} />
          </FormSection>
        </div>
      );
    case "specialization":
      return (
        <>
          <Field label="Лейбл" value={content.label} onChange={(v) => onChange({ label: v })} />
          <Field label="Текст" value={content.text} onChange={(v) => onChange({ text: v })} multiline />
          <Field label="Выделение" value={content.highlight} onChange={(v) => onChange({ highlight: v })} />
          <Field
            label="Бегущая строка (через запятую)"
            value={(content.tickerItems || []).join(", ")}
            onChange={(v) => onChange({ tickerItems: v.split(",").map((s) => s.trim()).filter(Boolean) })}
            multiline
          />
        </>
      );
    case "stats":
      return (content.items || []).map((item, i) => (
        <div key={i} className="space-y-3 rounded-lg border border-[var(--border-subtle)] p-4">
          <p className="text-xs font-bold text-[var(--accent)]">Карточка {i + 1}</p>
          <Field label="Тег (слева)" value={item.tag} onChange={(v) => {
            const items = [...content.items];
            items[i] = { ...items[i], tag: v };
            onChange({ items });
          }} />
          <Field label="Бейдж (справа)" value={item.badge} onChange={(v) => {
            const items = [...content.items];
            items[i] = { ...items[i], badge: v };
            onChange({ items });
          }} />
          <Field label="Значение" value={item.value} onChange={(v) => {
            const items = [...content.items];
            items[i] = { ...items[i], value: v };
            onChange({ items });
          }} />
          <Field label="Суффикс (+, мес...)" value={item.suffix} onChange={(v) => {
            const items = [...content.items];
            items[i] = { ...items[i], suffix: v };
            onChange({ items });
          }} />
          <Field label="Описание (перенос строки — Enter)" multiline value={item.description} onChange={(v) => {
            const items = [...content.items];
            items[i] = { ...items[i], description: v };
            onChange({ items });
          }} />
        </div>
      ));
    case "services":
      return (
        <>
          <Field label="Лейбл" value={content.label} onChange={(v) => onChange({ label: v })} />
          <Field label="Заголовок секции" value={content.title} onChange={(v) => onChange({ title: v })} />
          {(content.items || []).map((item, i) => (
            <div key={i} className="space-y-3 rounded-lg border border-[var(--border-subtle)] p-4">
              <p className="text-xs font-bold text-[var(--accent)]">Услуга {item.num || i + 1}</p>
              <Field label="Номер" value={item.num} onChange={(v) => {
                const items = [...content.items];
                items[i] = { ...items[i], num: v };
                onChange({ items });
              }} />
              <Field label="Название" value={item.title} onChange={(v) => {
                const items = [...content.items];
                items[i] = { ...items[i], title: v };
                onChange({ items });
              }} />
              <Field label="Описание" value={item.description} onChange={(v) => {
                const items = [...content.items];
                items[i] = { ...items[i], description: v };
                onChange({ items });
              }} multiline />
            </div>
          ))}
        </>
      );
    case "cases":
      return (content.items || []).map((item, i) => (
        <div key={i} className="space-y-3 rounded-lg border border-[var(--border-subtle)] p-4">
          <p className="text-xs font-bold text-[var(--accent)]">
            {item.variant === "bullets" ? "Оснащение" : "О компании"}
          </p>
          <Field label="Лейбл" value={item.label} onChange={(v) => {
            const items = [...content.items];
            items[i] = { ...items[i], label: v };
            onChange({ items });
          }} />
          <Field label="Заголовок" value={item.title} onChange={(v) => {
            const items = [...content.items];
            items[i] = { ...items[i], title: v };
            onChange({ items });
          }} />
          <Field label="Описание" value={item.description} onChange={(v) => {
            const items = [...content.items];
            items[i] = { ...items[i], description: v };
            onChange({ items });
          }} multiline />
          <MediaPickerField
            label="Изображение (общее для RU и RO)"
            value={item.imageUrl}
            onChange={(v) => {
              const items = [...content.items];
              items[i] = { ...items[i], imageUrl: v };
              onChange({ items });
            }}
          />
          {item.variant === "bullets" ? (
            <Field
              label="Список (каждый пункт с новой строки)"
              value={(item.bullets || []).join("\n")}
              onChange={(v) => {
                const items = [...content.items];
                items[i] = { ...items[i], bullets: v.split("\n").map((s) => s.trim()).filter(Boolean) };
                onChange({ items });
              }}
              multiline
            />
          ) : (
            <>
              <Field
                label="Цифры (через запятую)"
                value={(item.stats || []).join(", ")}
                onChange={(v) => {
                  const items = [...content.items];
                  items[i] = { ...items[i], stats: v.split(",").map((s) => s.trim()).filter(Boolean) };
                  onChange({ items });
                }}
              />
              <Field
                label="Подписи к цифрам (через запятую)"
                value={(item.statsLabels || []).join(", ")}
                onChange={(v) => {
                  const items = [...content.items];
                  items[i] = { ...items[i], statsLabels: v.split(",").map((s) => s.trim()).filter(Boolean) };
                  onChange({ items });
                }}
              />
            </>
          )}
        </div>
      ));
    case "cta":
      return (
        <>
          <Field label="Лейбл" value={content.label} onChange={(v) => onChange({ label: v })} />
          <Field label="Строка 1 заголовка" value={content.titleLine1} onChange={(v) => onChange({ titleLine1: v })} />
          <Field label="Строка 2 заголовка" value={content.titleLine2} onChange={(v) => onChange({ titleLine2: v })} />
          <Field label="Строка 3 (до красного)" value={content.titleLine3} onChange={(v) => onChange({ titleLine3: v })} />
          <Field label="Выделение в заголовке (красным)" value={content.titleHighlight} onChange={(v) => onChange({ titleHighlight: v })} />
          <Field label="Текст кнопки" value={content.buttonText} onChange={(v) => onChange({ buttonText: v })} />
        </>
      );
    case "contacts":
      return (
        <>
          <Field label="Лейбл" value={content.label} onChange={(v) => onChange({ label: v })} />
          <Field label="Заголовок" value={content.title} onChange={(v) => onChange({ title: v })} />
          <Field label="Адрес" value={content.address} onChange={(v) => onChange({ address: v })} />
          <MapConfigField value={content.map} onChange={(map) => onChange({ map })} />
          <Field label="Телефоны (через запятую)" value={(content.phones || []).join(", ")} onChange={(v) => onChange({ phones: v.split(",").map((p) => p.trim()).filter(Boolean) })} />
          <Field label="Email" value={content.email} onChange={(v) => onChange({ email: v })} />
          <Field label="Часы работы (будни)" value={content.hoursWeekday} onChange={(v) => onChange({ hoursWeekday: v })} />
          <Field label="Часы работы (суббота)" value={content.hoursSaturday} onChange={(v) => onChange({ hoursSaturday: v })} />
          <Field label="Viber URL" value={content.socials?.viber} onChange={(v) => onChange({ socials: { ...content.socials, viber: v } })} />
          <Field label="WhatsApp URL" value={content.socials?.whatsapp} onChange={(v) => onChange({ socials: { ...content.socials, whatsapp: v } })} />
          <Field label="Instagram URL" value={content.socials?.instagram} onChange={(v) => onChange({ socials: { ...content.socials, instagram: v } })} />
          <Field label="Facebook URL" value={content.socials?.facebook} onChange={(v) => onChange({ socials: { ...content.socials, facebook: v } })} />
          <Field label="Заголовок формы" value={content.formTitle} onChange={(v) => onChange({ formTitle: v })} />
        </>
      );
    case "footer":
      return (
        <>
          <MediaPickerField label="Логотип" value={content.logoUrl} onChange={(v) => onChange({ logoUrl: v })} />
          <Field label="Заголовок «Навигация»" value={content.navTitle} onChange={(v) => onChange({ navTitle: v })} />
          <Field label="Заголовок «Адрес»" value={content.addressTitle} onChange={(v) => onChange({ addressTitle: v })} />
          <Field
            label="Заголовок «Контакты»"
            value={content.contactsTitle}
            onChange={(v) => onChange({ contactsTitle: v })}
          />
          <Field
            label="Строка копирайта (после © год GearBox ATCC.)"
            value={content.copyrightLocation}
            onChange={(v) => onChange({ copyrightLocation: v })}
          />
          {(content.navLinks || []).map((link, i) => (
            <div key={i} className="space-y-3 rounded-lg border border-[var(--border-subtle)] p-4">
              <p className="text-xs font-bold text-[var(--accent)]">Ссылка {i + 1}</p>
              <Field
                label="Текст"
                value={link.label}
                onChange={(v) => {
                  const navLinks = [...(content.navLinks || [])];
                  navLinks[i] = { ...navLinks[i], label: v };
                  onChange({ navLinks });
                }}
              />
              <Field
                label="Href"
                value={link.href}
                onChange={(v) => {
                  const navLinks = [...(content.navLinks || [])];
                  navLinks[i] = { ...navLinks[i], href: v };
                  onChange({ navLinks });
                }}
              />
            </div>
          ))}
        </>
      );
    default:
      return <p className="text-sm text-[var(--text-secondary)]">Нет полей для этой секции</p>;
  }
}

