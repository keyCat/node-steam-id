import {SteamID64, SteamIDParts} from '../types';
import {Steam64} from '../Steam64';

export function partsToSteam64({accountId, instance, type, universe}: SteamIDParts): SteamID64 {
    const s64 = new Steam64()
        .setAccountID(accountId)
        .setInstance(instance)
        .setType(type)
        .setUniverse(universe);
    return s64.toString();
}
