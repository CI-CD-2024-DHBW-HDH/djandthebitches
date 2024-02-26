import { getBlanks, invertPlayer, Field } from "../game";
import { randomMove, winningMove } from "./bot";

export function mediumMove(board: Field[], own: Field): number {
  // Check if the bot can win
  const winningMoveIndex = winningMove(board, own);
  if (winningMoveIndex !== -1) {
    return winningMoveIndex;
  }

  // Check if the opponent can win and block them
  const opponent = invertPlayer(own);
  const blockingMoveIndex = winningMove(board, opponent);
  if (blockingMoveIndex !== -1) {
    return blockingMoveIndex;
  }

  // Check if the center field is available and play there
  const centerIndex = 4;
  if (board[centerIndex] === Field.EMPTY) {
    return centerIndex;
  }

  // Otherwise, make a random move
  const blanks = getBlanks(board);
  return randomMove(blanks.length);
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
