/**
 * Visited countries data for react-svg-worldmap
 * Uses ISO 3166-1 alpha-2 country codes
 * Value of 1 indicates visited
 */
export const visitedCountriesData = [
  { country: 'us', value: 1 },  // United States
  { country: 'ua', value: 1 },  // Ukraine
  { country: 'th', value: 1 },  // Thailand
  { country: 'ca', value: 1 },  // Canada
  { country: 'mx', value: 1 },  // Mexico
  { country: 'bm', value: 1 },  // Bermuda
  { country: 'pr', value: 1 },  // Puerto Rico
  { country: 'gb', value: 1 },  // United Kingdom (England)
  { country: 'no', value: 1 },  // Norway
  { country: 'se', value: 1 },  // Sweden
  { country: 'dk', value: 1 },  // Denmark
  { country: 'fi', value: 1 },  // Finland
  { country: 'ee', value: 1 },  // Estonia
  { country: 'lt', value: 1 },  // Lithuania
  { country: 'fr', value: 1 },  // France
  { country: 'de', value: 1 },  // Germany
  { country: 'es', value: 1 },  // Spain
  { country: 'nl', value: 1 },  // The Netherlands
  { country: 'ch', value: 1 },  // Switzerland
  { country: 'at', value: 1 },  // Austria
  { country: 'it', value: 1 },  // Italy
  { country: 'li', value: 1 },  // Liechtenstein
  { country: 'am', value: 1 },  // Armenia
  { country: 'mv', value: 1 },  // The Maldives
  { country: 'pl', value: 1 },  // Poland
  { country: 'il', value: 1 }   // Israel
];

// Country names for display
export const visitedCountryNames = [
  'United States', 'Ukraine', 'Thailand', 'Canada', 'Mexico',
  'Bermuda', 'Puerto Rico', 'United Kingdom', 'Norway', 'Sweden',
  'Denmark', 'Finland', 'Estonia', 'Lithuania', 'France',
  'Germany', 'Spain', 'Netherlands', 'Switzerland', 'Austria',
  'Italy', 'Liechtenstein', 'Armenia', 'Maldives', 'Poland'
];

export const travelStats = {
  totalCountries: visitedCountriesData.length,
  continents: ['North America', 'Europe', 'Asia'],
  favoriteDestination: 'Always seeking the next adventure'
};
