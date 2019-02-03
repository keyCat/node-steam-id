'use strict';

const Long = require('long');

const POW2_32 = Long.fromString('4294967296');

/**
 * Reverse hash {a: '1'} to {1: 'a'}
 *
 * @param {Object} obj Hash
 * @returns {Object} Reversed hash
 * */
function reverseHash(obj = {}) {
    const reverse = {};
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; ++i) {
        reverse[obj[keys[i]]] = keys[i];
    }
    return reverse;
}

const UNIVERSE = {
    Invalid: 0,
    Public: 1,
    Beta: 2,
    Internal: 3,
    Dev: 4,
    Max: 5
};
const UNIVERSE_R = reverseHash(UNIVERSE);
const TYPE = {
    Invalid: 0,
    Individual: 1,
    Multiseat: 2,
    GameServer: 3,
    AnonGameServer: 4,
    Pending: 5,
    ContentServer: 6,
    Clan: 7,
    Chat: 8,
    ConsoleUser: 9,
    AnonUser: 10,
    Max: 11
};
const TYPE_R = reverseHash(TYPE);
const TYPE_CHAR = {
    I: TYPE.Invalid,
    U: TYPE.Individual,
    M: TYPE.Multiseat,
    G: TYPE.GameServer,
    A: TYPE.AnonGameServer,
    P: TYPE.Pending,
    C: TYPE.ContentServer,
    g: TYPE.Clan,
    T: TYPE.Chat,
    c: TYPE.Chat,
    L: TYPE.Chat,
    a: TYPE.AnonUser
};
const TYPE_CHAR_R = reverseHash(TYPE_CHAR);
const STEAM2_REGEXP = /^STEAM_([\d]):([0-1]):(\d+)$/;
const STEAM3_REGEXP = /^\[([IUMGAPCgTcLa]):(\d):(\d+)(:\d+)?\]$/;

class SteamID {
    /**
     *
     * @param {Number|String} value Steam32 (123456789)
     * @param {Number|String} value Steam64 (76561198123456789)
     * @param {Number|String} value Steam2 (STEAM_0:1:12345678)
     * @param {Number|String} value Steam3 ([U:1:123456789] or [U:1:123456789:0])
     * */
    constructor(value) {
        this.set(value);
    }

    set(value) {
        const val = SteamID.make(value);
        this.steam32 = null;
        this.steam64 = null;
        this.universe = SteamID.UNIVERSE.Invalid;
        this.type = SteamID.TYPE.Invalid;
        this.instance = 0;
        if (val) {
            this.steam32 = val.steam32;
            this.steam64 = val.steam64;
            this.universe = val.universe;
            this.type = val.type;
            this.instance = val.instance;

        }
        this.universeName = SteamID.UNIVERSE_R[this.universe];
        this.typeName = SteamID.UNIVERSE_R[this.type];
    }

    static make(base) {
        let type = SteamID.TYPE['Individual'];
        let universe = null;
        let reminder = null;
        let steam32 = null;
        let steam64 = null;
        let instance = null;
        if (SteamID.isSteam2(base)) {
            // if in Steam2 format
            const match = STEAM2_REGEXP.exec(base);
            universe = match[1];
            reminder = match[2];
            instance = 1;
            // Games before orange box used to incorrectly display universe as 0, fix that
            if (universe === '0') {
                universe = 1;
            }
            steam32 = Long.fromString(match[3])
                .shiftLeft(1)
                .or(reminder)
                .toString();
        }
        else if (SteamID.isSteam3(base)) {
            // if in Steam3 format
            const match = STEAM3_REGEXP.exec(base);
            type = SteamID.TYPE_CHAR[match[1]];
            universe = match[2];
            steam32 = match[3];
            instance = match[4];
            if (instance) {
                instance = instance.replace(':', '');
            }
            else if (type === SteamID.TYPE.Individual || type === SteamID.TYPE.GameServer) {
                instance = 1;
            }
            else {
                instance = 0;
            }
        }
        else {
            // assuming 32 or 64 bit numeric value
            if (parseInt(base) < 1) {
                return null;
            }
            if (!/^\d+$/.test(String(base))) {
                // contains letters
                return null;
            }
            const num = Long.fromString(base);
            // 32-bit account id
            if (SteamID.is32(base)) {
                type = SteamID.TYPE.Individual;
                universe = SteamID.UNIVERSE.Public;
                steam32 = num.toString();
            }
            // 64-bit account id
            else if (SteamID.is64(base)) {
                type = num.shiftRight(52).and(0xF).toString();
                universe = num.shiftRight(56).and(0xFF).toString();
                steam32 = num.and(0xffffffff).toString();
                steam64 = num.toString();
            }
        }

        universe = parseInt(universe);
        type = parseInt(type);
        instance = parseInt(instance);
        if (!instance) {
            instance = (type === SteamID.TYPE.Individual || type === SteamID.TYPE.GameServer) ? 1 : 0;
        }
        if (!steam64) {
            steam64 = Long.fromString(Long.fromInt(universe).shiftLeft(56).toString())
                .or(Long.fromInt(type).shiftLeft(52).toString())
                .or(Long.fromInt(instance).shiftLeft(32).toString())
                .or(Long.fromString(steam32))
                .toString();
        }

        return { type, universe, instance, steam32, steam64 };
    }

    /**
     * Returns 32-bit string representation
     *
     * @returns {String} 123456789
     * */
    toSteam32() {
        if (!this.steam32) { return ''; }
        return this.steam32.toString();
    }

    /**
     * Returns 64-bit string representation
     *
     * returns {String} 76561198123456789
     * */
    toSteam64() {
        if (!this.steam64) { return ''; }
        return this.steam64.toString();
    }

    /**
     * Returns Steam2 string
     *
     * @returns {String} STEAM_0:1:12345678, null if SteamID is invalid
     * */
    toSteam2() {
        if (!this.steam32) { return ''; }
        return `STEAM_${this.universe}:${this.steam32 % 2}:${Long.fromString(this.steam32).shiftRight(1).toString()}`;
    }

    /**
     * Returns Steam3 string
     *
     * @returns {String} [U:1:123456789] or [U:1:123456789:0], null if SteamID is invalid
     * */
    toSteam3() {
        if (!this.steam32) { return ''; }
        if (this.type === SteamID.TYPE.AnonGameServer) {
            return `[${SteamID.TYPE_CHAR_R[this.type]}:${this.universe}:${this.steam32}:${this.instance}]`;
        }
        return `[${SteamID.TYPE_CHAR_R[this.type]}:${this.universe}:${this.steam32}]`;
    }

    /**
     * Tests if string formatted as Steam2
     *
     * @param {String} str STEAM_0:1:12345678
     * @returns {Boolean}
     * */
    static isSteam2(str = '') {
        return STEAM2_REGEXP.test(str);
    }

    /**
     * Tests if string formatted as Steam3
     *
     * @param {String} str [U:1:123456789] or [U:1:123456789:0]
     * @returns {Boolean}
     * */
    static isSteam3(str = '') {
        return STEAM3_REGEXP.test(str);
    }

    /**
     * Tests if string or number is a Steam32 id
     *
     * @param {String|Number} str 123456789
     * @returns {Boolean}
     * */
    static is32(str = '') {
        const num = Long.fromString(str);
        return num.gt(0) && num.lt(POW2_32);
    }

    /**
     * Tests if string or number is a Steam64 id
     *
     * @param {String|Number} str 76561198123456789
     * @returns {Boolean}
     * */
    static is64(str = '') {
        const num = Long.fromString(str);
        return num.gt(0) && num.gt(POW2_32);
    }
}

SteamID.UNIVERSE = UNIVERSE;
SteamID.UNIVERSE_R = UNIVERSE_R;
SteamID.TYPE = TYPE;
SteamID.TYPE_R = TYPE_R;
SteamID.TYPE_CHAR = TYPE_CHAR;
SteamID.TYPE_CHAR_R = TYPE_CHAR_R;

module.exports = SteamID;
