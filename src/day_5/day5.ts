import path from 'path';
import { __dirName, readLines } from '../../utils';
import { PathLike } from 'fs';

type Range = { from: number; to: number };
type Dict = {
  source: Range;
  target: Range;
}[];

export const extractMaps = (input: PathLike) => {
  return readLines(input, '\n\n')
    .map(x => x.split('\n'))
    .map(y => y.filter(z => z.match(/\d+/)));
};

export const getSeeds = (seeds: string) => {
  return seeds
    .split(':')[1]
    .trim()
    .split(' ')
    .map(x => parseInt(x));
};

export const buildsDicts = (maps: string[][]): Dict[] => {
  const dicts: Dict[] = maps.map(map => {
    return map.map(range => {
      const [targetStart, sourceStart, rangeVal] = range.split(' ').map(x => parseInt(x));
      return {
        source: { from: sourceStart, to: sourceStart + rangeVal - 1 },
        target: { from: targetStart, to: targetStart + rangeVal - 1 }
      };
    });
  });

  return dicts;
};

export const findMatchInDict = (targetVal: number, dict: Dict): number => {
  const match = dict.find(range => targetVal >= range.source.from && targetVal <= range.source.to);
  if (match) {
    return match.target.from + targetVal - match.source.from;
  }

  return targetVal;
};

export const findLocation = (seed: number, dicts: Dict[]): number => {
  let res = seed;
  dicts.forEach(dict => {
    res = findMatchInDict(res, dict);
  });

  return res;
};

export const findCorrectLocation = (seedRanges: number[], dicts: Dict[]): number => {
  let loc = Number.MAX_SAFE_INTEGER;
  for (let x = 0; x < seedRanges.length; x += 2) {
    for (let y = seedRanges[x]; y < seedRanges[x] + seedRanges[x + 1] - 1; ++y) {
      const newLoc = findLocation(y, dicts);
      if (newLoc < loc) loc = newLoc;
    }
  }
  return loc;
};

const input = path.join(__dirName, 'src', 'day_5', 'input.txt');

const maps = extractMaps(input);
const seeds = getSeeds(maps.shift()![0]);
const dicts = buildsDicts(maps);
const locations = seeds.map(seed => findLocation(seed, dicts));

const solution = Math.min(...locations);

const solution2 = findCorrectLocation(seeds, dicts);

export { solution, solution2 };
