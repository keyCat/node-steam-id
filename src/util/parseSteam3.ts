import {SteamIDParts, SteamIDAccount, SteamIDInput, SteamIDInstance, SteamIDTypeChar, SteamIDUniverse} from '../types';
import {INSTANCE, STEAM3_REGEXP, TYPE, TYPE_CHAR} from '../const';
import isValidAccoundIDInput from './isValidAccoundIDInput';
import isValidSteamIDParts from './isValidSteamIDParts';

export default function parseSteam3(input: SteamIDInput = ''): SteamIDParts | null {
    let match: RegExpMatchArray | null;

    if (match = STEAM3_REGEXP.exec(input.toString())) {
        const typeCh = match[1];
        const type = TYPE_CHAR[match[1] as SteamIDTypeChar];
        const universe = parseInt(match[2]) as SteamIDUniverse;
        const accountId = parseInt(match[3]) as SteamIDAccount;
        let instance: SteamIDInstance = INSTANCE.ALL;

        if (typeCh === 'T' || typeCh === 'g') {
            instance = INSTANCE.ALL;
        }  else if (parseInt(match[4])) {
            instance = parseInt(match[4]) as SteamIDInstance;
        } else if (type === TYPE.Individual) {
            instance = INSTANCE.DESKTOP;
        } else if (typeCh === 'c') {
            instance = INSTANCE.FLAG_CLAN;
        } else if (typeCh === 'L') {
            instance = INSTANCE.FLAG_LOBBY;
        }

        if (!isValidAccoundIDInput(accountId) || !isValidSteamIDParts(accountId, instance, type, universe)) {
            return null;
        }

        return {accountId, instance, type, universe};
    } else {
        return  null;
    }
}
