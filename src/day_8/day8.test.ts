import path from 'path';
import { calcSolutionsDay8 } from './day8';
import { __dirName } from '../../utils';

describe('The final solution of part 1', () => {
  it('to be correct', () => {
    const solution = calcSolutionsDay8(path.join(__dirName, 'src', 'day_8', 'input.test.txt'));
    const solution2 = calcSolutionsDay8(path.join(__dirName, 'src', 'day_8', 'input.test2.txt'));
    expect(solution[0]).toBe(2);
    expect(solution2[0]).toBe(6);
  });
});

describe('The final solution of part 2', () => {
  it('to be correct', () => {
    const solution = calcSolutionsDay8(path.join(__dirName, 'src', 'day_8', 'input.test3.txt'), true);
    expect(solution[1]).toBe(6);
  });
});
