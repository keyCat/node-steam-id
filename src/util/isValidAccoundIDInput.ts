import {SteamIDInput} from '../types';
import {POW2_32} from '../const';

function isValidIntString(value: string): boolean {
    return /^\d+$/.test(String(value));
}

export default function isValidAccoundIDInput(value: SteamIDInput = ''): boolean {
    if (typeof value === 'number') {
        return value >= 0 && value < POW2_32;
    } else {
        const num = parseInt(value.toString(), 10);
        return isValidIntString(value.toString()) && num >= 0 && num < POW2_32;
    }
}
