"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { geoMercator } from 'd3-geo';
import Airplane from '@/components/atoms/Airplane';
import { countryCoordinates, visitedCountryNames } from '@/data/countryCoordinates';

/**
 * FlightAnimation - Animates an airplane flying between visited countries
 * Shows arrival/departure messages as it travels
 * Uses D3's geoMercator projection to match react-svg-worldmap exactly
 */
export default function FlightAnimation() {
  const [fromCountry, setFromCountry] = useState(null);
  const [toCountry, setToCountry] = useState(null);
  const [message, setMessage] = useState('');
  const [isFlying, setIsFlying] = useState(false);

  // Create D3 projection matching react-svg-worldmap
  const projection = useMemo(() => geoMercator(), []);

  // Map dimensions - hardcoded to match BackgroundMap.jsx
  // size="xxl" = 1200px width, height = width * 0.75
  const mapWidth = 1200;
  const mapHeight = 900;
  
  // Debug: Log the actual map SVG position AND our overlay position
  useEffect(() => {
    const logPositions = () => {
      const mapSvg = document.querySelector('svg[width][height]');
      const overlayDiv = document.querySelector('div[style*="width: 1200px"]');
      
      if (mapSvg && overlayDiv) {
        const mapRect = mapSvg.getBoundingClientRect();
        const overlayRect = overlayDiv.getBoundingClientRect();
        const gTransform = mapSvg.querySelector('g')?.getAttribute('transform');
        
        console.log('📍 POSITION COMPARISON:', {
          map: {
            left: mapRect.left,
            top: mapRect.top,
            width: mapRect.width,
            height: mapRect.height
          },
          overlay: {
            left: overlayRect.left,
            top: overlayRect.top,
            width: overlayRect.width,
            height: overlayRect.height
          },
          offset: {
            x: overlayRect.left - mapRect.left,
            y: overlayRect.top - mapRect.top
          },
          gTransform: gTransform
        });
      }
    };
    
    setTimeout(logPositions, 500);
    setTimeout(logPositions, 1500); // Check again after animations
  }, []);

  // Get random country different from current
  const getRandomCountry = (exclude = null) => {
    const available = visitedCountryNames.filter(name => name !== exclude);
    return available[Math.floor(Math.random() * available.length)];
  };

  // Convert geo coordinates to screen position percentages
  // Matches react-svg-worldmap transform exactly
  const geoToScreen = (lon, lat, country) => {
    const coords = projection([lon, lat]);
    if (!coords) return { x: 50, y: 50 };
    
    const [x, y] = coords;
    
    // Map's transform: translate(0, 0) scale(1.25) translate(0, 240)
    // Apply in order: first translate(0,240), then scale by 1.25
    const scaleValue = (mapWidth / 960) * 1;
    const translatedY = y + 240;
    const scaledX = x * scaleValue;
    const scaledY = translatedY * scaleValue;
    
    // These are now in absolute pixels within the 1200x900 SVG
    // Convert to percentages for positioning
    const xPercent = (scaledX / mapWidth) * 100;
    const yPercent = (scaledY / mapHeight) * 100;
    
    console.log(`🛩️ ${country} [${lon}, ${lat}]:`, {
      raw: { x, y },
      afterTranslate: { x, y: translatedY },
      afterScale: { x: scaledX, y: scaledY },
      percent: { x: xPercent, y: yPercent },
      absolutePixels: { x: scaledX, y: scaledY },
      mapDims: { width: mapWidth, height: mapHeight }
    });
    
    return { x: xPercent, y: yPercent };
  };

  // Initialize with first flight - must not animate initially
  useEffect(() => {
    // Small delay to ensure component is mounted
    const initTimer = setTimeout(() => {
      const start = getRandomCountry();
      const destination = getRandomCountry(start);
      setFromCountry(start);
      setToCountry(destination);
      setIsFlying(false); // Start grounded at departure
      setMessage(`Departing from ${start}`);
      
      // After showing departure message, start flying
      setTimeout(() => {
        setIsFlying(true);
        setMessage('');
      }, 2000);
    }, 100);
    
    return () => clearTimeout(initTimer);
  }, []);

  // Handle flight sequence
  useEffect(() => {
    if (!isFlying || !toCountry) return;

    // Get geo coordinates and convert to screen positions
    const fromGeo = countryCoordinates[fromCountry];
    const toGeo = countryCoordinates[toCountry];
    const fromScreen = geoToScreen(fromGeo.lon, fromGeo.lat);
    const toScreen = geoToScreen(toGeo.lon, toGeo.lat);
    
    // Calculate flight duration based on screen distance
    const distance = Math.sqrt(
      Math.pow(toScreen.x - fromScreen.x, 2) + Math.pow(toScreen.y - fromScreen.y, 2)
    );
    const flightDuration = Math.max(3000, distance * 80); // Min 3s, scales with distance

    // Arrival message
    const arrivalTimer = setTimeout(() => {
      setIsFlying(false);
      setMessage(`Arriving in ${toCountry}`);
      
      // Departure message
      setTimeout(() => {
        setMessage(`Departing from ${toCountry}`);
        
        // Start next flight
        setTimeout(() => {
          const nextDestination = getRandomCountry(toCountry);
          setFromCountry(toCountry);
          setToCountry(nextDestination);
          setMessage('');
          setIsFlying(true);
        }, 2500);
      }, 2500);
    }, flightDuration);

    return () => clearTimeout(arrivalTimer);
  }, [isFlying, toCountry, fromCountry]);

  if (!fromCountry || !toCountry) return null;

  // Convert geographic coordinates to screen positions
  const fromGeo = countryCoordinates[fromCountry];
  const toGeo = countryCoordinates[toCountry];
  const from = geoToScreen(fromGeo.lon, fromGeo.lat, fromCountry);
  const to = geoToScreen(toGeo.lon, toGeo.lat, toCountry);
  
  console.log('Flight:', {
    from: fromCountry,
    to: toCountry,
    fromPos: from,
    toPos: to,
    isFlying
  });
  
  // Calculate angle for airplane rotation (nose pointing toward destination)
  // Add 90 degrees to align the airplane SVG nose correctly
  const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI) + 90;
  
  // Calculate flight duration for animation
  const distance = Math.sqrt(
    Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)
  );
  const flightDuration = Math.max(3, distance / 12);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
      {/* EXACT match to BackgroundMap container structure */}
      <div className="w-full max-w-[1400px] px-8">
        {/* Position layer matching the map SVG dimensions - NO extra div, NO extra padding */}
        <div className="relative" style={{ width: `${mapWidth}px`, height: `${mapHeight}px` }}>
          {/* Dashed flight path - using percentages */}
          {isFlying && (
            <svg className="absolute inset-0 w-full h-full">
              <motion.line
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="8 8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                opacity="0.6"
              />
            </svg>
          )}

          {/* Animated airplane - starts at departure, flies to arrival, stays at arrival */}
          <motion.div
            key={`${fromCountry}-${toCountry}`}
            className="absolute"
            initial={{ 
              left: `${from.x}%`,
              top: `${from.y}%`,
              rotate: angle,
              x: '-50%',
              y: '-50%'
            }}
            animate={{ 
              left: `${to.x}%`,
              top: `${to.y}%`,
              rotate: angle,
              x: '-50%',
              y: '-50%'
            }}
            transition={{ 
              duration: isFlying ? flightDuration : 0,
              ease: "linear"
            }}
            style={{ 
              filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))'
            }}
          >
            <Airplane className="text-green-400 w-8 h-8" />
          </motion.div>
        </div>
      </div>

      {/* Arrival/Departure messages */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-slate-800/95 backdrop-blur-sm border-2 border-green-400 rounded-lg px-6 py-3 shadow-2xl">
              <p className="text-green-300 font-mono text-lg font-bold whitespace-nowrap">
                {message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
