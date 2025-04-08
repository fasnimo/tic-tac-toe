'use client'; // This tells Next.js that this component uses client-side interactivity (like state)

// Import React hook for state management
import { useState } from 'react';

const TicTacToe = () => {
  // squares holds the current state of the board (9 elements, either 'X', 'O', or null)
  const [squares, setSquares] = useState(Array(9).fill(null));

  // xIsNext keeps track of whose turn it is (true for 'X', false for 'O')
  const [xIsNext, setXIsNext] = useState(true);

  // Determine if there's a winner
  const winner = calculateWinner(squares);

  // Show game status: either winner or next player
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  // Handle a square being clicked
  const handleClick = (i: number) => {
    // Ignore the click if the square is already filled or the game is over
    if (squares[i] || winner) return;

    // Make a copy of the board state
    const newSquares = squares.slice();

    // Fill the clicked square with the current player's symbol
    newSquares[i] = xIsNext ? 'X' : 'O';

    // Update the state with the new board
    setSquares(newSquares);

    // Switch turns
    setXIsNext(!xIsNext);
  };

  // Render one square on the board
  const renderSquare = (i: number) => (
    <button
      key={i} // ✅ Add key prop here to avoid console warning
      className="w-20 h-20 text-2xl border"
      onClick={() => handleClick(i)}
    >
      {squares[i]}
    </button>
  );

  // Reset the game to initial state
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  // Render the full game UI
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-10">
      {/* Display current game status */}
      <div className="text-xl">{status}</div>

      {/* Render the 3x3 game board */}
      <div className="grid grid-cols-3 gap-1">
        {squares.map((_, i) => renderSquare(i))}
      </div>

      {/* Reset game button */}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

// Helper function to check for a winner
function calculateWinner(squares: string[]): string | null {
  // All possible winning line combinations
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // Check each line to see if all three squares match
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winner ('X' or 'O')
    }
  }

  // No winner
  return null;
}

export default TicTacToe;
