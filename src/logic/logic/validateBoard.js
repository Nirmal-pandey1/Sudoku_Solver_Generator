import { isValid } from "./isValid";

/**
 * Highlight any invalid placements on the board
 */
export function validateBoard(board) {
  const invalid = Array(9).fill(null).map(() => Array(9).fill(false));
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const val = board[row][col];
      if (val !== "") {
        const tempBoard = board.map(r => [...r]); // clone board
        tempBoard[row][col] = "";
        if (!isValid(tempBoard, row, col, val)) {
          invalid[row][col] = true;
        }
      }
    }
  }
  return invalid;
}
