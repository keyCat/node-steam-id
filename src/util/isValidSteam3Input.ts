import {SteamIDInput} from '../types';
import {STEAM3_REGEXP} from '../const';

export function isValidSteam3Input(value: SteamIDInput = ''): boolean {
    return STEAM3_REGEXP.test(value.toString());
}
