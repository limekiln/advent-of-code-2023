import { PathLike } from 'fs';
import { readLines } from '../../utils';

type Conections = {
  left: string;
  right: string;
};

type Network = Record<string, Conections>;

const buildNetwork = (nodes: string[]): Network => {
  return nodes.reduce<Network>((acc, curr) => {
    const [nodeName, connections] = curr.split(' = ');
    const [left, right] = connections.split(', ');
    acc[nodeName] = { left: left.substring(1), right: right.substring(0, right.length - 1) };
    return acc;
  }, {});
};

const makeStep = (currentNode: string, network: Network, instruction: string): string => {
  return network[currentNode][`${instruction === 'L' ? 'left' : 'right'}`];
};

const simSolution = (startingNodes: string[], network: Network, instructions: string) => {
  let traversalIndex = 0;
  let numberOfSteps = 0;
  let currentNodes = startingNodes;

  do {
    if (currentNodes.every(node => node.endsWith('Z')) && numberOfSteps > 0) {
      break;
    }
    currentNodes = currentNodes.map(node => {
      return makeStep(node, network, instructions.at(traversalIndex)!);
    });
    numberOfSteps++;
    traversalIndex = (traversalIndex + 1) % instructions.length;
  } while (true);

  return numberOfSteps;
};

const lcm = (...arr: number[]) => {
  const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
  const _lcm = (x: number, y: number) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

export const calcSolutionsDay8 = (inputPath: PathLike, skipPart1 = false) => {
  const input = readLines(inputPath);
  const instructions = input[0];
  const networkRaw = input.slice(2);
  const network = buildNetwork(networkRaw);

  let solution = 0;
  if (!skipPart1) {
    solution = simSolution(['AAA'], network, instructions);
  }

  const solution2 = lcm(
    ...Object.keys(network)
      .filter(node => node.endsWith('A'))
      .map(node => simSolution([node], network, instructions))
  );

  return [solution, solution2];
};
