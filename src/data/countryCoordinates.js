/**
 * Geographic coordinates (lon, lat) for visited countries
 * These will be converted to screen coordinates using D3's geoMercator projection
 * which matches the projection used by react-svg-worldmap
 */
export const countryCoordinates = {
  'United States': { lon: -95, lat: 37, name: 'United States' },
  'Canada': { lon: -106, lat: 56, name: 'Canada' },
  'Mexico': { lon: -102, lat: 23, name: 'Mexico' },
  'Bermuda': { lon: -64.75, lat: 32.3, name: 'Bermuda' },
  'Puerto Rico': { lon: -66.5, lat: 18.2, name: 'Puerto Rico' },
  'United Kingdom': { lon: -3, lat: 54, name: 'United Kingdom' },
  'Norway': { lon: 9, lat: 62, name: 'Norway' },
  'Sweden': { lon: 15, lat: 62, name: 'Sweden' },
  'Denmark': { lon: 10, lat: 56, name: 'Denmark' },
  'Finland': { lon: 26, lat: 64, name: 'Finland' },
  'Estonia': { lon: 26, lat: 59, name: 'Estonia' },
  'Lithuania': { lon: 24, lat: 55, name: 'Lithuania' },
  'Poland': { lon: 20, lat: 52, name: 'Poland' },
  'Germany': { lon: 10, lat: 51, name: 'Germany' },
  'Netherlands': { lon: 5.5, lat: 52.5, name: 'Netherlands' },
  'France': { lon: 2, lat: 46, name: 'France' },
  'Switzerland': { lon: 8, lat: 47, name: 'Switzerland' },
  'Austria': { lon: 14, lat: 47.5, name: 'Austria' },
  'Italy': { lon: 12.5, lat: 42.5, name: 'Italy' },
  'Spain': { lon: -4, lat: 40, name: 'Spain' },
  'Liechtenstein': { lon: 9.5, lat: 47.1, name: 'Liechtenstein' },
  'Ukraine': { lon: 32, lat: 49, name: 'Ukraine' },
  'Armenia': { lon: 45, lat: 40, name: 'Armenia' },
  'Israel': { lon: 35, lat: 31, name: 'Israel' },
  'Thailand': { lon: 101, lat: 15, name: 'Thailand' },
  'Maldives': { lon: 73, lat: 3.2, name: 'Maldives' }
};

export const visitedCountryNames = Object.keys(countryCoordinates);
