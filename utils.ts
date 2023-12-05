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

export const printSolutions = (sol1: string | number, sol2: string | number, day: number) => {
  console.log(`#### DAY ${day} ####`);
  console.log(`Part 1: ${sol1}`);
  console.log(`Part 2: ${sol2}`);
  console.log('\n');
};
