import {
  Game,
  Player,
  Mode,
  Field,
  Outcome,
  isFull,
  won,
  newBoard,
  getBlanks,
  invertPlayer,
  isPlayer,
} from "./game";

describe("newBoard", () => {
  it("should return a new empty board", () => {
    const board: Field[] = newBoard();
    expect(board.length).toBe(9);
    expect(board.every((field) => field === Field.EMPTY)).toBe(true);
  });
});

describe("getBlanks", () => {
  it("should return the indices of blank fields in the board", () => {
    const board: Field[] = [Field.PLAYER1, Field.EMPTY, Field.PLAYER2];
    expect(getBlanks(board)).toEqual([1]);
  });

  it("should return an empty array if there are no blank fields", () => {
    const board: Field[] = [Field.PLAYER1, Field.PLAYER1, Field.PLAYER2];
    expect(getBlanks(board)).toEqual([]);
  });
});

describe("invertPlayer", () => {
  it("should return the inverted player", () => {
    expect(invertPlayer(Field.PLAYER1)).toBe(Field.PLAYER2);
    expect(invertPlayer(Field.PLAYER2)).toBe(Field.PLAYER1);
  });
});

describe("isPlayer", () => {
  it("should return true if the field belongs to the player", () => {
    expect(isPlayer(Field.PLAYER1)).toBe(true);
  });

  it("should return false if the field does not belong to the player", () => {
    expect(isPlayer(Field.EMPTY)).toBe(false);
  });
});
