// Initial variables
let currentPlayer = 'X'; // Player X starts
let board = ['', '', '', '', '', '', '', '', '']; // Represents the game board
let gameActive = true; // Flag to track if the game is active

// Winning combinations (indices of winning lines)
const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Top-left to bottom-right diagonal
    [2, 4, 6]  // Top-right to bottom-left diagonal
];

// Function to handle click on a box (Player's turn)
function handleBoxClick(index) {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        document.getElementById(index).innerText = currentPlayer;
        if (checkWin()) {
            announceWinner();
        } else if (checkDraw()) {
            announceDraw();
        } else {
            switchPlayer();
            // If AI's turn (AI is 'O'), make a random move
            if (currentPlayer === 'O' && gameActive) {
                setTimeout(makeAIMove, 1000); // Delay AI move for better user experience (1 second)
            }
        }
    }
}

// Function to make AI move (random)
function makeAIMove() {
    // Generate random index until an empty spot is found
    let index;
    do {
        index = Math.floor(Math.random() * 9);
    } while (board[index] !== '');

    board[index] = 'O';
    document.getElementById(index).innerText = 'O';

    if (checkWin()) {
        announceWinner();
    } else if (checkDraw()) {
        announceDraw();
    } else {
        switchPlayer();
    }
}

// Function to check for a winner
function checkWin() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
            return true;
        }
    }
    return false;
}

// Function to announce the winner
function announceWinner() {
    document.getElementById('playerText').innerText = `${currentPlayer === 'X' ? 'Player' : 'AI'} wins!`;
    gameActive = false;
}

// Function to check for a draw
function checkDraw() {
    return !board.includes('');
}

// Function to announce a draw
function announceDraw() {
    document.getElementById('playerText').innerText = "It's a draw!";
    gameActive = false;
}

// Function to switch player turns
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('playerText').innerText = `${currentPlayer === 'X' ? 'Player' : 'AI'}'s turn`;
}

// Function to restart the game
function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    // Reset UI
    document.getElementById('playerText').innerText = "Let's start";
    document.querySelectorAll('.box').forEach(box => {
        box.innerText = '';
    });

    // Reset if AI starts first
    if (currentPlayer === 'O') {
        setTimeout(makeAIMove, 500); // Delay AI move for better user experience (0.5 second)
    }
}

// Event listeners
document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', () => {
        handleBoxClick(parseInt(box.id));
    });
});

document.getElementById('restartBtn').addEventListener('click', () => {
    restartGame();
});
