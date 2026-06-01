const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_RECENTLY_PLAYED_URL =
  'https://api.spotify.com/v1/me/player/recently-played';

export const SPOTIFY_SCOPES = ['user-read-recently-played'];

/**
 * Resolves the Spotify OAuth redirect URI from env or the incoming request.
 * @param {Request} [request]
 * @returns {string}
 */
export function getSpotifyRedirectUri(request) {
  if (process.env.SPOTIFY_REDIRECT_URI) {
    return process.env.SPOTIFY_REDIRECT_URI;
  }

  if (request) {
    const host = request.headers.get('host');
    if (host) {
      const protocol = host.includes('localhost') || host.startsWith('127.0.0.1')
        ? 'http'
        : 'https';
      return `${protocol}://${host}/spotify/callback`;
    }
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/spotify/callback`;
  }

  return 'http://127.0.0.1:3000/spotify/callback';
}

/**
 * Builds the Spotify authorization URL for the OAuth flow.
 * @param {string} state - CSRF state token
 * @param {string} redirectUri
 * @returns {string}
 */
export function buildSpotifyAuthUrl(state, redirectUri) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: SPOTIFY_SCOPES.join(' '),
    state,
  });

  return `${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`;
}

/**
 * Exchanges an authorization code for Spotify access and refresh tokens.
 * @param {string} code
 * @param {string} redirectUri
 * @returns {Promise<{ accessToken: string, refreshToken: string, expiresIn: number }>}
 */
export async function exchangeSpotifyCode(code, redirectUri) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify client credentials are not configured');
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Spotify token exchange failed: ${errorBody}`);
  }

  const data = await response.json();

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

/**
 * Retrieves a Spotify access token using the stored refresh token.
 * @returns {Promise<string|null>}
 */
export async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh Spotify access token');
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Fetches the user's recently played tracks from Spotify.
 * @param {string} accessToken
 * @param {number} [limit=10]
 * @returns {Promise<Array>}
 */
export async function fetchRecentlyPlayedTracks(accessToken, limit = 10) {
  const url = new URL(SPOTIFY_RECENTLY_PLAYED_URL);
  url.searchParams.set('limit', String(limit));

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recently played tracks from Spotify');
  }

  const data = await response.json();
  return data.items ?? [];
}

/**
 * Formats a Spotify played_at timestamp into a relative time string.
 * @param {string} isoString
 * @returns {string}
 */
export function formatPlayedAt(isoString) {
  const date = new Date(isoString);
  const diffMinutes = Math.floor((Date.now() - date.getTime()) / 60000);

  if (diffMinutes < 1) {
    return 'just now';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Maps a Spotify recently-played item to a sanitized public track object.
 * @param {object} item
 * @returns {object}
 */
export function mapRecentlyPlayedTrack(item) {
  const track = item.track;
  const artistNames = track.artists?.map((artist) => artist.name).join(', ') ?? '';
  const albumImage = track.album?.images?.[2]?.url
    ?? track.album?.images?.[0]?.url
    ?? null;

  return {
    id: track.id,
    name: track.name,
    artists: artistNames,
    album: track.album?.name ?? '',
    playedAt: item.played_at,
    previewUrl: track.preview_url ?? null,
    spotifyUrl: track.external_urls?.spotify ?? null,
    albumImageUrl: albumImage,
  };
}
