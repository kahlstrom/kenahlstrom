/**
 * Formats Steam playtime minutes into a compact human-readable string.
 * @param {number} minutes - Playtime in minutes
 * @returns {string}
 */
export function formatPlaytime(minutes) {
  if (!minutes || minutes <= 0) {
    return '0m';
  }

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours < 24) {
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  }

  return `${hours.toLocaleString()}h`;
}

/**
 * Builds the Steam CDN URL for a game's icon.
 * @param {number} appId - Steam application ID
 * @param {string} iconHash - Icon hash from the Steam API
 * @returns {string}
 */
export function getGameIconUrl(appId, iconHash) {
  return `https://media.steampowered.com/steamcommunity/public/images/apps/${appId}/${iconHash}.jpg`;
}

/**
 * Builds the Steam store URL for a game.
 * @param {number} appId - Steam application ID
 * @returns {string}
 */
export function getGameStoreUrl(appId) {
  return `https://store.steampowered.com/app/${appId}/`;
}
