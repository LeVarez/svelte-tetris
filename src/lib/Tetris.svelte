<script lang="ts">
	import { onMount } from 'svelte';
	import lib from './index';

	import type { Board, Tetrimonio } from './types';
	import utils from './utils';

	// Define board size
	const ROWS = 20;
	const COLUMNS = 10;
	const BLOCK_SIZE = 30;

	// Game logics

	// Get canvas element
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let board: Board = [];
	let lastTime = 0;
	let fallInterval = 1000;
	let currentPiece: Tetrimonio = {
		x: 0,
		y: 0,
		rotation: 0,
		shape: lib.tetrominos[2],
		color: 'red'
	};

	function update() {
		const currentTime = performance.now();
		// Calcula el tiempo transcurrido desde la última actualización
		const deltaTime = currentTime - lastTime;

		if (deltaTime >= fallInterval) {
			if (!checkColission(currentPiece, 0, 1)) {
				currentPiece.y += 1;
			} else {
				// La pieza ha llegado al final o ha colisionado
				// Aquí puedes agregar lógica para fijar la pieza en su lugar y generar una nueva
				const tetrimonioNextPos = {
					shape: currentPiece.shape,
					rotation: currentPiece.rotation,
					x: currentPiece.x,
					y: currentPiece.y,
					color: currentPiece.color
				};
				fixTetrimonioOnBoard(tetrimonioNextPos);
				resetCurrentPiece();
				checkFullRow();
			}
			lastTime = currentTime;
		}

		// Actualiza el tiempo de la última actualización
	}
	function resetCurrentPiece() {
		currentPiece.x = 0;
		currentPiece.y = 0;
		let randomIndex = Math.floor(Math.random() * lib.tetrominos.length);
		currentPiece.shape = lib.tetrominos[randomIndex];
		const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'cyan'];
		randomIndex = Math.floor(Math.random() * colors.length);
		currentPiece.color = colors[randomIndex];
	}
	function checkFullRow() {
		board.forEach((row, i) => {
			if (row.every((cell) => cell.status === 1)) {
				row.fill({ status: 0, color: 'black' }, 0, row.length);
				for (let prevI = i; prevI >= 0; prevI--) {
					for (let prevJ = 0; prevJ < COLUMNS; prevJ++) {
						if (board[prevI][prevJ].status === 1) {
							board[prevI + 1][prevJ] = { status: 1, color: board[prevI][prevJ].color};
							board[prevI][prevJ] = { status: 0, color: 'black' };
						}
					}
					if (board[prevI].some((val) => val.status === 1))
						board[prevI].fill({ status: 0, color: 'black' }, 0, board[prevI].length);
				}
			}
		});
	}
	function fixTetrimonioOnBoard(piece: Tetrimonio) {
		for (let row = 0; row < piece.shape.length; row++) {
			for (let col = 0; col < piece.shape[row].length; col++) {
				if (piece.shape[row][col] === 1) {
					const boardY = piece.y + row;
					const boardX = piece.x + col;
					board[boardY][boardX] = { status: 1, color: piece.color };
					console.log('change status', board[boardY][boardX]);
				}
			}
		}
		console.log(board);
	}
	function checkColission(piece: Tetrimonio, incrementX = 0, incrementY = 0) {
		const x = piece.x + incrementX;
		const y = piece.y + incrementY;
		const shape = piece.shape;

		// Itera sobre la forma de la pieza
		for (let row = 0; row < shape.length; row++) {
			for (let col = 0; col < shape[row].length; col++) {
				// Comprueba si la celda actual de la pieza está ocupada (1)
				if (shape[col][row] === 1) {
					// Calcula las coordenadas en el tablero global
					const boardY = y + col;
					const boardX = x + row;

					// Comprueba si la celda en el tablero está fuera de los límites
					if (
						boardX < 0 ||
						boardX >= COLUMNS || // Fuera de límites horizontales
						boardY >= ROWS // Fuera de límites verticales (no es necesario comprobar arriba)
					) {
						return true; // Colisión con el borde del tablero
					}

					// Comprueba si la celda en el tablero está ocupada por otra pieza
					if (board[boardY][boardX].status === 1) {
						return true; // Colisión con otra pieza
					}
				}
			}
		}

		return false;
	}
	function drawPiece(piece: Tetrimonio) {
		piece.shape.forEach((row, rowIndex) => {
			row.forEach((cell, colIndex) => {
				if (cell === 1) {
					const y = (rowIndex + piece.y) * BLOCK_SIZE;
					const x = (colIndex + piece.x) * BLOCK_SIZE;
					printCell(context, x, y, BLOCK_SIZE, BLOCK_SIZE, piece.color);
				}
			});
		});
	}

	function initBoard() {
		for (let row = 0; row < ROWS; row++) {
			board[row] = Array(COLUMNS).fill({ status: 0, color: 'black' });
		}
	}

	function drawBoard() {
		// Print background
		// context.fillStyle = 'black';
		// context.fillRect(0, 0, canvas.width, canvas.height);

		// Print cells
		board.forEach((row, rowNumber) => {
			row.forEach((cell, columnNumber) => {
				printCell(
					context,
					columnNumber * BLOCK_SIZE,
					rowNumber * BLOCK_SIZE,
					BLOCK_SIZE,
					BLOCK_SIZE,
					cell.color
				);
			});
		});

		drawPiece(currentPiece);
	}

	function printCell(
		context: CanvasRenderingContext2D,
		x: number,
		y: number,
		width: number,
		height: number,
		color: string
	) {
		context.fillStyle = color;
		context.fillRect(x, y, width, height);
		context.strokeStyle = 'white';
		context.strokeRect(x, y, width, height);
	}

	function gameLoop() {
		drawBoard();
		update();
		requestAnimationFrame(gameLoop);
	}

	function addControls() {
		document.addEventListener('keydown', (event) => {
			if (event.isComposing || event.keyCode === 229) {
				return;
			}
			let auxPiece: Tetrimonio;
			switch (event.key) {
				case 'ArrowRight':
					if (checkColission(currentPiece, 1, 0)) return;
					currentPiece.x += 1;
					break;
				case 'ArrowLeft':
					if (checkColission(currentPiece, -1, 0)) return;
					currentPiece.x -= 1;
					break;
				case 'ArrowDown':
					if (checkColission(currentPiece, 0, 1)) return;
					currentPiece.y += 1;
					break;
				case 'ArrowUp':
					auxPiece = { ...currentPiece };
					auxPiece.shape = utils.rotateMatrix(currentPiece.shape);
					if (checkColission(auxPiece, 0, 0)) return;
					currentPiece.shape = auxPiece.shape;
					break;
			}
		});
	}
	onMount(() => {
		canvas = document.getElementById('tetris') as HTMLCanvasElement;
		context = canvas.getContext('2d') as CanvasRenderingContext2D;
		canvas.width = COLUMNS * BLOCK_SIZE;
		canvas.height = ROWS * BLOCK_SIZE;
		lastTime = performance.now();
		addControls();
		//Create empty board;
		initBoard();
		gameLoop();
	});
</script>

<canvas id="tetris" />

<style>
</style>
