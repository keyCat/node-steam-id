import { SteamIDAccount, SteamIDInstance, SteamIDType, SteamIDTypeChar, SteamIDUniverse } from '../types';
import ACCOUNT_TYPE from '../_lib/const/account-type';
import ACCOUNT_TYPE_CHAR from '../_lib/const/account-type-char';
import ACCOUNT_INSTANCE from '../_lib/const/account-instance';

export default function partsToSteam3(
  accountId: SteamIDAccount,
  instance: SteamIDInstance,
  type: SteamIDType,
  universe: SteamIDUniverse,
): string {
  let typeCh: keyof typeof ACCOUNT_TYPE_CHAR = 'i';
  let hasInstance = false;

  Object.keys(ACCOUNT_TYPE_CHAR).forEach((key) => {
    if (type === ACCOUNT_TYPE_CHAR[<SteamIDTypeChar>key]) {
      typeCh = <SteamIDTypeChar>key;
    }
  });

  switch (type) {
    case ACCOUNT_TYPE.Chat:
      if (instance & ACCOUNT_INSTANCE.FLAG_CLAN) {
        typeCh = 'c';
      } else if (instance & ACCOUNT_INSTANCE.FLAG_LOBBY) {
        typeCh = 'L';
      }
      break;
    case ACCOUNT_TYPE.AnonGameServer:
    case ACCOUNT_TYPE.Multiseat:
      hasInstance = true;
      break;
    case ACCOUNT_TYPE.Individual:
      hasInstance = instance !== ACCOUNT_INSTANCE.DESKTOP;
      break;
  }
  return `[${typeCh}:${universe}:${accountId}${
    hasInstance ? `:${instance}` : ''
  }]`;
}
