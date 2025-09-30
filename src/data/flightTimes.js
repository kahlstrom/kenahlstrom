/**
 * Approximate flight times between countries in hours
 * Based on typical commercial flight durations
 * 
 * For countries not in the matrix, we'll calculate based on geographic distance
 */

// Average flight times in hours between major cities representing each country
export const flightTimeMatrix = {
  'United States': {
    'Canada': 3,
    'Mexico': 4,
    'Bermuda': 2.5,
    'Puerto Rico': 4,
    'United Kingdom': 7,
    'Norway': 8,
    'Sweden': 8.5,
    'Denmark': 8,
    'Finland': 9,
    'Estonia': 9,
    'Lithuania': 9,
    'Poland': 9,
    'Germany': 8.5,
    'Netherlands': 8,
    'France': 8,
    'Switzerland': 8.5,
    'Austria': 9,
    'Italy': 9.5,
    'Spain': 8.5,
    'Liechtenstein': 8.5,
    'Ukraine': 10,
    'Armenia': 12,
    'Israel': 11,
    'Thailand': 17,
    'Maldives': 18
  },
  'Canada': {
    'United States': 3,
    'Mexico': 5,
    'United Kingdom': 6.5,
    'Germany': 8,
    'France': 7.5
  },
  'Mexico': {
    'United States': 4,
    'Canada': 5,
    'Spain': 10.5
  },
  'United Kingdom': {
    'Norway': 2,
    'Sweden': 2.5,
    'Denmark': 2,
    'Finland': 3,
    'Estonia': 3,
    'Lithuania': 2.5,
    'Poland': 2.5,
    'Germany': 1.5,
    'Netherlands': 1,
    'France': 1.5,
    'Switzerland': 2,
    'Austria': 2,
    'Italy': 2.5,
    'Spain': 2.5,
    'Liechtenstein': 2
  },
  'Germany': {
    'United Kingdom': 1.5,
    'Norway': 2,
    'Sweden': 2,
    'Denmark': 1.5,
    'Finland': 2.5,
    'Estonia': 2.5,
    'Lithuania': 2,
    'Poland': 1.5,
    'Netherlands': 1,
    'France': 1.5,
    'Switzerland': 1,
    'Austria': 1,
    'Italy': 1.5,
    'Spain': 2.5,
    'Liechtenstein': 1,
    'Ukraine': 2.5,
    'Armenia': 4,
    'Israel': 4,
    'Thailand': 11,
    'Maldives': 10
  },
  'France': {
    'Spain': 2,
    'Italy': 2,
    'Switzerland': 1.5,
    'Germany': 1.5,
    'United Kingdom': 1.5
  },
  'Spain': {
    'France': 2,
    'Italy': 2.5,
    'Germany': 2.5,
    'United Kingdom': 2.5
  },
  'Italy': {
    'France': 2,
    'Spain': 2.5,
    'Germany': 1.5,
    'Austria': 1,
    'Switzerland': 1,
    'Greece': 2,
    'Israel': 3.5
  },
  'Poland': {
    'Germany': 1.5,
    'Lithuania': 1,
    'Estonia': 1.5,
    'Ukraine': 1.5
  },
  'Ukraine': {
    'Poland': 1.5,
    'Germany': 2.5,
    'Armenia': 2.5,
    'Israel': 3
  },
  'Norway': {
    'Sweden': 1,
    'Denmark': 1,
    'Finland': 1.5,
    'United Kingdom': 2
  },
  'Sweden': {
    'Norway': 1,
    'Denmark': 1,
    'Finland': 1,
    'Estonia': 1,
    'Lithuania': 1.5,
    'Germany': 2
  },
  'Finland': {
    'Sweden': 1,
    'Estonia': 0.5,
    'Norway': 1.5
  },
  'Estonia': {
    'Finland': 0.5,
    'Lithuania': 1,
    'Sweden': 1,
    'Poland': 1.5
  },
  'Lithuania': {
    'Estonia': 1,
    'Poland': 1,
    'Sweden': 1.5
  },
  'Thailand': {
    'Maldives': 3.5,
    'Israel': 9,
    'Germany': 11,
    'United Kingdom': 12,
    'United States': 17
  },
  'Maldives': {
    'Thailand': 3.5,
    'Israel': 6,
    'Germany': 10,
    'United States': 18
  },
  'Israel': {
    'Armenia': 2,
    'Ukraine': 3,
    'Italy': 3.5,
    'Germany': 4,
    'United Kingdom': 4.5,
    'United States': 11,
    'Thailand': 9
  },
  'Armenia': {
    'Israel': 2,
    'Ukraine': 2.5,
    'Germany': 4,
    'United States': 12
  }
};

/**
 * Get flight time in hours between two countries
 * Returns the stored value or estimates based on a default
 */
export function getFlightTime(from, to) {
  // Same country = 0 hours
  if (from === to) return 0;
  
  // Check direct route
  if (flightTimeMatrix[from]?.[to]) {
    return flightTimeMatrix[from][to];
  }
  
  // Check reverse route
  if (flightTimeMatrix[to]?.[from]) {
    return flightTimeMatrix[to][from];
  }
  
  // Default estimate: 2-8 hours for countries not in matrix
  // This is a reasonable average for intra-continental flights
  return 3 + Math.random() * 3; // 3-6 hours
}

/**
 * Convert flight time in hours to animation duration in seconds
 * 1 hour of real flight = 2 seconds of animation
 */
export function flightTimeToAnimationDuration(flightHours) {
  return flightHours * 2; // 2 seconds per hour
}
