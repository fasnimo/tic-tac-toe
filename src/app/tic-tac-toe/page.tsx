'use client';
import { useState } from 'react';

const TicTacToe = () => {
  // History stores all past board states
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // Current move index in history
  const [currentMove, setCurrentMove] = useState(0);

  // Whether X goes next depends on move number
  const xIsNext = currentMove % 2 === 0;

  // The current state of the board
  const currentSquares = history[currentMove];

  // Determine winner
  const winner = calculateWinner(currentSquares);

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  // Handle clicking a square
  const handleClick = (i: number) => {
    // Ignore if game over or square filled
    if (currentSquares[i] || winner) return;

    // Slice history up to current move (in case we jumped back)
    const newHistory = history.slice(0, currentMove + 1);
    const newSquares = currentSquares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';

    setHistory([...newHistory, newSquares]);
    setCurrentMove(newHistory.length); // advance to next move
  };

  // Jump to a previous move
  const jumpTo = (move: number) => {
    setCurrentMove(move);
  };

  // Reset the game
  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-10">
      <div className="text-xl">{status}</div>

      {/* Game board */}
      <div className="grid grid-cols-3 gap-1">
        {currentSquares.map((square, i) => (
          <button
            key={i}
            className="w-20 h-20 text-2xl border"
            onClick={() => handleClick(i)}
          >
            {square}
          </button>
        ))}
      </div>

      {/* Move history */}
      <div className="mt-4 flex flex-col items-center">
        <div className="font-bold mb-2">Move History:</div>
        {history.map((_, move) => (
          <button
            key={move}
            className="text-blue-500 hover:underline"
            onClick={() => jumpTo(move)}
          >
            {move === 0 ? 'Go to game start' : `Go to move #${move}`}
          </button>
        ))}
      </div>

      {/* Reset game */}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

// Same winner logic
function calculateWinner(squares: string[]): string | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
