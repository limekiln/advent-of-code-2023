import { calculateCardPoints, executeRules, parseInput } from './day4';

const input = [
  'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
  'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
  'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1'
];

const completeInput = [
  'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
  'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
  'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
  'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
  'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
  'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'
];

describe('The input parser', () => {
  it('should give a list ob card objects', () => {
    const res = parseInput(input);
    expect(res).toEqual([
      {
        id: 1,
        winning: [41, 48, 83, 86, 17],
        actual: [83, 86, 6, 31, 17, 9, 48, 53]
      },
      {
        id: 2,
        winning: [13, 32, 20, 16, 61],
        actual: [61, 30, 68, 82, 17, 32, 24, 19]
      },
      {
        id: 3,
        winning: [1, 21, 53, 59, 44],
        actual: [69, 82, 63, 72, 16, 21, 14, 1]
      }
    ]);
  });
});

describe('The number calculation', () => {
  it('should return the correct point value for a single card', () => {
    const cards = parseInput(input);
    expect(calculateCardPoints(cards[0])).toBe(8);
    expect(calculateCardPoints(cards[1])).toBe(2);
    expect(calculateCardPoints(cards[2])).toBe(2);
  });
});

describe('The rule execution', () => {
  it('should work correctly', () => {
    const cards = parseInput(completeInput);
    expect(executeRules(cards)).toBe(30);
  });
});
