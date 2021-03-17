import {SteamIDAccount, SteamIDUniverse} from '../types';

export function partsToSteam2(
    accountId: SteamIDAccount,
    universe: SteamIDUniverse,
): string {
    return `STEAM_${universe}:${accountId & 1}:${accountId >> 1}`;
}
