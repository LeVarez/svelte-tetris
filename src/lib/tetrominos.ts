import type { BoardStatus } from "./types";

// Tetromino J
export const tetrominoJ: BoardStatus[][] = [
  [0, 0, 1],
  [1, 1, 1],
  [0, 0, 0]
];

// Tetromino O (Square)
export const tetrominoO: BoardStatus[][] = [
  [1, 1],
  [1, 1]
];

// Tetromino L (Mirror of J)
export const tetrominoL: BoardStatus[][] = [
  [1, 0, 0],
  [1, 1, 1],
  [0, 0, 0]
];

// Tetromino Z (Mirror of S)
export const tetrominoZ: BoardStatus[][] = [
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 0]
];

// Tetromino S (Mirror of Z)
export const tetrominoS: BoardStatus[][] = [
  [0, 1, 1],
  [1, 1, 0],
  [0, 0, 0]
];

// Tetromino T
export const tetrominoT: BoardStatus[][] = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 0, 0]
];

// Tetromino I (Horizontal)
export const tetrominoI: BoardStatus[][] = [
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];
export default [ tetrominoI, tetrominoJ, tetrominoL, tetrominoO, tetrominoS, tetrominoT, tetrominoZ ];
