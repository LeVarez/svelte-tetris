export type Board = BoardCell[][];

export type BoardCell = {
  status: BoardStatus;
  color: string;
}

export type BoardStatus = 1 | 0;

export type Tetrimonio = {
  x: number;
  y: number;
  shape: BoardStatus[][];
  rotation: number;
  color: string;
}

export default {};