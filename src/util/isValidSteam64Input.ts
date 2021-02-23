import {SteamIDInput} from '../types';
import {FIRST_STEAM64} from '../const';
import bigInt from 'big-integer';

/**
 * Tests if string or number is a valid Steam64 id
 *
 * @param {string|BigInteger} value 76561198123456789
 * @returns {boolean}
 * */
export default function isValidSteam64Input(value: SteamIDInput = ''): boolean {
    return bigInt(value.toString()).geq(FIRST_STEAM64);
}
