'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { formatPlayedAt } from '@/utils/spotify';
import { useSpotifyPlayer } from '@/hooks/useSpotifyPlayer';

/**
 * SpotifyActivity - Recently played tracks with Web Playback SDK controls.
 */
export default function SpotifyActivity() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [playbackError, setPlaybackError] = useState(null);
  const {
    isReady,
    isInitializing,
    error: playerError,
    playingTrackId,
    playTrack,
    stopPlayback,
  } = useSpotifyPlayer();

  useEffect(() => {
    const fetchSpotifyActivity = async () => {
      try {
        const response = await fetch('/api/spotify/recently-played');
        const data = await response.json();

        if (!response.ok) {
          setNeedsAuth(Boolean(data.needsAuth));
          setError(data.error || 'Failed to load Spotify activity');
          return;
        }

        setTracks(data.tracks ?? []);
      } catch (err) {
        setError('Failed to load Spotify activity');
        console.error('Error fetching Spotify activity:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotifyActivity();
  }, []);

  /**
   * Starts full-track playback via the Web Playback SDK.
   * @param {object} track
   */
  const handlePlay = async (track) => {
    setPlaybackError(null);

    try {
      await playTrack(track.uri, track.id);
    } catch (err) {
      console.error('Error playing track:', err);
      setPlaybackError(err.message || 'Failed to start playback');
    }
  };

  /**
   * Stops the current Web Playback SDK session.
   */
  const handleStop = async () => {
    setPlaybackError(null);

    try {
      await stopPlayback();
    } catch (err) {
      console.error('Error stopping playback:', err);
      setPlaybackError(err.message || 'Failed to stop playback');
    }
  };

  if (loading) {
    return (
      <div className="border-0">
        <h3 className="text-green-900 font-mono text-lg font-bold mb-3">SPOTIFY ACTIVITY</h3>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-green-100 rounded p-3 animate-pulse h-16" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-0">
        <h3 className="text-green-900 font-mono text-lg font-bold mb-3">SPOTIFY ACTIVITY</h3>
        <p className="text-gray-600 text-sm font-mono">{error}</p>
        {needsAuth && (
          <p className="text-sm font-mono mt-3">
            <a
              href="/api/spotify/auth"
              className="text-green-700 hover:text-green-900 underline"
            >
              Connect Spotify
            </a>
            {' '}to generate a refresh token for this site.
          </p>
        )}
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="border-0">
        <h3 className="text-green-900 font-mono text-lg font-bold mb-3">SPOTIFY ACTIVITY</h3>
        <p className="text-gray-600 text-sm font-mono">No recent tracks found.</p>
      </div>
    );
  }

  return (
    <div className="border-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-green-900 font-mono text-lg font-bold">SPOTIFY ACTIVITY</h3>
        <span className="text-xs font-mono text-green-700">Last 10 tracks</span>
      </div>

      {isInitializing && (
        <p className="text-xs font-mono text-gray-600 mb-3">
          Initializing Spotify player...
        </p>
      )}

      {playerError && (
        <p className="text-xs font-mono text-red-700 mb-3">
          {playerError}
          {' '}
          <a href="/api/spotify/auth" className="underline">
            Reconnect Spotify
          </a>
          {' '}if you recently updated playback permissions.
        </p>
      )}

      {playbackError && (
        <p className="text-xs font-mono text-red-700 mb-3">{playbackError}</p>
      )}

      <div className="space-y-3">
        {tracks.map((track, index) => {
          const isPlaying = playingTrackId === track.id;

          return (
            <motion.div
              key={`${track.id}-${track.playedAt}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-green-100 rounded p-3 border border-green-900/20"
            >
              <div className="flex items-center gap-3">
                {track.albumImageUrl ? (
                  <img
                    src={track.albumImageUrl}
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded flex-shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-10 h-10 rounded bg-green-200 flex-shrink-0" />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-sm font-mono font-bold text-gray-900 truncate">
                        {track.name}
                      </h4>
                      <p className="text-xs font-mono text-gray-600 truncate">
                        {track.artists}
                      </p>
                    </div>

                    {track.spotifyUrl && (
                      <a
                        href={track.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-700 hover:text-green-900 flex-shrink-0"
                        aria-label={`Open ${track.name} on Spotify`}
                      >
                        <ExternalLinkIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-2">
                    <p className="text-xs font-mono text-gray-500">
                      {formatPlayedAt(track.playedAt)}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handlePlay(track)}
                        disabled={!isReady}
                        className="px-2 py-1 text-xs font-mono rounded border border-green-800/30 text-green-900 hover:bg-green-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Play
                      </button>
                      {isPlaying && (
                        <button
                          type="button"
                          onClick={handleStop}
                          className="px-2 py-1 text-xs font-mono rounded border border-green-800/30 text-green-900 hover:bg-green-200 transition-colors"
                        >
                          Stop
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs font-mono text-gray-600 mt-3 italic">
        Recently played on Spotify · playback uses the Web Playback SDK
      </p>
    </div>
  );
}
