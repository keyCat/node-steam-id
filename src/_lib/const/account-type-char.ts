import ACCOUNT_TYPE from './account-type';

export const ACCOUNT_TYPE_CHAR = {
  I: ACCOUNT_TYPE.Invalid,
  i: ACCOUNT_TYPE.Invalid,
  U: ACCOUNT_TYPE.Individual,
  M: ACCOUNT_TYPE.Multiseat,
  G: ACCOUNT_TYPE.GameServer,
  A: ACCOUNT_TYPE.AnonGameServer,
  P: ACCOUNT_TYPE.Pending,
  C: ACCOUNT_TYPE.ContentServer,
  g: ACCOUNT_TYPE.Clan,
  T: ACCOUNT_TYPE.Chat,
  L: ACCOUNT_TYPE.Chat,
  c: ACCOUNT_TYPE.Chat,
  a: ACCOUNT_TYPE.AnonUser,
} as const;

export default ACCOUNT_TYPE_CHAR;
