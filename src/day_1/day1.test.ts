import { parseConfig, regex1, regex2 } from './day1';

const expectedResultLines = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'];

const expectedResultLines2 = [
  'two1nine',
  'eightwothree',
  'abcone2threexyz',
  'xtwone3four',
  '4nineeightseven2',
  'zoneight234',
  '7pqrstsixteen'
];

describe('The parser function', () => {
  it('should return the correct number', () => {
    const configSum = parseConfig(expectedResultLines, regex1);
    expect(configSum).toBe(142);
  });
});

describe('The new parser function', () => {
  it('should return the correct number as well', () => {
    const configSum = parseConfig(expectedResultLines2, regex2);
    expect(configSum).toBe(281);
  });
});
