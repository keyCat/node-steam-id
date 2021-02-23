import {SteamIDInput} from '../types';
import isValidSteam2Input from './isValidSteam2Input';
import isValidSteam3Input from './isValidSteam3Input';
import isValidSteam64Input from './isValidSteam64Input';

export default function isValidSteamIDInput(value: SteamIDInput = ''): boolean {
    return isValidSteam2Input(value) || isValidSteam3Input(value) || isValidSteam64Input(value);
}
