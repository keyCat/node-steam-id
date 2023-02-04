import { SteamCommunityUrl, SteamIDParts } from '../types';
import parseSteamID from '../parseSteamID';
import COMMUNITY_URL_SIMPLE_REGEXP from '../_lib/const/community-url-simple-regexp';

export default function parseSteamUrlSync(url: SteamCommunityUrl = ''): SteamIDParts | null {
  const match = COMMUNITY_URL_SIMPLE_REGEXP.exec(url);
  if (!match) {
    return null;
  }
  return parseSteamID(match[1]);
}
