import path from 'path';
import { buildsDicts, extractMaps, findCorrectLocation, findLocation, getSeeds } from './day5';
import { __dirName } from '../../utils';

const input = path.join(__dirName, 'src', 'day_5', 'input.test.txt');
const maps = extractMaps(input);
const seeds = getSeeds(maps.shift()![0]);
const dicts = buildsDicts(maps);

describe('The location finder', () => {
  it('should find the closest location', () => {
    const locations = seeds.map(seed => findLocation(seed, dicts));
    const solution = Math.min(...locations);
    expect(locations).toEqual([82, 43, 86, 35]);
    expect(solution).toBe(35);
  });
});

describe('The correct location finder', () => {
  it('should find the closest location as well', () => {
    const solution = findCorrectLocation(seeds, dicts);
    expect(solution).toBe(46);
  });
});
