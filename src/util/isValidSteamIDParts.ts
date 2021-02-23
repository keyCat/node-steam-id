import {SteamIDAccount, SteamIDInstance, SteamIDType, SteamIDUniverse} from '../types';
import {INSTANCE, TYPE, UNIVERSE} from '../const';

export default function isValidSteamIDParts(accountId: SteamIDAccount, instance: SteamIDInstance, type: SteamIDType, universe: SteamIDUniverse): boolean {
    if (type <= TYPE.Invalid || type > TYPE.AnonUser) {
        return false;
    }
    if (universe <= UNIVERSE.Invalid || universe > UNIVERSE.RC) {
        return false;
    }
    if (type === TYPE.Individual || type === TYPE.GameServer || type === TYPE.Clan) {
        if (accountId === 0) {
            return false;
        }
    }
    if (type === TYPE.Individual && instance === INSTANCE.WEB) {
        return false;
    }
    if (type === TYPE.Clan && instance !== INSTANCE.ALL) {
        return false;
    }

    return true;
}
