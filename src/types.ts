import {INSTANCE, TYPE, TYPE_CHAR, UNIVERSE} from './const';
import {BigInteger as LibBigInteger} from 'big-integer';

export type SteamIDAccount = number;
export type SteamID2 = string;
export type SteamID3 = string;
export type SteamID64 = string | BigInteger | LibBigInteger;
export type SteamIDInput = SteamID2 | SteamID3 | SteamIDAccount | SteamID64 | BigInteger | LibBigInteger;
export type SteamIDUniverse = typeof UNIVERSE[keyof typeof UNIVERSE];
export type SteamIDType = typeof TYPE[keyof typeof TYPE];
export type SteamIDTypeChar = keyof typeof TYPE_CHAR;
export type SteamIDInstance = typeof INSTANCE[keyof typeof INSTANCE];

export interface SteamIDParts {
    accountId: SteamIDAccount;
    type: SteamIDType;
    universe: SteamIDUniverse;
    instance: SteamIDInstance;
}
