import type { BoardStatus } from "./types";

export function rotateMatrix(matrix: BoardStatus[][]): BoardStatus[][] {
  if (!matrix.length) {
    return matrix;
  }

  const rows: number = matrix.length;
  const cols: number = matrix[0].length;

  // Create a new matrix with swapped dimensions
  const rotatedMatrix: BoardStatus[][] = new Array(cols)
    .fill(0)
    .map(() => new Array(rows).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rotatedMatrix[j][rows - 1 - i] = matrix[i][j];
    }
  }

  return rotatedMatrix;
}

export default {
  rotateMatrix
}