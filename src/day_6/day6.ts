import path from 'path';
import { __dirName, readLines } from '../../utils';
import { PathLike } from 'fs';

type Race = {
  totalTime: number;
  targetRange: number;
};

export const getRaces = (input: PathLike): Race[] => {
  const lines = readLines(input);
  const raceTimes = lines[0].match(/\d+/g)!.map(Number);
  const targetRange = lines[1].match(/\d+/g)!.map(Number);

  return raceTimes.map((time, index) => ({
    totalTime: time,
    targetRange: targetRange[index]
  }));
};

export const getRace = (input: PathLike): Race => {
  const lines = readLines(input);
  const raceTime = parseInt(lines[0].match(/\d+/g)!.map(Number).join(''));
  const targetRange = parseInt(lines[1].match(/\d+/g)!.map(Number).join(''));

  return {
    totalTime: raceTime,
    targetRange
  };
};

const simulateHoldTime = (holdTime: number, raceTime: number): number => {
  const speed = holdTime;
  return speed * (raceTime - holdTime);
};

export const simulateRace = (race: Race): number[] => {
  const distances = [];
  for (let t = 0; t < race.totalTime; ++t) {
    distances.push(simulateHoldTime(t, race.totalTime));
  }
  return distances;
};

export const getWinningOptions = (race: Race, results: number[]) => {
  return results.filter(result => result > race.targetRange);
};

export const calcSolutionsDay6 = (inputPath: PathLike) => {
  const races = getRaces(inputPath);
  const wins = races.map(race => {
    const results = simulateRace(race);
    return getWinningOptions(race, results);
  });

  const solution = wins.reduce((acc, curr) => {
    return acc * curr.length;
  }, 1);

  const trueRace = getRace(inputPath);
  const trueResults = simulateRace(trueRace);
  const trueWinningOptions = getWinningOptions(trueRace, trueResults);
  const solution2 = trueWinningOptions.length;

  return [solution, solution2];
};
