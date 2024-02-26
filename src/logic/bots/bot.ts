import { Field, Mode, won } from "../game";
import { easyMove } from "./easy";
import { hardMove } from "./hard";
import { mediumMove, pettyMove } from "./medium";

export type BotMove = (board: Field[], own: Field) => number;

export function moveWithMode(mode: Mode): BotMove | undefined {
  switch (mode) {
    case Mode.EASY:
      return easyMove;
    case Mode.PETTY:
      return pettyMove;
    case Mode.MEDIUM:
      return mediumMove;
    case Mode.HARD:
      return hardMove;
    case Mode.HUMAN || Mode.ONLINE:
      return undefined;
    default:
      return undefined;
  }
}

// winningMove returns a move player can play to win
// if there is no winning move, it returns -1
export function winningMove(board: Field[], player: Field): number {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === Field.EMPTY) {
      board[i] = player;

      if (won(board) === player) {
        board[i] = Field.EMPTY;
        return i;
      }

      board[i] = Field.EMPTY;
    }
  }

  return -1;
}

export function randomMove(bounds: number): number {
  return Math.floor(Math.random() * bounds);
}
