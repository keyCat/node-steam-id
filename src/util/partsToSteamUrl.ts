import {SteamCommunityUrl, SteamIDParts} from '../types';
import {TYPE} from '../const';
import {partsToSteam64} from './partsToSteam64';

export function partsToSteamUrl({accountId, instance, type, universe}: SteamIDParts, china: boolean = false): SteamCommunityUrl {
    if (type === TYPE.Invalid) { return ''; }
    let base = china ? 'https://my.steamchina.com' : 'https://steamcommunity.com';
    let path = '';

    if (type === TYPE.Individual) {
        path = 'profiles';
    } else if (type === TYPE.Clan) {
        path = 'gid';
    } else {
        return '';
    }
    const id = partsToSteam64({accountId, instance, type, universe});

    return `${base}/${path}/${id}`;
}
