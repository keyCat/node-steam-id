import COMMUNITY_URL_VANITY_REGEXP from '../_lib/const/comunity-url-vanity-regexp';
import { SteamCommunityUrl } from '../types';

export default function isValidSteamVanityUrl(input: SteamCommunityUrl = ''): boolean {
  return COMMUNITY_URL_VANITY_REGEXP.test(input);
}
