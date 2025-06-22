import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const currentSquares = history[stepNumber];

  const handleClick = (i) => {
    const historyUpToStep = history.slice(0, stepNumber + 1);
    const current = historyUpToStep[historyUpToStep.length - 1];
    const squares = [...current];

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";
    setHistory([...historyUpToStep, squares]);
    setStepNumber(historyUpToStep.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const winner = calculateWinner(currentSquares);
  const status = winner
    ? "Vencedor: " + winner
    : "Próximo jogador: " + (xIsNext ? "X" : "O");

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>
          {history.map((_step, move) => {
            const desc = move ? `Ir para jogada #${move}` : "Início do jogo";
            return (
              <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
