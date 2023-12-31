import path from 'path';
import { calcSolutionsDay1 } from './src/day_1/day1';
import { calcSolutionsDay2 } from './src/day_2/day2';
import { calcSolutionsDay3 } from './src/day_3/day3';
import { calcSolutionsDay4 } from './src/day_4/day4';
import { calcSolutionsDay5 } from './src/day_5/day5';
import { calcSolutionsDay6 } from './src/day_6/day6';
import { calcSolutionsDay7 } from './src/day_7/day7';
import { calcSolutionsDay8 } from './src/day_8/day8';
import { __dirName, printSolutions, readLines } from './utils';
import { calcSolutionsDay9 } from './src/day_9/day9';

// Read parameters given in script call
const day = parseInt(process.argv[2]);

switch (day) {
  case 1:
    printSolutions(calcSolutionsDay1(path.join(__dirName, 'src', 'day_1', 'input.txt')), day);
    break;
  case 2:
    printSolutions(calcSolutionsDay2(path.join(__dirName, 'src', 'day_2', 'input.txt')), day);
    break;
  case 3:
    printSolutions(calcSolutionsDay3(path.join(__dirName, 'src', 'day_3', 'input.txt')), day);
    break;
  case 4:
    printSolutions(calcSolutionsDay4(path.join(__dirName, 'src', 'day_4', 'input.txt')), day);
    break;
  case 5:
    printSolutions(calcSolutionsDay5(path.join(__dirName, 'src', 'day_5', 'input.txt')), day);
    break;
  case 6:
    printSolutions(calcSolutionsDay6(path.join(__dirName, 'src', 'day_6', 'input.txt')), day);
    break;
  case 7:
    printSolutions(calcSolutionsDay7(path.join(__dirName, 'src', 'day_7', 'input.txt')), day);
    break;
  case 8:
    printSolutions(calcSolutionsDay8(path.join(__dirName, 'src', 'day_8', 'input.txt')), day);
    break;
  case 9:
    printSolutions(calcSolutionsDay9(path.join(__dirName, 'src', 'day_9', 'input.txt')), day);
    break;
  default:
    console.log('Invalid day');
}
