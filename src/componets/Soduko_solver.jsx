import React, { useState } from "react";

import Button from "./Button"; // your reusable button
import { motion, AnimatePresence } from "framer-motion";

import {emptyBoard, emptyFixed} from "../logic/logic/emptyBoard"
import { solveSudoku } from "../logic/logic/solver";
import { generateFullBoard } from "../logic/logic/generator";
import { validateBoard } from "../logic/logic/validateBoard";

export default function SudokuSolver() {
  const [board, setBoard] = useState(emptyBoard);
  const [fixed, setFixed] = useState(emptyFixed);
  const [difficulty, setDifficulty] = useState("Easy");

  const [invalidCells, setInvalidCells] = useState(Array(9).fill(null).map(() => Array(9).fill(false)));
  const [solving, setSolving] = useState(false);
  const [solved, setSolved] = useState(false);

  const handleChange = (row, col, value) => {
    if (/^[1-9]?$/.test(value)) {
      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = value;

      setBoard(newBoard);
      setInvalidCells(validateBoard(newBoard));
      setSolved(false);
    }
  };

  const handleSolve = () => {
    setSolving(true);
    setTimeout(() => {
      const newBoard = board.map((row) => [...row]);
      if (solveSudoku(newBoard, fixed)) {
        setBoard(newBoard);
        setSolved(true);
        setInvalidCells(Array(9).fill(null).map(() => Array(9).fill(false)));
      } else {
        alert("Unsolvable Sudoku");
      }
      setSolving(false);
    }, 300);
  };

  const handleReset = () => {
    setBoard(emptyBoard);
    setFixed(emptyFixed);
    setInvalidCells(Array(9).fill(null).map(() => Array(9).fill(false)));
    setSolved(false);
  };

  const handleGenerate = () => {
    const fullBoard = generateFullBoard();
    const puzzle = fullBoard.map((row) => [...row]);
    const fixedCells = Array(9).fill(null).map(() => Array(9).fill(false));

    // Clear all
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        puzzle[r][c] = "";
      }
    }

   
    let clues;
switch (difficulty) {
  case "Easy":
    clues = 36;
    break;
  case "Medium":
    clues = 30;
    break;
  case "Hard":
    clues = 24;
    break;
  default:
    clues = 30;
}
    while (clues > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (puzzle[row][col] === "") {
        puzzle[row][col] = fullBoard[row][col];
        fixedCells[row][col] = true;
        clues--;
      }
    }

    setBoard(puzzle);
    setFixed(fixedCells);
    setInvalidCells(Array(9).fill(null).map(() => Array(9).fill(false)));
    setSolved(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 drop-shadow-lg animate-pulse">
        Sudoku Solver
      </h1>

      <div className="grid grid-cols-9 gap-[2px] bg-black p-1 rounded-xl shadow-lg">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isBoxBorder = (colIndex + 1) % 3 === 0 && colIndex !== 8 ? "border-r-4 border-black" : "";
            const isRowBorder = (rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? "border-b-4 border-black" : "";
            const isSolvedCell = solved && board[rowIndex][colIndex] !== "";
            const isFixed = fixed[rowIndex][colIndex];
            const isInvalid = invalidCells[rowIndex][colIndex];

            return (
              <motion.input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                value={cell}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                className={`w-12 h-12 text-center text-xl font-semibold ${
                  isInvalid ? "bg-red-400 text-white border-red-700" : "text-gray-700 bg-white border border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 ease-in-out ${isBoxBorder} ${isRowBorder} ${isSolvedCell ? 'bg-green-100' : ''} ${isFixed ? 'bg-gray-200 font-bold' : ''}`}
                maxLength={1}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                disabled={isFixed || solving}
              />
            );
          })
        )}
      </div>

      <div className="flex gap-4 mt-6">
        <Button onClick={handleGenerate} disabled={solving}>Generate</Button>
        <Button onClick={handleSolve} disabled={solving}>
          {solving ? "Solving..." : "Solve"}
        </Button>
        <Button onClick={handleReset} >Reset</Button>
        <div className="flex items-center gap-4 mt-4">
</div>
  <label  className="px-4 py-2 rounded bg-purple-500 text-white font-bold hover:bg-purple-600 disabled:opacity-50 ">Difficulty:</label>
  <select
    value={difficulty}
    onChange={(e) => setDifficulty(e.target.value)}
    className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
  >
    <option value="Easy">Easy</option>
    <option value="Medium">Medium</option>
    <option value="Hard">Hard</option>
  </select>
</div>
     

      <AnimatePresence>
        {solved && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-green-700 text-lg font-medium"
          >
            Puzzle solved successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
