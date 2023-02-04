/**
 * Steam account types.
 * @url https://developer.valvesoftware.com/wiki/SteamID#Types_of_Steam_Accounts
 */
const ACCOUNT_TYPE = {
  Invalid: 0,
  Individual: 1,
  Multiseat: 2,
  GameServer: 3,
  AnonGameServer: 4,
  Pending: 5,
  ContentServer: 6,
  Clan: 7,
  Chat: 8,
  ConsoleUser: 9,
  AnonUser: 10,
  Max: 11,
} as const;

export default ACCOUNT_TYPE;
