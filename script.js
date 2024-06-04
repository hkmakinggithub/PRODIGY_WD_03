// script.js
const board = document.getElementById('game-board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

let currentPlayer = 'X';
let cells = Array(9).fill('');
let gameActive = true;

function handleCellClick(index) {
    if (gameActive && !cells[index]) {
        cells[index] = currentPlayer;
        renderBoard();
        if (checkWin()) {
            gameActive = false;
            status.textContent = `Player ${currentPlayer} wins!`;
        } else if (cells.every(cell => cell)) {
            gameActive = false;
            status.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function renderBoard() {
    board.innerHTML = '';
    cells.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = value;
        cell.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cell);
    });
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winConditions.some(condition =>
        condition.every(index => cells[index] === currentPlayer)
    );
}

function resetGame() {
    currentPlayer = 'X';
    cells = Array(9).fill('');
    gameActive = true;
    status.textContent = `Player ${currentPlayer}'s turn`;
    renderBoard();
}

resetButton.addEventListener('click', resetGame);
resetGame();
