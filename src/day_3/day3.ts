import path from 'path';
import { __dirName, readLines, sumArray } from '../../utils';
import cloneDeep from 'lodash/cloneDeep';

type ArrayCoordinate = {
  row: number;
  column: number;
};

export const findSymbols = (engineSchema: string[][], isGear?: boolean): ArrayCoordinate[] => {
  const symbolPositions: ArrayCoordinate[] = [];
  for (let row = 0; row < engineSchema.length; row++) {
    for (let column = 0; column < engineSchema[row].length; column++) {
      if (engineSchema[row][column].match(isGear ? /\*/ : /[^.\d]/)) {
        symbolPositions.push({ row, column });
      }
    }
  }
  return symbolPositions;
};

export const findNumberAtPosition = (root: ArrayCoordinate, schema: string[][]) => {
  const rootNum = schema[root.row][root.column];
  schema[root.row][root.column] = '.';

  // First find all numbers that are to the left of the root position
  const numbersToLeft: string[] = [];
  for (let column = root.column - 1; column >= 0; column--) {
    const symbol = schema[root.row][column];
    if (symbol.match(/\d/)) {
      numbersToLeft.push(symbol);
      schema[root.row][column] = '.';
    } else {
      break;
    }
  }

  // Then find all numbers that are to the left of the root position
  const numbersToRight: string[] = [];
  for (let column = root.column + 1; column <= schema[0].length; column++) {
    const symbol = schema?.[root.row]?.[column] ?? '.';
    if (symbol.match(/\d/)) {
      numbersToRight.push(symbol);
      schema[root.row][column] = '.';
    } else {
      break;
    }
  }
  return parseInt([...numbersToLeft.reverse(), rootNum, ...numbersToRight].join(''));
};

export const findAdjacentNumbers = (symbolPosition: ArrayCoordinate, schema: string[][]): number[] => {
  const res: number[] = [];
  const { row, column } = symbolPosition;
  for (let currentRow = row - 1; currentRow <= row + 1; currentRow++) {
    for (let currentColumn = column - 1; currentColumn <= column + 1; currentColumn++) {
      if (schema?.[currentRow]?.[currentColumn]?.match(/\d/)) {
        res.push(findNumberAtPosition({ row: currentRow, column: currentColumn }, schema));
      }
    }
  }
  return res;
};

export const findAllValidNumbers = (schema: string[][]): number[] => {
  const workingSchema = cloneDeep(schema);
  const symbols = findSymbols(workingSchema);
  return symbols.flatMap(position => {
    return findAdjacentNumbers(position, workingSchema);
  });
};

export const findAllGearRatios = (schema: string[][]): number[] => {
  const workingSchema = cloneDeep(schema);
  const gears = findSymbols(workingSchema, true);
  return gears.flatMap(position => {
    const adjacentParts = findAdjacentNumbers(position, workingSchema);
    if (adjacentParts.length >= 2)
      return adjacentParts.reduce((acc, curr) => {
        if (acc === 0) return curr;
        return acc * curr;
      }, 0);
    return 0;
  });
};

export const calcSolutionsDay3 = () => {
  const input = readLines(path.join(__dirName, 'src', 'day_3', 'input.txt'));
  const schema = input.map(line => line.split(''));
  const allNumbers = findAllValidNumbers(schema);
  const solution = sumArray(allNumbers);

  const gearRatios = findAllGearRatios(schema);
  const solution2 = sumArray(gearRatios);

  return [solution, solution2];
};
