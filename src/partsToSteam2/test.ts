import partsToSteam2 from './index';

describe('partsToSteam2', () => {
  it('should convert SteamIDAccount and SteamIDUniverse to a string in the correct format', () => {
    expect(partsToSteam2(123456789, 1)).toBe('STEAM_1:1:61728394');
    expect(partsToSteam2(987654321, 0)).toBe('STEAM_0:1:493827160');
  });
});
