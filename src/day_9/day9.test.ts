import path from 'path';
import { calcSolutionsDay9 } from './day9';
import { __dirName } from '../../utils';

describe('The final solution for part 1', () => {
  it('should be correct', () => {
    const solution = calcSolutionsDay9(path.join(__dirName, 'src', 'day_9', 'input.test.txt'));
    expect(solution[0]).toBe(114);
  });
});

describe('The final solution for part 2', () => {
  it('should be correct', () => {
    const solution = calcSolutionsDay9(path.join(__dirName, 'src', 'day_9', 'input.test.txt'));
    expect(solution[1]).toBe(2);
  });
});
