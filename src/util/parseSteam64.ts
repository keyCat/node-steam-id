import {SteamIDParts, SteamIDInput, SteamIDInstance, SteamIDType, SteamIDUniverse} from '../types';
import bigInt from 'big-integer';
import getBinaryPart from './getBinaryPart';
import isValidSteam64Input from './isValidSteam64Input';
import isValidAccoundIDInput from './isValidAccoundIDInput';
import isValidSteamIDParts from './isValidSteamIDParts';

export default function parseSteam64(input: SteamIDInput = ''): SteamIDParts | null {
    if (!isValidSteam64Input(input)) {
        return null;
    }
    // UINT64
    const i64 = bigInt(input.toString());
    const accountId = getBinaryPart(i64, 0, 0xFFFFFFFF).valueOf();
    const instance = <SteamIDInstance>getBinaryPart(i64, 32, 0xFFFFF).valueOf();
    const type = <SteamIDType>getBinaryPart(i64, 52, 0xF).valueOf();
    const universe = <SteamIDUniverse>getBinaryPart(i64, 56, 0xFF).valueOf();

    if (!isValidAccoundIDInput(accountId) || !isValidSteamIDParts(accountId, instance, type, universe)) {
        return null;
    }

    return {accountId, instance, type, universe};
}
