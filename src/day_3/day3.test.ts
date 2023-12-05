import path from 'path';
import { __dirName, readLines, sumArray } from '../../utils';
import { findAllGearRatios, findAllValidNumbers, findSymbols } from './day3';

describe('The symbol finder', () => {
  it('Should report the positions of all symbols in the array that are not a dot', () => {
    const testArray = [
      ['.', '.', '*'],
      ['@', '.', '.'],
      ['.', '.', '.']
    ];
    const expectedResults = [
      { row: 0, column: 2 },
      { row: 1, column: 0 }
    ];
    const result = findSymbols(testArray);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual(expectedResults[0]);
    expect(result).toContainEqual(expectedResults[1]);
  });
});

describe('The adjacent number search', () => {
  it('should find any number in any direction next to a symbol which is not a dot', () => {
    const testArray = [
      ['1', '2', '*'],
      ['@', '.', '.'],
      ['.', '.', '.']
    ];

    const result = findAllValidNumbers(testArray);

    expect(result).toHaveLength(1);
    expect(result).toContain(12);
  });
});

describe('The final sum', () => {
  it('should be correctly calculated from the input', () => {
    const input = readLines(path.join(__dirName, 'src', 'day_3', 'input.test.txt'));
    const schema = input.map((line) => line.split(''));
    const allNumbers = findAllValidNumbers(schema);
    const solution = sumArray(allNumbers);
    expect(solution).toBe(4361);
  });
});

describe('The final gear ratio sum', () => {
  it('should be correctly calculated from the input', () => {
    const input = readLines(path.join(__dirName, 'src', 'day_3', 'input.test.txt'));
    const schema = input.map((line) => line.split(''));
    const gearRatios = findAllGearRatios(schema);
    const solution = sumArray(gearRatios);
    expect(solution).toBe(467835);
  });
});
