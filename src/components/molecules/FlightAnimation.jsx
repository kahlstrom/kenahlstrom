"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { geoMercator } from 'd3-geo';
import Airplane from '@/components/atoms/Airplane';
import { countryCoordinates, visitedCountryNames } from '@/data/countryCoordinates';
import { getFlightTime, flightTimeToAnimationDuration } from '@/data/flightTimes';
import { getRandomFunFact } from '@/data/countryFunFacts';

/**
 * FlightAnimation - Animates an airplane flying between visited countries
 * Shows arrival/departure messages as it travels
 * Uses D3's geoMercator projection to match react-svg-worldmap exactly
 * Now fully responsive - adapts to any screen size
 */
export default function FlightAnimation() {
  const [fromCountry, setFromCountry] = useState(null);
  const [toCountry, setToCountry] = useState(null);
  const [message, setMessage] = useState('');
  const [isFlying, setIsFlying] = useState(false);
  const [layoverTime, setLayoverTime] = useState(0);
  const [flightDurationSeconds, setFlightDurationSeconds] = useState(0);
  const [funFact, setFunFact] = useState('');

  // Create D3 projection matching react-svg-worldmap
  const projection = useMemo(() => geoMercator(), []);

  // Container ref for measuring actual rendered dimensions
  const containerRef = useRef(null);
  
  // Map dimensions and position - dynamically measured from WorldMap SVG
  // Default: size="xxl" = 1200px width, height = width * 0.75
  const [mapDimensions, setMapDimensions] = useState({ 
    width: 1200, 
    height: 900,
    left: 0,
    top: 0
  });
  
  const mapWidth = mapDimensions.width;
  const mapHeight = mapDimensions.height;
  
  // Measure WorldMap SVG dimensions and position to perfectly overlay
  useEffect(() => {
    const updateDimensions = () => {
      // Find the BackgroundMap's WorldMap SVG element
      const mapContainer = document.querySelector('.fixed.inset-0.flex.items-center.justify-center.pointer-events-none.z-0');
      const worldMapSvg = mapContainer?.querySelector('svg');
      
      if (worldMapSvg) {
        // Measure the actual SVG element created by WorldMap
        const svgRect = worldMapSvg.getBoundingClientRect();
        const { width, height, left, top } = svgRect;
        
        if (width > 0 && height > 0) {
          setMapDimensions({ width, height, left, top });
          return;
        }
      }
      
      // Fallback: use default dimensions if SVG not found
      // This ensures the component works even if BackgroundMap isn't rendered yet
    };
    
    // Initial measurement with a small delay to ensure WorldMap renders
    const initialTimer = setTimeout(updateDimensions, 100);
    
    // Additional measurement for safety after longer delay
    const secondTimer = setTimeout(updateDimensions, 300);
    
    // Update on window resize
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      clearTimeout(initialTimer);
      clearTimeout(secondTimer);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Get random country different from current
  const getRandomCountry = (exclude = null) => {
    const available = visitedCountryNames.filter(name => name !== exclude);
    return available[Math.floor(Math.random() * available.length)];
  };

  // Convert geo coordinates to screen position percentages
  // Matches react-svg-worldmap transform exactly
  const geoToScreen = (lon, lat) => {
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
    
    return { x: xPercent, y: yPercent };
  };

  // Initialize with first flight
  useEffect(() => {
    const initTimer = setTimeout(() => {
      const start = getRandomCountry();
      const destination = getRandomCountry(start);
      const flightHours = getFlightTime(start, destination);
      const animDuration = flightTimeToAnimationDuration(flightHours);
      
      setFromCountry(start);
      setToCountry(destination);
      setFlightDurationSeconds(animDuration);
      setIsFlying(false);
      setMessage(`Departing ${start} for ${destination}: Travel time ${animDuration.toFixed(1)}s`);
      
      // Show departure message, then start flying
      setTimeout(() => {
        setIsFlying(true);
        setMessage(`Enroute to ${destination}: Travel time ${animDuration.toFixed(1)}s`);
      }, 3000);
    }, 100);
    
    return () => clearTimeout(initTimer);
  }, []);

  // Handle flight sequence with realistic timing
  useEffect(() => {
    if (!isFlying || !toCountry) return;

    const flightDurationMs = flightDurationSeconds * 1000;

    // Arrival message
    const arrivalTimer = setTimeout(() => {
      setIsFlying(false);
      // Update fromCountry immediately so airplane stays at destination during layover
      setFromCountry(toCountry);
      setMessage(`Arriving at ${toCountry}`);
      
      // Generate random layover time (2-60 seconds)
      const layover = Math.floor(Math.random() * 59) + 2;
      setLayoverTime(layover);
      
      // Get a random fun fact for this country
      const fact = getRandomFunFact(toCountry);
      setFunFact(fact);
      
      // Layover message
      setTimeout(() => {
        const nextDestination = getRandomCountry(toCountry);
        setMessage(`Layover in ${toCountry}. Departing for ${nextDestination} in ${layover}s`);
        
        // Countdown layover
        let remainingTime = layover;
        const countdownInterval = setInterval(() => {
          remainingTime--;
          if (remainingTime > 0) {
            setMessage(`Layover in ${toCountry}. Departing for ${nextDestination} in ${remainingTime}s`);
          }
        }, 1000);
        
        // Start next flight after layover
        setTimeout(() => {
          clearInterval(countdownInterval);
          setFunFact(''); // Clear fun fact when departing
          const nextFlightHours = getFlightTime(toCountry, nextDestination);
          const nextAnimDuration = flightTimeToAnimationDuration(nextFlightHours);
          
          // fromCountry is already set to toCountry upon arrival
          setToCountry(nextDestination);
          setFlightDurationSeconds(nextAnimDuration);
          setMessage(`Departing ${toCountry} for ${nextDestination}: Travel time ${nextAnimDuration.toFixed(1)}s`);
          
          setTimeout(() => {
            setIsFlying(true);
            setMessage(`Enroute to ${nextDestination}: Travel time ${nextAnimDuration.toFixed(1)}s`);
          }, 3000);
        }, layover * 1000);
      }, 2500);
    }, flightDurationMs);

    return () => clearTimeout(arrivalTimer);
  }, [isFlying, toCountry, fromCountry, flightDurationSeconds]);

  if (!fromCountry || !toCountry) return null;

  // Convert geographic coordinates to screen positions
  const fromGeo = countryCoordinates[fromCountry];
  const toGeo = countryCoordinates[toCountry];
  const from = geoToScreen(fromGeo.lon, fromGeo.lat);
  const to = geoToScreen(toGeo.lon, toGeo.lat);
  
  // Calculate angle for airplane rotation (nose pointing toward destination)
  // Add 90 degrees to align the airplane SVG nose correctly
  const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI) + 90;

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Overlay positioned exactly where WorldMap SVG is rendered */}
      <div 
        ref={containerRef}
        className="absolute" 
        style={{ 
          left: `${mapDimensions.left}px`,
          top: `${mapDimensions.top}px`,
          width: `${mapWidth}px`,
          height: `${mapHeight}px`
        }}
      >
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
              left: isFlying ? `${to.x}%` : `${from.x}%`,
              top: isFlying ? `${to.y}%` : `${from.y}%`,
              rotate: angle,
              x: '-50%',
              y: '-50%'
            }}
            transition={{ 
              duration: isFlying ? flightDurationSeconds : 0,
              ease: "linear"
            }}
            style={{ 
              filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))'
            }}
          >
            <Airplane className="text-green-400 w-8 h-8" />
          </motion.div>

          {/* Fun Fact Tooltip - appears during layover at the country location */}
          <AnimatePresence>
            {funFact && !isFlying && toCountry && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute pointer-events-none z-20"
                style={{
                  left: `${to.x}%`,
                  top: `${to.y}%`,
                  transform: 'translate(-50%, -120%)'
                }}
              >
                {/* Tooltip with pointer */}
                <div className="relative" style={{ maxWidth: '350px', minWidth: '280px' }}>
                  <div className="bg-amber-50 border-3 border-amber-600 rounded-xl px-5 py-4 shadow-2xl">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">💡</span>
                      <div>
                        <p className="text-amber-900 font-semibold text-sm mb-1">Did you know?</p>
                        <p className="text-slate-800 text-sm leading-relaxed">{funFact}</p>
                      </div>
                    </div>
                  </div>
                  {/* Pointer arrow */}
                  <div 
                    className="absolute left-1/2 transform -translate-x-1/2 -bottom-2"
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: '10px solid transparent',
                      borderRight: '10px solid transparent',
                      borderTop: '12px solid #d97706'
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      {/* Arrival/Departure messages - positioned at bottom */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
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
