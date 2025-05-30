/**
 * Check if placing num in board[row][col] is valid
 */
export function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === num) return false;
    if (i !== row && board[i][col] === num) return false;

    // 3x3 box check
    const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const boxCol = 3 * Math.floor(col / 3) + (i % 3);
    if ((boxRow !== row || boxCol !== col) && board[boxRow][boxCol] === num) return false;
  }
  return true;
}
