/** Default location: Calea Ghidighici 4 (sector Buiucani), not Strada Ghidihici. */
export const SITE_LOCATION = {
  streetAddress: "Calea Ghidighici, 4",
  locality: { ru: "Кишинёв", ro: "Chișinău" },
  country: "MD",
  postalCode: "MD-2069",
  latitude: 47.05467,
  longitude: 28.77951,
};

export function formatSiteAddress(locale = "ru") {
  const city = locale === "ro" ? SITE_LOCATION.locality.ro : SITE_LOCATION.locality.ru;
  return `${city}, ${SITE_LOCATION.streetAddress}`;
}
