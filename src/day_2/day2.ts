import path from 'path';

import { __dirName, readLines, sumArray } from '../../utils';

export type Draw = {
  red: number;
  green: number;
  blue: number;
};

export type Game = {
  id: number;
  draws: Draw[];
};

export const parseRawDraws = (draws: string[]) => {
  return draws.map(draw => {
    return draw.split(',').reduce<Draw>(
      (acc, curr) => {
        const [count, color] = curr.split(/(?=red|green|blue)/);
        if (acc[color as keyof Draw] >= 0) {
          acc[color as keyof Draw] += parseInt(count);
        }
        return acc;
      },
      { red: 0, green: 0, blue: 0 }
    );
  });
};

export const getGameFromLine = (game: string): Game => {
  const [id, rest] = game.replaceAll(' ', '').split(':');
  const parsedId = parseInt(id.split('Game')[1]);
  const draws = parseRawDraws(rest.split(';'));
  return {
    id: parsedId,
    draws
  };
};

export const getGames = (games: string[]): Game[] => {
  return games.map(getGameFromLine);
};

export const findPossibleGames = (games: Game[]): number[] => {
  const protoBag: Draw = { red: 12, green: 13, blue: 14 };
  return games
    .filter(game => {
      return !game.draws.some(
        draw => draw.red > protoBag.red || draw.green > protoBag.green || draw.blue > protoBag.blue
      );
    })
    .map(game => game.id);
};

const findMinSets = (games: Game[]): Draw[] => {
  return games.map(game => {
    return game.draws.reduce<Draw>(
      (acc, curr) => {
        if (curr.red > acc.red) acc.red = curr.red;
        if (curr.green > acc.green) acc.green = curr.green;
        if (curr.blue > acc.blue) acc.blue = curr.blue;
        return acc;
      },
      { red: 0, green: 0, blue: 0 }
    );
  });
};

export const calcSolutionsDay2 = () => {
  const input = readLines(path.join(__dirName, 'src', 'day_2', 'input.txt'), '\n');

  const games = getGames(input);
  const findSolution = () => {
    return sumArray(findPossibleGames(games));
  };

  const minSets = findMinSets(games);
  const powers = minSets.map(set => set.red * set.green * set.blue);
  const solution2 = sumArray(powers);

  const solution = findSolution();
  return [solution, solution2];
};
