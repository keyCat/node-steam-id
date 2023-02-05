# Steam ID

[![npm version](https://badge.fury.io/js/%400x0c%2Fsteam-id.svg)](https://badge.fury.io/js/%400x0c%2Fsteam-id)
[![Known Vulnerabilities](https://snyk.io/test/github/keyCat/node-steam-id/badge.svg)](https://snyk.io/test/github/0x0c/steam-id)

```bash
$ npm install @0x0c/steam-id
```

A collection of zero-dependency TypeScript tools for working with [Steam ID](https://developer.valvesoftware.com/wiki/SteamID).

⚠️ The package relies heavily on [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) type to work with 64-bit integers.

## Features
[![Valve Wiki](https://developer.valvesoftware.com/w/images/0/01/Steam_id_explanation.png)](https://developer.valvesoftware.com/wiki/SteamID)


* Parsing and producing 64-bit Community IDs (`76561197981552207`)
* Parsing and producing Community Profile and Group URLs (`https://steamcommunity.com/profiles/76561197981552207`, `https://steamcommunity.com/gid/103582791435488769`)
* Parsing and producing Account IDs (`21286479`)
* Parsing and producing Steam2 IDs (`STEAM_1:1:10643239`)
* Parsing and producing Steam3 IDs (`[U:1:21286479]`, `[g:1:5967361]`)

## Noncommital roadmap
* Working with Steam Community Vanity URLs (`https://steamcommunity.com/id/username`)
* Better documentation
* Tests

## Usage
### Class: SteamID
```ts
import { SteamID } from '@0x0c/steam-id';

// Parsing from Community Profile URL
let id = new SteamID('https://steamcommunity.com/profiles/76561197981552207');
console.log(id.isValid());
// => true
console.log(id.toString());
// => 76561197981552207
console.log(id.toSteam64());
// => 76561197981552207
console.log(id.toSteam2());
// => STEAM_1:1:10643239

// Parsing from Steam ID
id = new SteamID('STEAM_1:1:10643239')
console.log(id.toSteam3());
// => [U:1:21286479]

// Parsing from Steam3 ID
id = new SteamID('[U:1:21286479]')
console.log(id.toCommunityUrl());
// => https://steamcommunity.com/profiles/76561197981552207

// Parsing from Steam64 ID
id = new SteamID('76561197981552207')
console.log(id.getAccountID());
// => 21286479
```
