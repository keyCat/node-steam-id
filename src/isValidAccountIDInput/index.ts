import { SteamIDInput } from '../types';
import POW2_32 from '../_lib/const/pow-32';
import isValidIntString from '../_lib/isValidIntString';

export default function isValidAccountIDInput(
  value: SteamIDInput = '',
): boolean {
  if (typeof value === 'number') {
    return value >= 0 && value < POW2_32;
  } else {
    const num = parseInt(value.toString(), 10);
    return isValidIntString(value.toString()) && num >= 0 && num < POW2_32;
  }
}
