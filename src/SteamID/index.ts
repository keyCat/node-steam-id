import {
  SteamCommunityUrl,
  SteamID2,
  SteamID3,
  SteamID64,
  SteamIDAccount,
  SteamIDInput,
  SteamIDInstance,
  SteamIDParts,
  SteamIDType,
  SteamIDUniverse,
} from '../types';
import Steam64 from '../Steam64';
import isValidSteam64Input from '../isValidSteam64Input';
import isValidSteam3Input from '../isValidSteam3Input';
import partsToSteam2 from '../partsToSteam2';
import parseSteam64 from '../parseSteam64';
import partsToSteam3 from '../partsToSteam3';
import isValidSteamIDParts from '../isValidSteamIDParts';
import parseSteam2 from '../parseSteam2';
import isValidSteam2Input from '../isValidSteam2Input';
import parseSteam3 from '../parseSteam3';
import parseSteamID from '../parseSteamID';
import parseSteamUrl from '../parseSteamUrl';
import partsToSteamUrl from '../partsToSteamUrl';
import isValidSteamCommunityUrl from '../isValidSteamCommunityUrl';

export default class SteamID {
  private steam64: Steam64 = new Steam64();

  public static isSteam2Input(input: SteamID2 = ''): boolean {
    return isValidSteam2Input(input);
  }

  public isSteam3Input(input: SteamID3 = ''): boolean {
    return isValidSteam3Input(input);
  }

  public static isSteam64Input(input: SteamID64 = ''): boolean {
    return isValidSteam64Input(input);
  }

  public static isSteamUrl(url: SteamCommunityUrl = '', includeVanity: boolean): boolean {
    return isValidSteamCommunityUrl(url, includeVanity);
  }

  public static fromValue(input: SteamIDInput = ''): SteamID {
    return new SteamID(input);
  }

  public static fromSteam2(input: SteamID2 = ''): SteamID {
    return new SteamID().setFromSteam2(input);
  }

  public static fromSteam3(input: SteamID3 = ''): SteamID {
    return new SteamID().setFromSteam3(input);
  }

  public static fromSteam64(input: SteamID64 = ''): SteamID {
    return new SteamID().setFromSteam64(input);
  }

  public static fromUrl(url: SteamCommunityUrl = ''): SteamID {
    return new SteamID().setFromUrl(url);
  }

  public constructor(input?: SteamIDInput) {
    if (input) {
      this.parse(input);
    }
  }

  public reset(): void {
    this.steam64 = new Steam64();
  }

  public parse(input: SteamIDInput = ''): void {
    const parts = parseSteamID(input);
    if (!parts) {
      return this.reset();
    }

    this.setFromParts(parts);
  }

  public isValid(): boolean {
    return isValidSteamIDParts(this.getAccountID(), this.getInstance(), this.getType(), this.getUniverse());
  }

  public getAccountID(): SteamIDAccount {
    return this.steam64.getAccountID();
  }

  public getInstance(): SteamIDInstance {
    return this.steam64.getInstance();
  }

  public getType(): SteamIDType {
    return this.steam64.getType();
  }

  public getUniverse(): SteamIDUniverse {
    return this.steam64.getUniverse();
  }

  public getParts(): SteamIDParts {
    return {
      accountId: this.getAccountID(),
      instance: this.getInstance(),
      type: this.getType(),
      universe: this.getUniverse(),
    };
  }

  public setAccountID(accountId: SteamIDAccount): this {
    this.steam64.setAccountID(accountId);
    return this;
  }

  public setInstance(instance: SteamIDInstance): this {
    this.steam64.setInstance(instance);
    return this;
  }

  public setType(type: SteamIDType): this {
    this.steam64.setType(type);
    return this;
  }

  public setUniverse(universe: SteamIDUniverse): this {
    this.steam64.setUniverse(universe);
    return this;
  }

  public setFromParts({ accountId, instance, type, universe }: SteamIDParts): this {
    return this
      .setAccountID(accountId)
      .setInstance(instance)
      .setType(type)
      .setUniverse(universe);
  }

  public setFromSteam2(input: SteamID2 = ''): this {
    const parts = parseSteam2(input);
    parts ? this.setFromParts(parts) : this.reset();

    return this;
  }

  public setFromSteam3(input: SteamID3 = ''): this {
    const parts = parseSteam3(input);
    parts ? this.setFromParts(parts) : this.reset();

    return this;
  }

  public setFromSteam64(input: SteamID64 = ''): this {
    const parts = parseSteam64(input);
    parts ? this.setFromParts(parts) : this.reset();

    return this;
  }

  public setFromUrl(url: SteamCommunityUrl = ''): this {
    const parts = parseSteamUrl(url);
    if (parts) {
      this.setFromParts(parts);
    } else {
      this.reset();
    }
    return this;
  }

  public toSteam2(): string {
    return partsToSteam2(this.getAccountID(), this.getUniverse());
  }

  public toSteam3(): string {
    return partsToSteam3(this.getAccountID(), this.getInstance(), this.getType(), this.getUniverse());
  }

  public toSteam64(): string {
    return this.toString();
  }

  public toCommunityUrl(): string {
    return partsToSteamUrl({
      accountId: this.getAccountID(),
      instance: this.getInstance(),
      type: this.getType(),
      universe: this.getUniverse(),
    });
  }

  public toString(): string {
    return this.steam64.toString();
  }
}
