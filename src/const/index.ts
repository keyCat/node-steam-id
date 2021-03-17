export const POW2_32 = 2 ** 32;
export const FIRST_STEAM64 = BigInt('76561197960265729');

/**
 * Steam account types.
 * @url https://developer.valvesoftware.com/wiki/SteamID#Universes_Available_for_Steam_Accounts
 */
export const UNIVERSE = {
    Invalid: 0,
    Public: 1,
    Beta: 2,
    Internal: 3,
    Dev: 4,
    RC: 5,
} as const;
/**
 * Steam account types.
 * @url https://developer.valvesoftware.com/wiki/SteamID#Types_of_Steam_Accounts
 */
export const TYPE = {
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
export const TYPE_CHAR = {
    I: TYPE.Invalid,
    i: TYPE.Invalid,
    U: TYPE.Individual,
    M: TYPE.Multiseat,
    G: TYPE.GameServer,
    A: TYPE.AnonGameServer,
    P: TYPE.Pending,
    C: TYPE.ContentServer,
    g: TYPE.Clan,
    T: TYPE.Chat,
    L: TYPE.Chat,
    c: TYPE.Chat,
    a: TYPE.AnonUser,
} as const;
/**
 * Steam allows 3 simultaneous user account instances right now.
 */
export const INSTANCE = {
    ALL: 0,
    DESKTOP: 1,
    CONSOLE: 3,
    WEB: 4,
    FLAG_CLAN: 524288,
    FLAG_LOBBY: 262144,
    FLAG_MMSLOBBY: 131072,
} as const;

export const STEAM2_REGEXP = /^STEAM_([0-4]):([0-1]):([\d]{1,10})$/;
export const STEAM2_STABLE_REGEXP = /^([0-1]):([\d]{1,10})$/;
export const STEAM3_REGEXP = /^\[([AGMPCgcLTIUai]):([0-4]):([\d]{1,10})(?::(\d+))?\]$/;
export const COMMUNITY_URL_SIMPLE_REGEXP = /^https?:\/\/(?:my\.steamchina|steamcommunity)\.com\/(?:profiles|gid)\/(.+?)(?:\/|$)/;
export const COMMUNITY_URL_VANITY_REGEXP = /^https?:\/\/(?:my\.steamchina|steamcommunity)\.com\/(id|groups|games)\/([\w-]+)(?:\/|$)/;
