import { Game, findPossibleGames, getGameFromLine } from './day2';

describe('The game line parser', () => {
  it('should correctly parse 1 input line to a game object', () => {
    const game: Game = getGameFromLine('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green');
    expect(game.id).toBe(1);
    expect(game.draws.length).toBe(3);
    expect(game.draws).toContainEqual({ red: 4, green: 0, blue: 3 });
    expect(game.draws).toContainEqual({ red: 1, green: 2, blue: 6 });
    expect(game.draws).toContainEqual({ red: 0, green: 2, blue: 0 });
  });
});
describe('The possible game filter', () => {
  it('should return the IDs of possible games only', () => {
    const games: Game[] = [
      {
        id: 1,
        draws: [
          { red: 4, green: 0, blue: 3 },
          { red: 1, green: 2, blue: 6 },
          { red: 0, green: 2, blue: 0 }
        ]
      },
      {
        id: 2,
        draws: [
          { red: 0, green: 3, blue: 2 },
          { red: 1, green: 3, blue: 1 },
          { red: 0, green: 1, blue: 1 }
        ]
      },
      {
        id: 3,
        draws: [
          { red: 20, green: 8, blue: 6 },
          { red: 4, green: 13, blue: 5 },
          { red: 1, green: 5, blue: 0 }
        ]
      }
    ];

    expect(findPossibleGames(games)).toEqual([1, 2]);
  });
});
