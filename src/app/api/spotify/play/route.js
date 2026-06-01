import { getSpotifyAccessToken } from '@/utils/spotify';

const SPOTIFY_PLAY_URL = 'https://api.spotify.com/v1/me/player/play';

/**
 * Starts playback of a track on the browser's Web Playback SDK device.
 */
export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { trackUri, deviceId } = body;

  if (!trackUri || !deviceId) {
    return Response.json(
      { error: 'trackUri and deviceId are required' },
      { status: 400 }
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

    const url = new URL(SPOTIFY_PLAY_URL);
    url.searchParams.set('device_id', deviceId);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: [trackUri],
      }),
    });

    if (response.status === 204) {
      return Response.json({ ok: true });
    }

    const errorBody = await response.text();
    console.error('Spotify play error:', response.status, errorBody);

    return Response.json(
      { error: 'Spotify rejected the playback request' },
      { status: response.status || 502 }
    );
  } catch (error) {
    console.error('Spotify play error:', error.message);
    return Response.json(
      { error: 'Failed to start playback' },
      { status: 500 }
    );
  }
}
