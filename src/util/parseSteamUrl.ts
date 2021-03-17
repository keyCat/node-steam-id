import {SteamCommunityUrl, SteamIDParts} from '../types';
import {COMMUNITY_URL_SIMPLE_REGEXP, COMMUNITY_URL_VANITY_REGEXP} from '../const';
import {httpQuery} from './http/httpQuery';
import {extractXMLValue} from './http/extractXMLValue';
import {parseSteam64} from './parseSteam64';
import {parseSteamUrlSync} from './parseSteamUrlSync';

export async function parseSteamUrl(url: SteamCommunityUrl = ''): Promise<SteamIDParts | null> {
    if (COMMUNITY_URL_SIMPLE_REGEXP.test(url)) {
        return parseSteamUrlSync(url);
    }

    const match = COMMUNITY_URL_VANITY_REGEXP.exec(url);
    if (match) {
        const type = match[1];
        const id = match[2];
        let host = 'steamcommunity.com';
        if (url.indexOf('steamchina') !== -1) {
            host = 'my.steamchina.com';
        }
        let qUrl: string;
        if (type === 'id') {
            qUrl = `https://${host}/id/${id}/?xml=1`;
        } else {
            qUrl = `https://${host}/${type}/${id}/memberslistxml/?xml=1`;
        }
        let responseBody = await httpQuery(qUrl);
        return parseSteam64(extractXMLValue(responseBody, type === 'id' ? 'steamID64' : 'groupID64'));
    }
    return null;
}