import {SteamIDAccount, SteamIDInstance, SteamIDType, SteamIDTypeChar, SteamIDUniverse} from '../types';
import {INSTANCE, TYPE, TYPE_CHAR} from '../const';

export function partsToSteam3(
    accountId: SteamIDAccount,
    instance: SteamIDInstance,
    type: SteamIDType,
    universe: SteamIDUniverse,
): string {
    let typeCh: keyof typeof TYPE_CHAR = 'i';
    let hasInstance = false;

    Object.keys(TYPE_CHAR).forEach((key) => {
        if (type === TYPE_CHAR[<SteamIDTypeChar>key]) {
            typeCh = <SteamIDTypeChar>key;
        }
    });

    switch (type) {
        case TYPE.Chat:
            if (instance & INSTANCE.FLAG_CLAN) {
                typeCh = 'c';
            } else if (instance & INSTANCE.FLAG_LOBBY) {
                typeCh = 'L';
            }
            break;
        case TYPE.AnonGameServer:
        case TYPE.Multiseat:
            hasInstance = true;
            break;
        case TYPE.Individual:
            hasInstance = instance !== INSTANCE.DESKTOP;
            break;
    }
    return `[${typeCh}:${universe}:${accountId}${hasInstance ? `:${instance}` : ''}]`;
}
