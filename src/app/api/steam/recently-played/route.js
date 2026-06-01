import { getGameIconUrl, getGameStoreUrl } from '@/utils/steam';

export const revalidate = 3600;

const STEAM_API_URL =
  'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/';

/**
 * Fetches recently played Steam games and returns sanitized public data.
 */
export async function GET() {
  const apiKey = process.env.STEAM_WEB_API_KEY;
  const steamId = process.env.STEAM_ID;

  if (!apiKey || !steamId) {
    return Response.json(
      { error: 'Steam API is not configured' },
      { status: 503 }
    );
  }

  try {
    const url = new URL(STEAM_API_URL);
    url.searchParams.set('key', apiKey);
    url.searchParams.set('steamid', steamId);
    url.searchParams.set('count', '10');

    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to fetch Steam activity' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const games = data?.response?.games ?? [];

    return Response.json({
      games: games.map((game) => ({
        appId: game.appid,
        name: game.name,
        playtime2Weeks: game.playtime_2weeks ?? 0,
        playtimeForever: game.playtime_forever ?? 0,
        iconUrl: game.img_icon_url
          ? getGameIconUrl(game.appid, game.img_icon_url)
          : null,
        storeUrl: getGameStoreUrl(game.appid),
      })),
    });
  } catch (error) {
    console.error('Steam API error:', error);
    return Response.json(
      { error: 'Failed to fetch Steam activity' },
      { status: 500 }
    );
  }
}
