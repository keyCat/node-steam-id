import { SteamIDInput } from '../types';
import FIRST_STEAM64 from '../_lib/const/first-steam64';
import isValidIntString from '../_lib/isValidIntString';

/**
 * Tests if string or number is a valid Steam64 id
 *
 * @param {string|BigInteger} value 76561198123456789
 * @returns {boolean}
 * */
export default function isValidSteam64Input(value: SteamIDInput = ''): boolean {
  return isValidIntString(String(value)) && BigInt(value) >= FIRST_STEAM64;
}
