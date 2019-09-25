import React from 'react';
import { calculateWinner } from "./calculateWinner";
import { Board } from "./Board";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(400).fill(null)
        }
      ],
      locations: [], 
      stepNumber: 0,
      xIsNext: true,
      winner: null,
      selectedStep: null,
      winArea: [],
      isIncrease: true
    };
  }


  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const stepNumber = this.state.stepNumber;
    const locations = stepNumber ? this.state.locations.slice(0, stepNumber) : this.state.locations.slice();
    const board = this.state.history[this.state.stepNumber];
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let winner;
    let winArea;
    if (this.state.winner || squares[i]) {
      return;
    }
    console.log('before ')
    console.log(this.state.history[this.state.stepNumber].squares);
    squares[i] = this.state.xIsNext ? "X" : "O";
    locations.push(i);
    winArea = calculateWinner(i, board, squares[i]);
    if (winArea) {
      winner = squares[i];
    }
    this.setState({ winner: winner, winArea: winArea });
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      locations: locations,
    });
    console.log('after:')
    console.log(this.state.history[this.state.stepNumber].squares);
  }

  jumpTo(step) {
    // reset the game
    console.log(step);
    if (step === 0) {
      this.setState({ history: [{ squares: Array(400).fill(null) }], winner: null, xNext: true, stepNumber: 0, locations: []});
    }
    else {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
    this.setState({ selectedStep: step });
  }

  handleSort() {
    this.setState({ isIncrease: !this.state.isIncrease });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.state.winner;
    const winArea = this.state.winArea;
    const increase = this.state.isIncrease;
    const stepNumber = this.state.stepNumber;
    const moves = history.map((step, move) => {
      const location = this.state.locations;
      let row = Math.floor(location[move - 1] / 20);
      let col = location[move - 1] % 20;
      let colrow = col != null && row != null ? ` (${col}, ${row})` : ``;
      const desc = move ?
        'Go to move #' + move + colrow :
        'Go to game start';
      return (<li key={move}>
        <button onClick={() => this.jumpTo(move)} className={this.state.selectedStep !== move ? '' : 'bold'}>{desc}</button>
      </li>);
    });
    let status;
    if (winner) {
      status = "Winner: " + winner;
    }
    else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    let sort = increase ? `${stepNumber + 1} to 1` : `1  to ${stepNumber+1}`;
    return (<div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={i => this.handleClick(i)} winner={winner && winArea ? winArea : null} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={() => this.handleSort()}>{sort}</button>
        <ol className={increase ? "inscrease" : "descrease"} onChange={this.handleSort.bind(this)}>{moves}</ol>
      </div>
    </div>);
  }
}
