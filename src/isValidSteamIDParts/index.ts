import { SteamIDAccount, SteamIDInstance, SteamIDType, SteamIDUniverse } from '../types';
import ACCOUNT_UNIVERSE from '../_lib/const/account-universe';
import ACCOUNT_TYPE from '../_lib/const/account-type';
import ACCOUNT_INSTANCE from '../_lib/const/account-instance';

export default function isValidSteamIDParts(
  accountId: SteamIDAccount,
  instance: SteamIDInstance,
  type: SteamIDType,
  universe: SteamIDUniverse,
): boolean {
  if (type <= ACCOUNT_TYPE.Invalid || type > ACCOUNT_TYPE.AnonUser) {
    return false;
  }
  if (universe <= ACCOUNT_UNIVERSE.Invalid || universe > ACCOUNT_UNIVERSE.RC) {
    return false;
  }
  if (
    type === ACCOUNT_TYPE.Individual ||
    type === ACCOUNT_TYPE.GameServer ||
    type === ACCOUNT_TYPE.Clan
  ) {
    if (accountId === 0) {
      return false;
    }
  }
  if (type === ACCOUNT_TYPE.Individual && instance === ACCOUNT_INSTANCE.WEB) {
    return false;
  }
  if (type === ACCOUNT_TYPE.Clan && instance !== ACCOUNT_INSTANCE.ALL) {
    return false;
  }

  return true;
}
