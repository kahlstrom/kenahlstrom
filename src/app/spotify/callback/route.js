import { cookies } from 'next/headers';
import {
  exchangeSpotifyCode,
  getSpotifyRedirectUri,
} from '@/utils/spotify';

/**
 * Handles the Spotify OAuth callback and displays the refresh token for env setup.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    return new Response(renderCallbackPage({
      title: 'Spotify authorization denied',
      message: `Spotify returned an error: ${error}`,
      isError: true,
    }), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      status: 400,
    });
  }

  const cookieStore = await cookies();
  const storedState = cookieStore.get('spotify_oauth_state')?.value;
  cookieStore.delete('spotify_oauth_state');

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(renderCallbackPage({
      title: 'Invalid Spotify callback',
      message: 'The authorization state did not match. Please try connecting again.',
      isError: true,
      showRetry: true,
    }), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      status: 400,
    });
  }

  try {
    const redirectUri = getSpotifyRedirectUri(request);
    const tokens = await exchangeSpotifyCode(code, redirectUri);

    return new Response(renderCallbackPage({
      title: 'Spotify connected',
      message: 'Copy the refresh token below into your environment variables as SPOTIFY_REFRESH_TOKEN, then redeploy or restart the dev server.',
      refreshToken: tokens.refreshToken,
    }), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    console.error('Spotify callback error:', err);

    return new Response(renderCallbackPage({
      title: 'Spotify connection failed',
      message: 'Could not exchange the authorization code for tokens. Check your client credentials and redirect URI.',
      isError: true,
      showRetry: true,
    }), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      status: 500,
    });
  }
}

/**
 * Renders a minimal setup page for the one-time Spotify OAuth flow.
 * @param {object} options
 * @returns {string}
 */
function renderCallbackPage({
  title,
  message,
  refreshToken,
  isError = false,
  showRetry = false,
}) {
  const accent = isError ? '#b91c1c' : '#15803d';

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        background: #0f172a;
        color: #e2e8f0;
        margin: 0;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
      }
      main {
        max-width: 720px;
        width: 100%;
        background: #1e293b;
        border: 1px solid #334155;
        border-radius: 8px;
        padding: 24px;
      }
      h1 {
        color: ${accent};
        font-size: 1.5rem;
        margin-top: 0;
      }
      p {
        line-height: 1.6;
        color: #cbd5e1;
      }
      code, pre {
        background: #0f172a;
        border: 1px solid #334155;
        border-radius: 6px;
      }
      pre {
        padding: 16px;
        overflow-x: auto;
        word-break: break-all;
        white-space: pre-wrap;
      }
      a {
        color: #4ade80;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${title}</h1>
      <p>${message}</p>
      ${refreshToken ? `<pre id="refresh-token">SPOTIFY_REFRESH_TOKEN=${refreshToken}</pre>` : ''}
      ${showRetry ? '<p><a href="/api/spotify/auth">Try connecting again</a></p>' : ''}
      <p><a href="/">Back to portfolio</a></p>
    </main>
  </body>
</html>`;
}
