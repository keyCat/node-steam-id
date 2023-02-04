import { SteamIDInput, SteamIDParts } from '../types';
import Steam64 from '../Steam64';
import isValidAccountIDInput from '../isValidAccountIDInput';
import isValidSteam64Input from '../isValidSteam64Input';
import isValidSteamIDParts from '../isValidSteamIDParts';

export default function parseSteam64(
  input: SteamIDInput = '',
): SteamIDParts | null {
  if (!isValidSteam64Input(input)) {
    return null;
  }
  // UINT64
  const i64 = new Steam64(input.toString());
  const accountId = i64.getAccountID();
  const instance = i64.getInstance();
  const type = i64.getType();
  const universe = i64.getUniverse();

  if (
    !isValidAccountIDInput(accountId) ||
    !isValidSteamIDParts(accountId, instance, type, universe)
  ) {
    return null;
  }

  return { accountId, instance, type, universe };
}
