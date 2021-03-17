import {STEAM2_REGEXP, STEAM2_STABLE_REGEXP} from '../const';
import {SteamIDInput} from '../types';

export function isValidSteam2Input(value: SteamIDInput = '', strict: boolean = true): boolean {
    if (strict) {
        return STEAM2_REGEXP.test(value.toString());
    } else {
        return STEAM2_REGEXP.test(value.toString()) || STEAM2_STABLE_REGEXP.test(value.toString());
    }
}
