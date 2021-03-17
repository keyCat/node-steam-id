import {SteamIDParts, SteamIDInput, SteamIDUniverse} from '../types';
import {INSTANCE, STEAM2_REGEXP, TYPE, UNIVERSE} from '../const';
import {isValidAccoundIDInput} from './isValidAccoundIDInput';
import {isValidSteamIDParts} from './isValidSteamIDParts';

export function parseSteam2(value: SteamIDInput = ''): SteamIDParts | null {
    let match: RegExpMatchArray | null;

    if (match = STEAM2_REGEXP.exec(value.toString())) {
        // STEAM2
        let accountId = parseInt(match[3], 10);
        const authServer = parseInt(match[2], 10);
        const type = TYPE.Individual;
        const instance = INSTANCE.DESKTOP;
        let universe = parseInt(match[1], 10) as SteamIDUniverse;
        // games before Orange Box display universe as 0
        if (universe === UNIVERSE.Invalid) {
            universe = UNIVERSE.Public;
        }
        accountId = accountId << 1 | authServer;

        if (!isValidAccoundIDInput(accountId) || !isValidSteamIDParts(accountId, instance, type, universe)) {
            return null;
        }

        return {accountId, instance, type, universe};
    }

    return null;
}
