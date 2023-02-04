import { SteamIDInput, SteamIDParts, SteamIDUniverse } from '../types';
import isValidAccountIDInput from '../isValidAccountIDInput';
import isValidSteamIDParts from '../isValidSteamIDParts';
import ACCOUNT_UNIVERSE from '../_lib/const/account-universe';
import ACCOUNT_TYPE from '../_lib/const/account-type';
import ACCOUNT_INSTANCE from '../_lib/const/account-instance';
import STEAM2_REGEXP from '../_lib/const/steam2-regexp';

export default function parseSteam2(
  value: SteamIDInput = '',
): SteamIDParts | null {
  let match: RegExpMatchArray | null;

  if ((match = STEAM2_REGEXP.exec(value.toString()))) {
    // STEAM2
    let accountId = parseInt(match[3], 10);
    const authServer = parseInt(match[2], 10);
    const type = ACCOUNT_TYPE.Individual;
    const instance = ACCOUNT_INSTANCE.DESKTOP;
    let universe = parseInt(match[1], 10) as SteamIDUniverse;
    // games before Orange Box display universe as 0
    if (universe === ACCOUNT_UNIVERSE.Invalid) {
      universe = ACCOUNT_UNIVERSE.Public;
    }
    accountId = (accountId << 1) | authServer;

    if (
      !isValidAccountIDInput(accountId) ||
      !isValidSteamIDParts(accountId, instance, type, universe)
    ) {
      return null;
    }

    return { accountId, instance, type, universe };
  }

  return null;
}
