import { __dirName, readLines } from '../../utils';
import { PathLike } from 'fs';

const getCardMapping = (useJokers: boolean) => ({
  A: 14,
  K: 13,
  Q: 12,
  J: useJokers ? 1 : 11,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2
});

type CardMap = ReturnType<typeof getCardMapping>;

export type Card = keyof CardMap;

export type Hand = {
  cards: Partial<Card>[];
  power: number;
  bid: number;
};

const compareCards = (card1: Card, card2: Card, cardMap: CardMap): number => {
  return cardMap[card1] - cardMap[card2];
};

export const getPower = (cards: Card[], useJokers = false): number => {
  let uniqs = cards.reduce<Partial<Record<Card, number>>>((acc, curr) => {
    if (!acc[curr]) acc[curr] = 1;
    else acc[curr]!++;
    return acc;
  }, {} as Record<Card, number>);

  if (useJokers) {
    const numberOfJokers = uniqs['J'] ?? 0;
    if (numberOfJokers === 5) uniqs = { A: 5 };
    else {
      delete uniqs['J'];
      const bestMatch = (Object.keys(uniqs) as Card[]).reduce((acc, curr) => {
        return uniqs[curr]! > uniqs[acc]! ? curr : acc;
      });
      uniqs[bestMatch as Card]! += numberOfJokers;
    }
  }

  switch (Object.values(uniqs).length) {
    // All different -> high card
    case 5:
      return 0;

    // This has to be a pair then
    case 4:
      return 1;

    // Either three of a kind or two pairs
    case 3:
      return Object.values(uniqs).includes(3) ? 3 : 2;

    // Either 4 of a kind or full house
    case 2:
      return Object.values(uniqs).includes(4) ? 5 : 4;

    // Must be 5 of a kind
    case 1:
      return 6;
    default:
      return -1;
  }
};

const getFirstDifferentCardIndex = (cards1: Card[], cards2: Card[]): number => {
  return cards1.findIndex((x, index) => cards2[index] !== x);
};

const sortHands = (hands: Hand[], cardMap: CardMap): Hand[] => {
  return hands.sort((hand1, hand2) => {
    const powerDiff = hand1.power - hand2.power;
    if (powerDiff !== 0) {
      return powerDiff;
    }

    const highCardIndex = getFirstDifferentCardIndex(hand1.cards, hand2.cards);
    return compareCards(hand1.cards[highCardIndex], hand2.cards[highCardIndex], cardMap);
  });
};

export const calcSolutionsDay7 = (inputPath: PathLike) => {
  const input = readLines(inputPath);
  const hands: Hand[] = input.map(x => {
    const [cards, bid] = x.split(' ');
    const splitCards = cards.split('') as Card[];
    return {
      cards: splitCards,
      power: getPower(splitCards),
      bid: parseInt(bid)
    };
  });

  const sortedHands = sortHands(hands, getCardMapping(false));

  const result1 = sortedHands.reduce((acc, curr, index) => {
    return acc + curr.bid * (index + 1);
  }, 0);

  const hands2: Hand[] = input.map(x => {
    const [cards, bid] = x.split(' ');
    const splitCards = cards.split('') as Card[];
    return {
      cards: splitCards,
      power: getPower(splitCards, true),
      bid: parseInt(bid)
    };
  });

  const sortedHands2 = sortHands(hands2, getCardMapping(true));
  const result2 = sortedHands2.reduce((acc, curr, index) => {
    return acc + curr.bid * (index + 1);
  }, 0);
  return [result1, result2];
};
