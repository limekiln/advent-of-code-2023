import path from 'path';
import { __dirName, readLines, sumArray } from '../../utils';

export type Card = {
  id: number;
  winning: number[];
  actual: number[];
};

export const parseInput = (cards: string[]): Card[] => {
  return cards.map(card => {
    const [cardId, numbers] = card.split(':');
    const id = parseInt(cardId.match(/\d+/)![0]);
    const [winningRaw, actualRaw] = numbers.split('|').map(x => x.trim());
    const winning = winningRaw
      .split(' ')
      .filter(Boolean)
      .map(x => parseInt(x));
    const actual = actualRaw
      .split(' ')
      .filter(Boolean)
      .map(x => parseInt(x));
    return { id, winning, actual };
  });
};

const getWinningNumbers = (card: Card): number[] => {
  return card.actual.filter(x => card.winning.includes(x));
};

export const calculateCardPoints = (card: Card): number => {
  const matchingNumbers = getWinningNumbers(card).length;
  if (matchingNumbers === 0) return 0;
  let res = 1;
  for (let x = 1; x < matchingNumbers; ++x) {
    res *= 2;
  }

  return res;
};

export const executeRules = (cards: Card[]): number => {
  let res = new Array(cards.length).fill(1);
  for (let i = 0; i < cards.length; ++i) {
    const matches = getWinningNumbers(cards[i]).length;
    for (let j = i + 1; j <= i + matches; ++j) {
      if (cards[j]) {
        res[j] += res[i];
      }
    }
  }
  return sumArray(res);
};

export const calcSolutionsDay4 = () => {
  const input = readLines(path.join(__dirName, 'src', 'day_4', 'input.txt'));
  const cards = parseInput(input);

  const solution = cards.reduce((acc, curr) => {
    return acc + calculateCardPoints(curr);
  }, 0);

  const solution2 = executeRules(parseInput(input));

  return [solution, solution2];
};
