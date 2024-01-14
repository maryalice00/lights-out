import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  function createBoard() {
    const initialBoard = Array.from({ length: nrows }, () =>
      Array.from({ length: ncols }, () => false)
    );

    // Create a symmetrical pattern (e.g., a checkerboard)
    for (let i = 0; i < Math.min(nrows, ncols) / 2; i++) {
      for (let j = 0; j < Math.min(nrows, ncols); j++) {
        initialBoard[i][j] = true; // Set some cells to be initially lit
        initialBoard[nrows - 1 - i][j] = true; // Symmetrically set the corresponding cells
      }
    }

    return initialBoard;
  }

  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const boardCopy = oldBoard.map(row => [...row]);

      const flipCell = (y, x) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      flipCell(y, x);
      flipCell(y - 1, x);
      flipCell(y + 1, x);
      flipCell(y, x - 1);
      flipCell(y, x + 1);

      return boardCopy;
    });
  }

  const won = hasWon();

  return (
    <div>
      {won ? (
        <div className="winner-message">You Won!</div>
      ) : (
        <table className="Board">
          <tbody>
            {board.map((row, y) => (
              <tr key={y}>
                {row.map((cell, x) => (
                  <Cell
                    key={`${y}-${x}`}
                    isLit={cell}
                    flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Board;
