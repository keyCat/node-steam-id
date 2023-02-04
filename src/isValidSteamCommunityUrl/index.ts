import COMMUNITY_URL_SIMPLE_REGEXP from '../_lib/const/community-url-simple-regexp';
import isValidSteamVanityUrl from '../isValidSteamVanityUrl';
import { SteamCommunityUrl } from '../types';

export default function isValidSteamCommunityUrl(input: SteamCommunityUrl = '', includeVanity = true): boolean {
  if (includeVanity) {
    return COMMUNITY_URL_SIMPLE_REGEXP.test(input) || isValidSteamVanityUrl(input);
  }
  return COMMUNITY_URL_SIMPLE_REGEXP.test(input);
}
