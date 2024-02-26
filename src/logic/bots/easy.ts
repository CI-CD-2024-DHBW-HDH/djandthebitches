import { Field, won, getBlanks } from "../game";
import { randomMove } from "./bot";

// the easy bot plays a winning move, if it can
// otherwise, it plays a random move
export function easyMove(board: Field[], own: Field): number {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === Field.EMPTY) {
      // Simulate the move
      const tempBoard = [...board];
      tempBoard[i] = own;

      // Check if this move wins the game
      if (won(tempBoard) === own) {
        return i; // Return the winning move
      }
    }
  }
  const emptySpots = getBlanks(board);
  const bounds = emptySpots.length; // This is the number of available empty spots

  if (bounds === 0) {
    return -1; // No move is possible
  }

  const randomIndex = randomMove(bounds); // Get a random index based on the number of empty spots
  return emptySpots[randomIndex]; // Return the actual board index of the random empty spot
}
