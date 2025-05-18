import { isValid } from "./isValid";

/**
 * Recursive backtracking Sudoku solver
 */
export function solveSudoku(board, fixed) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === "" && !fixed[row][col]) {
        for (let num = 1; num <= 9; num++) {
          const val = num.toString();
          if (isValid(board, row, col, val)) {
            board[row][col] = val;
            if (solveSudoku(board, fixed)) return true;
            board[row][col] = ""; // Backtrack
          }
        }
        return false; // No valid number found
      }
    }
  }
  return true; // Solved
}
