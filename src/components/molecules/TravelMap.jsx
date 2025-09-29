"use client";

import { motion } from 'framer-motion';
import WorldMap from 'react-svg-worldmap';
import { visitedCountriesData, visitedCountryNames, travelStats } from '@/data/visitedCountries';

/**
 * TravelMap - Interactive world map showing visited countries
 * Styled to match terminal aesthetic with amber highlights
 */
export default function TravelMap() {
  const mapStyling = {
    // Default country style (not visited)
    countryStrokeColor: '#334155', // slate-700
    countryStrokeWidth: 0.5,
    
    // Visited country style
    color: '#fbbf24', // amber-400
    
    // Background
    backgroundColor: '#0f172a', // slate-900
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-slate-800/50 border border-amber-400/30 rounded p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-amber-400 font-mono text-sm font-bold">TRAVEL LOG</h3>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-green-400">
            {travelStats.totalCountries} countries
          </span>
          <span className="text-cyan-400">
            {travelStats.continents.length} continents
          </span>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-slate-900/50 rounded p-4 border border-slate-700">
        {/* World Map */}
        <div className="w-full overflow-hidden rounded">
          <WorldMap
            color={mapStyling.color}
            value-suffix="visited"
            size="responsive"
            data={visitedCountriesData}
            backgroundColor={mapStyling.backgroundColor}
            strokeOpacity={0.3}
            tooltipBgColor="#1e293b"
            tooltipTextColor="#fbbf24"
            styleFunction={(context) => {
              const { countryValue, color, minValue, maxValue } = context;
              const opacityLevel = countryValue 
                ? 0.8  // Visited countries
                : 0.2; // Not visited countries
              
              return {
                fill: countryValue ? color : '#475569', // amber for visited, slate-600 for not visited
                fillOpacity: opacityLevel,
                stroke: mapStyling.countryStrokeColor,
                strokeWidth: mapStyling.countryStrokeWidth,
                strokeOpacity: 0.5,
                cursor: countryValue ? 'pointer' : 'default',
              };
            }}
          />
        </div>

        {/* Status Message */}
        <div className="mt-3 text-xs font-mono text-cyan-400 text-center">
          &gt; {travelStats.favoriteDestination}
        </div>
      </div>
    </motion.div>
  );
}