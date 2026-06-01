'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Initializes and controls the Spotify Web Playback SDK in the browser.
 * Uses the site owner's Premium account via server-issued access tokens.
 * @returns {{
 *   isReady: boolean,
 *   isInitializing: boolean,
 *   error: string | null,
 *   playingTrackId: string | null,
 *   playTrack: (trackUri: string, trackId: string) => Promise<void>,
 *   stopPlayback: () => Promise<void>,
 * }}
 */
export function useSpotifyPlayer() {
  const playerRef = useRef(null);
  const deviceIdRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState(null);
  const [playingTrackId, setPlayingTrackId] = useState(null);

  const getAccessToken = useCallback(async () => {
    const response = await fetch('/api/spotify/token');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to get Spotify access token');
    }

    return data.accessToken;
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initializePlayer = () => {
      if (!window.Spotify || playerRef.current) {
        return;
      }

      const player = new window.Spotify.Player({
        name: 'Ken Portfolio Player',
        getOAuthToken: (callback) => {
          getAccessToken()
            .then((token) => callback(token))
            .catch(() => callback(''));
        },
        volume: 0.8,
      });

      player.addListener('ready', ({ device_id }) => {
        if (!isMounted) {
          return;
        }

        deviceIdRef.current = device_id;
        setIsReady(true);
        setIsInitializing(false);
        setError(null);
      });

      player.addListener('not_ready', () => {
        if (!isMounted) {
          return;
        }

        setIsReady(false);
      });

      player.addListener('player_state_changed', (state) => {
        if (!isMounted) {
          return;
        }

        if (!state || state.paused) {
          setPlayingTrackId(null);
          return;
        }

        setPlayingTrackId(state.track_window?.current_track?.id ?? null);
      });

      player.addListener('initialization_error', ({ message }) => {
        if (!isMounted) {
          return;
        }

        setError(message);
        setIsInitializing(false);
      });

      player.addListener('authentication_error', ({ message }) => {
        if (!isMounted) {
          return;
        }

        setError(message);
        setIsReady(false);
        setIsInitializing(false);
      });

      player.addListener('account_error', () => {
        if (!isMounted) {
          return;
        }

        setError('Spotify Premium is required for in-browser playback.');
        setIsReady(false);
        setIsInitializing(false);
      });

      player.addListener('playback_error', ({ message }) => {
        console.error('Spotify playback error:', message);
      });

      player.connect();
      playerRef.current = player;
    };

    if (window.Spotify) {
      initializePlayer();
    } else {
      window.onSpotifyWebPlaybackSDKReady = initializePlayer;

      if (!document.getElementById('spotify-player-sdk')) {
        const script = document.createElement('script');
        script.id = 'spotify-player-sdk';
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);
      }
    }

    return () => {
      isMounted = false;
      playerRef.current?.disconnect();
      playerRef.current = null;
      deviceIdRef.current = null;
    };
  }, [getAccessToken]);

  const playTrack = useCallback(async (trackUri, trackId) => {
    const deviceId = deviceIdRef.current;

    if (!deviceId) {
      throw new Error('Spotify player is not ready');
    }

    const response = await fetch('/api/spotify/play', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trackUri, deviceId }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to start playback');
    }

    setPlayingTrackId(trackId);
  }, []);

  const stopPlayback = useCallback(async () => {
    await playerRef.current?.pause();
    setPlayingTrackId(null);
  }, []);

  return {
    isReady,
    isInitializing,
    error: error,
    playingTrackId,
    playTrack,
    stopPlayback,
  };
}
