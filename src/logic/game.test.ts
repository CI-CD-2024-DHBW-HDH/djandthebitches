// import { Game, Player, Mode, Field, Outcome, isFull, won, newBoard, getBlanks, invertPlayer, isPlayer } from "../src/logic/game";

// describe("Game", () => {
//     let game: Game;

//     beforeEach(() => {
//         game = new Game();
//     });

//     it("should initialize with default values", () => {
//         expect(game.player.field).toBe(Field.PLAYER1);
//         expect(game.enemy.field).toBe(Field.PLAYER2);
//         expect(game.mode).toBe(Mode.EASY);
//     });

//     it("should switch sides correctly", () => {
//         game.switchSides();
//         expect(game.player.field).toBe(Field.PLAYER2);
//         expect(game.enemy.field).toBe(Field.PLAYER1);
//     });

//     it("should update mode correctly", () => {
//         game.updateMode(Mode.HARD);
//         expect(game.mode).toBe(Mode.HARD);
//     });

//     it("should add win correctly", () => {
//         game.addWin(Field.PLAYER1);
//         expect(game.player.score).toBe(1);
//     });
// });

// describe("Player", () => {
//     let player: Player;

//     beforeEach(() => {
//         player = new Player(Field.PLAYER1);
//     });

//     it("should initialize with default values", () => {
//         expect(player.score).toBe(0);
//         expect(player.field).toBe(Field.PLAYER1);
//         expect(player.botMove).toBeUndefined();
//     });

//     it("should add win correctly", () => {
//         player.addWin();
//         expect(player.score).toBe(1);
//     });

//     it("should return true if player is human", () => {
//         expect(player.isHuman()).toBe(true);
//     });

//     it("should make a move correctly", () => {
//         const board: Field[] = [Field.EMPTY, Field.EMPTY, Field.EMPTY];
//         const move = player.move(board);
//         expect(move).toBeGreaterThanOrEqual(0);
//         expect(move).toBeLessThanOrEqual(2);
//     });
// });

// describe("Outcome", () => {
//     it("should initialize with default values", () => {
//         const board: Field[] = [Field.EMPTY, Field.EMPTY, Field.EMPTY];
//         const outcome = new Outcome(board);
//         expect(outcome.finished).toBe(false);
//         expect(outcome.winner).toBe(Field.EMPTY);
//     });

//     it("should return true if the game is a draw", () => {
//         const board: Field[] = [Field.PLAYER1, Field.PLAYER2, Field.PLAYER1];
//         const outcome = new Outcome(board);
//         expect(outcome.isDraw()).toBe(true);
//     });
// });

// describe("isFull", () => {
//     it("should return true if the board is full", () => {
//         const board: Field[] = [Field.PLAYER1, Field.PLAYER2, Field.PLAYER1];
//         expect(isFull(board)).toBe(true);
//     });

//     it("should return false if the board is not full", () => {
//         const board: Field[] = [Field.PLAYER1, Field.EMPTY, Field.PLAYER1];
//         expect(isFull(board)).toBe(false);
//     });
// });

// describe("won", () => {
//     it("should return the winning player if there is a winner", () => {
//         const board: Field[] = [Field.PLAYER1, Field.PLAYER1, Field.PLAYER1];
//         expect(won(board)).toBe(Field.PLAYER1);
//     });

//     it("should return Field.EMPTY if there is no winner", () => {
//         const board: Field[] = [Field.PLAYER1, Field.EMPTY, Field.PLAYER2];
//         expect(won(board)).toBe(Field.EMPTY);
//     });
// });

// describe("newBoard", () => {
//     it("should return a new empty board", () => {
//         const board: Field[] = newBoard();
//         expect(board.length).toBe(9);
//         expect(board.every((field) => field === Field.EMPTY)).toBe(true);
//     });
// });

// describe("getBlanks", () => {
//     it("should return the indices of blank fields in the board", () => {
//         const board: Field[] = [Field.PLAYER1, Field.EMPTY, Field.PLAYER2];
//         expect(getBlanks(board)).toEqual([1]);
//     });

//     it("should return an empty array if there are no blank fields", () => {
//         const board: Field[] = [Field.PLAYER1, Field.PLAYER1, Field.PLAYER2];
//         expect(getBlanks(board)).toEqual([]);
//     });
// });

// describe("invertPlayer", () => {
//     it("should return the inverted player", () => {
//         expect(invertPlayer(Field.PLAYER1)).toBe(Field.PLAYER2);
//         expect(invertPlayer(Field.PLAYER2)).toBe(Field.PLAYER1);
//     });
// });

// describe("isPlayer", () => {
//     it("should return true if the field belongs to the player", () => {
//         expect(isPlayer(Field.PLAYER1)).toBe(true);
//     });

//     it("should return false if the field does not belong to the player", () => {
//         expect(isPlayer(Field.EMPTY)).toBe(false);
//     });
// });

/* eslint-disable no-undef */
import { Field, won } from './game'

describe('won', () => {
  it('player1 won', () => {
    const result = won([1, 1, 1, 0, 0, 0, 0, 0, 0])
    expect(result).toBe(Field.PLAYER1)
  })
  it('player2 won', () => {
    const result = won([0, 0, 0, 2, 2, 2, 0, 0, 0])
    expect(result).toBe(Field.PLAYER2)
  })
  it('draw', () => {
    const result = won([0, 0, 0, 0, 0, 0, 0, 0, 0])
    expect(result).toBe(Field.EMPTY)
  })
})