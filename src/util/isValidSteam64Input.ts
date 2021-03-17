import {SteamIDInput} from '../types';
import {FIRST_STEAM64} from '../const';

/**
 * Tests if string or number is a valid Steam64 id
 *
 * @param {string|BigInteger} value 76561198123456789
 * @returns {boolean}
 * */
export function isValidSteam64Input(value: SteamIDInput = ''): boolean {
    return BigInt(value) >= FIRST_STEAM64;
}
