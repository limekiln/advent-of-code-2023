import { PathLike, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const __fileName = fileURLToPath(import.meta.url);
export const __dirName = path.dirname(__fileName);

export const readLines = (filePath: PathLike, separator: string = '\n') => {
  const file = readFileSync(filePath);
  return file.toString().split(separator);
};

export const sumArray = (arr: number[]): number => {
  return arr.reduce((acc, curr) => acc + curr, 0);
};

export const printSolutions = (solutions: Array<string | number>, day: number) => {
  console.log(`#### DAY ${day} ####`);
  console.log(`Part 1: ${solutions[0]}`);
  console.log(`Part 2: ${solutions[1]}`);
  console.log('\n');
};
