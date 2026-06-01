'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { formatPlaytime } from '@/utils/steam';

/**
 * SteamActivity - Displays recently played Steam games from the last 2 weeks.
 */
export default function SteamActivity() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSteamActivity = async () => {
      try {
        const response = await fetch('/api/steam/recently-played');
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to load Steam activity');
          return;
        }

        setGames(data.games ?? []);
      } catch (err) {
        setError('Failed to load Steam activity');
        console.error('Error fetching Steam activity:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSteamActivity();
  }, []);

  if (loading) {
    return (
      <div className="border-0">
        <h3 className="text-cyan-900 font-mono text-lg font-bold mb-3">STEAM ACTIVITY</h3>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-cyan-100 rounded p-3 animate-pulse h-16" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-0">
        <h3 className="text-cyan-900 font-mono text-lg font-bold mb-3">STEAM ACTIVITY</h3>
        <p className="text-gray-600 text-sm font-mono">{error}</p>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="border-0">
        <h3 className="text-cyan-900 font-mono text-lg font-bold mb-3">STEAM ACTIVITY</h3>
        <p className="text-gray-600 text-sm font-mono">
          No games played in the last 2 weeks.
        </p>
      </div>
    );
  }

  return (
    <div className="border-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-cyan-900 font-mono text-lg font-bold">STEAM ACTIVITY</h3>
        <span className="text-xs font-mono text-cyan-700">Last 2 weeks</span>
      </div>

      <div className="space-y-3">
        {games.map((game, index) => (
          <motion.a
            key={game.appId}
            href={game.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="block bg-cyan-100 rounded p-3 border border-cyan-900/20 hover:bg-cyan-200 hover:border-cyan-900/40 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              {game.iconUrl ? (
                <img
                  src={game.iconUrl}
                  alt=""
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded flex-shrink-0"
                  loading="lazy"
                />
              ) : (
                <div className="w-8 h-8 rounded bg-cyan-200 flex-shrink-0" />
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-mono font-bold text-gray-900 group-hover:text-cyan-900 transition-colors truncate">
                    {game.name}
                  </h4>
                  <ExternalLinkIcon className="w-4 h-4 text-cyan-700 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs font-mono text-gray-600 mt-1">
                  {formatPlaytime(game.playtime2Weeks)} recently
                  <span className="text-gray-400 mx-1">·</span>
                  {formatPlaytime(game.playtimeForever)} total
                </p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <p className="text-xs font-mono text-gray-600 mt-3 italic">
        Recently played on Steam
      </p>
    </div>
  );
}
