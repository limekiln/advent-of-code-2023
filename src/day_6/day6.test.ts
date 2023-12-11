import path from 'path';
import { getRaces, getWinningOptions, simulateRace } from './day6';
import { __dirName } from '../../utils';

const input = path.join(__dirName, 'src', 'day_6', 'input.test.txt');

describe('The race parser', () => {
  it('should get the correct races', () => {
    const races = getRaces(input);
    expect(races.length).toBe(3);
    expect(races[0]).toEqual({ totalTime: 7, targetRange: 9 });
    expect(races[1]).toEqual({ totalTime: 15, targetRange: 40 });
    expect(races[2]).toEqual({ totalTime: 30, targetRange: 200 });
  });
});

describe('The race simulation', () => {
  it('should return the correct number of possible wins', () => {
    const races = getRaces(input);
    const results = simulateRace(races[0]);
    expect(results.length).toBe(7);
    expect(results).toContain(10);
    expect(results).toContain(12);
    expect(results).toContain(6);
    expect(results).toContain(0);
  });
});

describe('The winning option filter', () => {
  it('should only return the options with a large enough range', () => {
    const races = getRaces(input);
    const results = simulateRace(races[0]);
    const wins = getWinningOptions(races[0], results);
    expect(wins.length).toBe(4);
    expect(wins).toContain(10);
    expect(results).toContain(12);
  });
});

describe('The final solution', () => {
  it('should be correct', () => {
    const races = getRaces(input);
    const wins = races.map(race => {
      const results = simulateRace(race);
      return getWinningOptions(race, results);
    });

    const solution = wins.reduce((acc, curr) => {
      return acc * curr.length;
    }, 1);

    expect(solution).toEqual(288);
  });
});
