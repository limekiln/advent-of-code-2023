import path from 'path';
import { Card, Hand, calcSolutionsDay7, getPower } from './day7';
import { __dirName } from '../../utils';

describe('The final result for part 1', () => {
  it('should be correct', () => {
    const res = calcSolutionsDay7(path.join(__dirName, 'src', 'day_7', 'input.test.txt'));
    expect(res[0]).toBe(6440);
  });
});

describe('The final result for part 2', () => {
  it('should be correct', () => {
    const res = calcSolutionsDay7(path.join(__dirName, 'src', 'day_7', 'input.test.txt'));
    expect(res[1]).toBe(5905);
  });
});

describe('The power of hands with a Joker', () => {
  it('should be correct', () => {
    const cards1: Card[] = ['3', '3', 'J', 'K', 'A'];
    const cards2: Card[] = ['3', '3', 'J', 'K', 'J'];
    const cards3: Card[] = ['J', 'J', 'J', 'J', 'J'];
    const cards4: Card[] = ['2', '3', '2', '3', 'J'];
    expect(getPower(cards1, true)).toBe(3);
    expect(getPower(cards2, true)).toBe(5);
    expect(getPower(cards3, true)).toBe(6);
    expect(getPower(cards4, true)).toBe(4);
  });
});
