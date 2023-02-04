/**
 * Steam allows 3 simultaneous user account instances right now.
 */
const ACCOUNT_INSTANCE = {
  ALL: 0,
  DESKTOP: 1,
  CONSOLE: 3,
  WEB: 4,
  FLAG_CLAN: 524288,
  FLAG_LOBBY: 262144,
  FLAG_MMSLOBBY: 131072,
} as const;

export default ACCOUNT_INSTANCE;
