import { PathLike } from 'fs';
import { readLines, sumArray } from '../../utils';

const extrapolate = (reading: number[]): number => {
  const tmp = [[...reading]];
  while (tmp.at(-1)?.some(x => x !== 0)) {
    const lastLine = tmp.at(-1)!;
    let nextLine = lastLine.map((x, i) => {
      if (i !== lastLine.length) return lastLine[i + 1] - x;
    });
    nextLine.pop();

    tmp.push(nextLine as number[]);
  }

  tmp.at(-1)?.push(0);
  for (let i = tmp.length - 2; i >= 0; --i) {
    tmp[i].push(tmp[i].at(-1)! + tmp[i + 1].at(-1)!);
  }
  return tmp[0].at(-1)!;
};

export const calcSolutionsDay9 = (file: PathLike) => {
  const input = readLines(file);
  const readings = input.map(line => line.split(' ').map(Number));
  const newPoints = readings.map(extrapolate);
  const solution1 = sumArray(newPoints);

  const newReadings = readings.map(x => x.reverse());
  const newPoints2 = newReadings.map(extrapolate);
  const solution2 = sumArray(newPoints2);

  return [solution1, solution2];
};
