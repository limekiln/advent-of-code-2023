import { calcSolutionsDay1 } from './src/day_1/day1';
import { calcSolutionsDay2 } from './src/day_2/day2';
import { calcSolutionsDay3 } from './src/day_3/day3';
import { calcSolutionsDay4 } from './src/day_4/day4';
import { calcSolutionsDay5 } from './src/day_5/day5';
import { calcSolutionsDay6 } from './src/day_6/day6';
import { printSolutions } from './utils';

// Read parameters given in script call
const day = parseInt(process.argv[2]);

switch (day) {
  case 1:
    printSolutions(calcSolutionsDay1(), day);
    break;
  case 2:
    printSolutions(calcSolutionsDay2(), day);
    break;
  case 3:
    printSolutions(calcSolutionsDay3(), day);
    break;
  case 4:
    printSolutions(calcSolutionsDay4(), day);
    break;
  case 5:
    printSolutions(calcSolutionsDay5(), day);
    break;
  case 6:
    printSolutions(calcSolutionsDay6(), day);
    break;
  default:
    console.log('Invalid day');
}
