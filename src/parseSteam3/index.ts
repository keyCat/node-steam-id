import { SteamIDAccount, SteamIDInput, SteamIDInstance, SteamIDParts, SteamIDTypeChar, SteamIDUniverse } from '../types';
import isValidAccountIDInput from '../isValidAccountIDInput';
import isValidSteamIDParts from '../isValidSteamIDParts';
import ACCOUNT_TYPE from '../_lib/const/account-type';
import ACCOUNT_TYPE_CHAR from '../_lib/const/account-type-char';
import ACCOUNT_INSTANCE from '../_lib/const/account-instance';
import STEAM3_REGEXP from '../_lib/const/steam3-regexp';

export default function parseSteam3(
  input: SteamIDInput = '',
): SteamIDParts | null {
  let match: RegExpMatchArray | null;

  if ((match = STEAM3_REGEXP.exec(input.toString()))) {
    const typeCh = match[1];
    const type = ACCOUNT_TYPE_CHAR[match[1] as SteamIDTypeChar];
    const universe = parseInt(match[2]) as SteamIDUniverse;
    const accountId = parseInt(match[3]) as SteamIDAccount;
    let instance: SteamIDInstance = ACCOUNT_INSTANCE.ALL;

    if (typeCh === 'T' || typeCh === 'g') {
      instance = ACCOUNT_INSTANCE.ALL;
    } else if (match[4]) {
      instance = parseInt(match[4]) as SteamIDInstance;
    } else if (type === ACCOUNT_TYPE.Individual) {
      instance = ACCOUNT_INSTANCE.DESKTOP;
    } else if (typeCh === 'c') {
      instance = ACCOUNT_INSTANCE.FLAG_CLAN;
    } else if (typeCh === 'L') {
      instance = ACCOUNT_INSTANCE.FLAG_LOBBY;
    }

    if (
      !isValidAccountIDInput(accountId) ||
      !isValidSteamIDParts(accountId, instance, type, universe)
    ) {
      return null;
    }

    return { accountId, instance, type, universe };
  } else {
    return null;
  }
}
