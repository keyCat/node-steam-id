import {SteamCommunityUrl, SteamIDParts} from '../types';
import {COMMUNITY_URL_SIMPLE_REGEXP} from '../const';
import {parseSteamID} from './parseSteamID';

export function parseSteamUrlSync(url: SteamCommunityUrl = ''): SteamIDParts | null {
    const match = COMMUNITY_URL_SIMPLE_REGEXP.exec(url);
    if (!match) {
        return null;
    }
    return parseSteamID(match[1]);
}
