import { SteamCommunityUrl, SteamIDParts } from '../types';
import partsToSteam64 from '../partsToSteam64';
import ACCOUNT_TYPE from '../_lib/const/account-type';

export default function partsToSteamUrl(
  { accountId, instance, type, universe }: SteamIDParts,
  china: boolean = false,
): SteamCommunityUrl {
  if (type === ACCOUNT_TYPE.Invalid) {
    return '';
  }
  let base = china ? 'https://my.steamchina.com' : 'https://steamcommunity.com';
  let path = '';

  if (type === ACCOUNT_TYPE.Individual) {
    path = 'profiles';
  } else if (type === ACCOUNT_TYPE.Clan) {
    path = 'gid';
  } else {
    return '';
  }
  const id = partsToSteam64({ accountId, instance, type, universe });

  return `${base}/${path}/${id}`;
}
