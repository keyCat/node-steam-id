import ACCOUNT_UNIVERSE from './_lib/const/account-universe';
import ACCOUNT_TYPE from './_lib/const/account-type';
import ACCOUNT_TYPE_CHAR from './_lib/const/account-type-char';
import ACCOUNT_INSTANCE from './_lib/const/account-instance';

export type SteamIDAccount = number;
export type SteamID2 = string;
export type SteamID3 = string;
export type SteamID64 = string;
export type SteamCommunityUrl = string;
export type SteamVanityUrlType = 'groups' | 'games' | 'id';
export type SteamIDInput =
  | SteamID2
  | SteamID3
  | SteamIDAccount
  | SteamID64
  | bigint;
export type SteamIDUniverse = (typeof ACCOUNT_UNIVERSE)[keyof typeof ACCOUNT_UNIVERSE];
export type SteamIDType = (typeof ACCOUNT_TYPE)[keyof typeof ACCOUNT_TYPE];
export type SteamIDTypeChar = keyof typeof ACCOUNT_TYPE_CHAR;
export type SteamIDInstance = (typeof ACCOUNT_INSTANCE)[keyof typeof ACCOUNT_INSTANCE];

export interface SteamIDParts {
  accountId: SteamIDAccount;
  type: SteamIDType;
  universe: SteamIDUniverse;
  instance: SteamIDInstance;
}
