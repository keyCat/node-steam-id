import {SteamID2, SteamID3, SteamID64, SteamIDAccount, SteamIDInput, SteamIDInstance, SteamIDType, SteamIDTypeChar, SteamIDUniverse} from './types';
import bigInt, {BigInteger} from 'big-integer';
import isValidSteam64Input from './util/isValidSteam64Input';
import isValidSteam3Input from './util/isValidSteam3Input';
import isValidSteam2Input from './util/isValidSteam2Input';
import {parseSteamID} from './util/parseSteamID';
import isValidSteamIDParts from './util/isValidSteamIDParts';
import getBinaryPart from './util/getBinaryPart';
import {setBinaryPart} from './util/setBinaryPart';
import parseSteam2 from './util/parseSteam2';
import parseSteam3 from './util/parseSteam3';
import parseSteam64 from './util/parseSteam64';
import {INSTANCE, TYPE, TYPE_CHAR} from './const';

export class SteamID {
    private steam64: BigInteger = bigInt(0);

    static isSteam2Input(input: SteamID2 = ''): boolean {
        return isValidSteam2Input(input);
    }

    static isSteam3Input(input: SteamID3 = ''): boolean {
        return isValidSteam3Input(input);
    }

    static isSteam64Input(input: SteamID64 = ''): boolean {
        return isValidSteam64Input(input);
    }

    static fromValue(input: SteamIDInput = ''): SteamID {
        return new SteamID(input);
    }

    static fromSteam2(input: SteamIDInput = ''): SteamID {
        const steamId = new SteamID();
        const parsed = parseSteam2(input);
        if (parsed) {
            steamId.setAccountID(parsed.accountId);
            steamId.setInstance(parsed.instance);
            steamId.setType(parsed.type);
            steamId.setUniverse(parsed.universe);
        }
        return steamId;
    }

    static fromSteam3(input: SteamIDInput = ''): SteamID {
        const steamId = new SteamID();
        const parsed = parseSteam3(input);
        if (parsed) {
            steamId.setAccountID(parsed.accountId);
            steamId.setInstance(parsed.instance);
            steamId.setType(parsed.type);
            steamId.setUniverse(parsed.universe);
        }
        return steamId;
    }

    static fromSteam64(input: SteamIDInput = ''): SteamID {
        const steamId = new SteamID();
        const parsed = parseSteam64(input);
        if (parsed) {
            steamId.setAccountID(parsed.accountId);
            steamId.setInstance(parsed.instance);
            steamId.setType(parsed.type);
            steamId.setUniverse(parsed.universe);
        }
        return steamId;
    }

    public constructor(input?: SteamIDInput) {
        if (input) this.parse(input);
    }

    public reset(): void {
        this.steam64 = bigInt(0);
    }

    public parse(input: SteamIDInput = ''): void {
        const parsed = parseSteamID(input);
        if (!parsed) return this.reset();

        this.setAccountID(parsed.accountId);
        this.setInstance(parsed.instance);
        this.setType(parsed.type);
        this.setUniverse(parsed.universe);
    }

    public isValid(): boolean {
        return isValidSteamIDParts(this.getAccountID(), this.getInstance(), this.getType(), this.getUniverse());
    }

    private get(offset: number, mask: number): BigInteger {
        return getBinaryPart(this.steam64, offset, mask);
    }

    public getAccountID(): SteamIDAccount {
        return this.get(0, 0xFFFFFFFF).valueOf();
    }

    public getInstance(): SteamIDInstance {
        return this.get(32, 0xFFFFF).valueOf() as SteamIDInstance;
    }

    public getType(): SteamIDType {
        return this.get(52, 0xF).valueOf() as SteamIDType;
    }

    public getUniverse(): SteamIDUniverse {
        return this.get(56, 0xFF).valueOf() as SteamIDUniverse;
    }

    private set(offset: number, mask: number, value: number): void {
        this.steam64 = setBinaryPart(this.steam64, offset, mask, value);
    }

    public setAccountID(accountId: SteamIDAccount): void {
        this.set(0, 0xFFFFFFFF, accountId);
    }

    public setInstance(instance: SteamIDInstance): void {
        this.set(32, 0xFFFFF, instance);
    }

    public setType(type: SteamIDType): void {
        this.set(52, 0xF, type);
    }

    public setUniverse(universe: SteamIDUniverse): void {
        this.set(56, 0xFF, universe);
    }

    public toSteam2(): string {
        const accountId = this.getAccountID();
        return `STEAM_${this.getUniverse()}:${accountId & 1}:${accountId >> 1}`;
    }

    public toSteam3(): string {
        const type = this.getType();
        let typeCh: keyof typeof TYPE_CHAR = 'i';
        let hasInstance = false;
        let instance = this.getInstance();

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
        return `[${typeCh}:${this.getUniverse()}:${this.getAccountID()}${hasInstance ? `:${instance}` : ''}]`;
    }

    public toSteam64(): string {
        return this.toString();
    }

    public toString(): string {
        return this.steam64.toString();
    }
}
