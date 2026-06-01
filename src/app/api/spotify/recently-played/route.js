import {
  fetchRecentlyPlayedTracks,
  getSpotifyAccessToken,
  mapRecentlyPlayedTrack,
} from '@/utils/spotify';

export const revalidate = 300;

/**
 * Returns the user's 10 most recently played Spotify tracks.
 */
export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return Response.json(
      { error: 'Spotify API is not configured', needsAuth: false },
      { status: 503 }
    );
  }

  if (!process.env.SPOTIFY_REFRESH_TOKEN) {
    return Response.json(
      {
        error: 'Spotify is not connected yet',
        needsAuth: true,
      },
      { status: 503 }
    );
  }

  try {
    const accessToken = await getSpotifyAccessToken();

    if (!accessToken) {
      return Response.json(
        {
          error: 'Spotify is not connected yet',
          needsAuth: true,
        },
        { status: 503 }
      );
    }

    const items = await fetchRecentlyPlayedTracks(accessToken, 10);

    return Response.json({
      tracks: items.map(mapRecentlyPlayedTrack).filter(Boolean),
    });
  } catch (error) {
    console.error('Spotify API error:', error.details ?? error.message);

    if (error.code === 'SPOTIFY_TOKEN_REFRESH_FAILED') {
      return Response.json(
        {
          error:
            'Spotify token refresh failed. Use SPOTIFY_REFRESH_TOKEN (not the access token) from /spotify/callback and reconnect if needed.',
          needsAuth: true,
        },
        { status: 401 }
      );
    }

    if (error.code === 'SPOTIFY_RECENTLY_PLAYED_FAILED') {
      return Response.json(
        {
          error: 'Spotify rejected the recently played request. Try reconnecting your account.',
          needsAuth: error.status === 401 || error.status === 403,
        },
        { status: 502 }
      );
    }

    return Response.json(
      { error: 'Failed to fetch Spotify activity' },
      { status: 500 }
    );
  }
}
