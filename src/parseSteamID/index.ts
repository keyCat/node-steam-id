import { SteamIDInput, SteamIDParts } from '../types';
import isValidSteam3Input from '../isValidSteam3Input';
import parseSteam64 from '../parseSteam64';
import parseSteam2 from '../parseSteam2';
import isValidSteam2Input from '../isValidSteam2Input';
import parseSteam3 from '../parseSteam3';

export default function parseSteamID(
  input: SteamIDInput = '',
): SteamIDParts | null {
  if (isValidSteam2Input(input)) {
    // STEAM2
    return parseSteam2(input);
  } else if (isValidSteam3Input(input)) {
    // STEAM3
    return parseSteam3(input);
  } else {
    // UINT64 or invalid format
    return parseSteam64(input);
  }
}
