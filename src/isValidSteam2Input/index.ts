import { SteamIDInput } from '../types';
import STEAM2_REGEXP from '../_lib/const/steam2-regexp';
import STEAM2_STABLE_REGEXP from '../_lib/const/steam2-stable-regexp';

export default function isValidSteam2Input(
  value: SteamIDInput = '',
  strict: boolean = true,
): boolean {
  if (strict) {
    return STEAM2_REGEXP.test(value.toString());
  } else {
    return (
      STEAM2_REGEXP.test(value.toString()) ||
      STEAM2_STABLE_REGEXP.test(value.toString())
    );
  }
}
