import { cookies } from 'next/headers';
import { buildSpotifyAuthUrl, getSpotifyRedirectUri } from '@/utils/spotify';

/**
 * Starts the Spotify OAuth flow by redirecting to Spotify's authorize page.
 */
export async function GET(request) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;

  if (!clientId) {
    return Response.json(
      { error: 'Spotify client ID is not configured' },
      { status: 503 }
    );
  }

  const state = crypto.randomUUID();
  const redirectUri = getSpotifyRedirectUri(request);
  const cookieStore = await cookies();

  cookieStore.set('spotify_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  });

  const authUrl = buildSpotifyAuthUrl(state, redirectUri);
  return Response.redirect(authUrl);
}
