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
      tracks: items.map(mapRecentlyPlayedTrack),
    });
  } catch (error) {
    console.error('Spotify API error:', error);
    return Response.json(
      { error: 'Failed to fetch Spotify activity' },
      { status: 500 }
    );
  }
}
