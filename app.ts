import { solution as sol1_1, solution2 as sol1_2 } from './src/day_1/day1';
import { solution as sol2_1, solution2 as sol2_2 } from './src/day_2/day2';
import { solution as sol3_1, solution2 as sol3_2 } from './src/day_3/day3';
import { solution as sol4_1, solution2 as sol4_2 } from './src/day_4/day4';
import { solution as sol5_1, solution2 as sol5_2 } from './src/day_5/day5';
import { printSolutions } from './utils';

// Read parameters given in script call
const day = parseInt(process.argv[2]);

switch (day) {
  case 1:
    printSolutions(sol1_1, sol1_2, day);
    break;
  case 2:
    printSolutions(sol2_1, sol2_2, day);
    break;
  case 3:
    printSolutions(sol3_1, sol3_2, day);
    break;
  case 4:
    printSolutions(sol4_1, sol4_2, day);
    break;
  case 5:
    printSolutions(sol5_1, sol5_2, 5);
  default:
    console.log('Invalid day');
}
