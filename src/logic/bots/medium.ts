import { getBlanks, invertPlayer, type Field } from "../game";
import { randomMove, winningMove } from "./bot";

// the medium bot plays a wiining move, if it can
// or blocks the opponent from winning
// or plays the center field if it can
// otherwise it plays a random move
export function mediumMove(board: Field[], own: Field): number {
  return -1
}

// this bot just tries to block a win
// otherwise it plays a random move
export function pettyMove(board: Field[], own: Field): number {
  // Check if opponent has a potential winning move and block it
  const opponent = invertPlayer(own);
  const potentialWinningMove = winningMove(board, opponent);
  if (potentialWinningMove !== -1) {
    return potentialWinningMove;
  }

  // If opponent doesn't have a potential winning move, make a random move
  const blanks = getBlanks(board);
  const randomIndex = Math.floor(Math.random() * blanks.length);
  return blanks[randomIndex];
}