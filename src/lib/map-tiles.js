/** Carto Voyager — clean street style, closest free alternative to Google Maps. */
export const MAP_TILES = {
  url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: "abcd",
  maxZoom: 20,
};

export const MAP_ATTRIBUTION_HTML = `<a href="https://leafletjs.com" target="_blank" rel="noreferrer">Leaflet</a> | ${MAP_TILES.attribution}`;
