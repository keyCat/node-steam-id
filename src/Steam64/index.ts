import { SteamID64, SteamIDAccount, SteamIDInstance, SteamIDType, SteamIDUniverse } from '../types';

export default class Steam64 {
  private value: bigint = 0n;

  constructor(value?: SteamID64) {
    if (value) this.value = BigInt(value);
  }

  private setBinPart(value: number, offset: number, mask: number): void {
    const v = BigInt(value);
    const m = BigInt(mask);
    const o = BigInt(offset);
    this.value = (this.value & -((m << o) + 1n)) | ((v & m) << o);
  }

  private getBinPart(offset: number, mask: number): number {
    const m = BigInt(mask);
    const o = BigInt(offset);
    return Number((this.value >> o) & m);
  }

  public setAccountID(accountId: SteamIDAccount): this {
    this.setBinPart(accountId, 0, 0xFFFFFFFF);
    return this;
  }

  public setInstance(instance: SteamIDInstance): this {
    this.setBinPart(instance, 32, 0xFFFFF);
    return this;
  }

  public setType(type: SteamIDType): this {
    this.setBinPart(type, 52, 0xF);
    return this;
  }

  public setUniverse(universe: SteamIDUniverse): this {
    this.setBinPart(universe, 56, 0xFF);
    return this;
  }

  public getAccountID(): SteamIDAccount {
    return this.getBinPart(0, 0xFFFFFFFF);
  }

  public getInstance(): SteamIDInstance {
    return <SteamIDInstance>this.getBinPart(32, 0xFFFFF);
  }

  public getType(): SteamIDType {
    return <SteamIDType>this.getBinPart(52, 0xF);
  }

  public getUniverse(): SteamIDUniverse {
    return <SteamIDUniverse>this.getBinPart(56, 0xFF);
  }

  public toString(): string {
    return this.value.toString();
  }
}
