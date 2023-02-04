import { SteamIDAccount, SteamIDUniverse } from '../types';

export default function partsToSteam2(
  accountId: SteamIDAccount,
  universe: SteamIDUniverse,
): string {
  return `STEAM_${universe}:${accountId & 1}:${accountId >> 1}`;
}
