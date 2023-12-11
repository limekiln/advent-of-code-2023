import path from 'path';

import { __dirName, readLines } from '../../utils';

const parseAllDigitStrings = (digit: string) => {
  const NUMBER_MAP = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
  };

  if (Object.keys(NUMBER_MAP).includes(digit)) {
    return NUMBER_MAP[digit as keyof typeof NUMBER_MAP];
  }
  return parseInt(digit);
};

export const parseConfig = (parsedConfig: string[], regex: RegExp) => {
  return parsedConfig.reduce((acc, curr) => {
    const numbers = Array.from(curr.matchAll(regex), x => x[1])?.map(x => parseAllDigitStrings(x)) ?? [];
    if (numbers.length) {
      acc += parseInt(`${numbers.at(0)}${numbers.at(-1)}`);
    }
    return acc;
  }, 0);
};

export const regex1 = /(?=(\d))/g;
export const regex2 = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

export const calcSolutionsDay1 = () => {
  const input = readLines(path.join(__dirName, 'src', 'day_1', 'input.txt'));

  // Part 1
  const solution = parseConfig(input, regex1);

  // Part 2
  const solution2 = parseConfig(input, regex2);
  return [solution, solution2];
};
