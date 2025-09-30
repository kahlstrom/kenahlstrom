"use client";

import WorldMap from 'react-svg-worldmap';
import { visitedCountriesData } from '@/data/visitedCountries';

/**
 * BackgroundMap - Full-screen world map background
 * Optimized to be visible but not interfere with foreground content
 */
export default function BackgroundMap() {
  const mapStyling = {
    // Default country style (not visited)
    countryStrokeColor: '#334155', // slate-700
    countryStrokeWidth: 0.5,
    
    // Visited country style - more vibrant for background visibility
    color: '#fbbf24', // amber-400
    
    // Transparent background to show through
    backgroundColor: 'transparent',
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none  z-0">
      <div className="w-full max-w-[1400px] px-8">
        <WorldMap
          color={mapStyling.color}
          value-suffix="visited"
          size="xxl"
          data={visitedCountriesData}
          backgroundColor={mapStyling.backgroundColor}
          strokeOpacity={0.4}
          tooltipBgColor="transparent"
          tooltipTextColor="transparent"
          styleFunction={(context) => {
            const { countryValue, color } = context;
            const opacityLevel = 1.0;
            
            return {
              fill: countryValue ? color : '#475569', // amber for visited, slate-600 for not visited
              fillOpacity: opacityLevel,
              stroke: mapStyling.countryStrokeColor,
              strokeWidth: mapStyling.countryStrokeWidth,
              strokeOpacity: 0.6,
              cursor: 'default',
            };
          }}
        />
      </div>
    </div>
  );
}
