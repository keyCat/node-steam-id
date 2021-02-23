import {SteamIDInput} from '../types';
import {STEAM3_REGEXP} from '../const';

export default function isValidSteam3Input(value: SteamIDInput = ''): boolean {
    return STEAM3_REGEXP.test(value.toString());
}
