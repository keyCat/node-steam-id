/**
 * Steam account types.
 * @url https://developer.valvesoftware.com/wiki/SteamID#Universes_Available_for_Steam_Accounts
 */
const ACCOUNT_UNIVERSE = {
  Invalid: 0,
  Public: 1,
  Beta: 2,
  Internal: 3,
  Dev: 4,
  RC: 5,
} as const;

export default ACCOUNT_UNIVERSE;
