import { getSpotifyAccessToken } from '@/utils/spotify';

/**
 * Returns a short-lived Spotify access token for the Web Playback SDK.
 */
export async function GET() {
  if (!process.env.SPOTIFY_REFRESH_TOKEN) {
    return Response.json(
      { error: 'Spotify is not connected yet', needsAuth: true },
      { status: 503 }
    );
  }

  try {
    const accessToken = await getSpotifyAccessToken();

    if (!accessToken) {
      return Response.json(
        { error: 'Spotify is not connected yet', needsAuth: true },
        { status: 503 }
      );
    }

    return Response.json({ accessToken });
  } catch (error) {
    console.error('Spotify token error:', error.details ?? error.message);

    return Response.json(
      {
        error: 'Failed to get Spotify access token. Reconnect with playback scopes enabled.',
        needsAuth: true,
      },
      { status: 401 }
    );
  }
}
