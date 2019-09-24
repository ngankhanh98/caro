import React from 'react';
import './App.css';

function Square(props) {
  const highlightwin = {
    backgroundColor: 'yellow'
  };

  return (
    <button key={props.key} className="square" onClick={props.onClick} style={props.winningSquare? highlightwin : null}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
   
    let winningSquare = this.props.winner && this.props.winner.includes(i) ? true : false;
    console.log(winningSquare);
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        winningSquare={winningSquare}
      />
    );
  }
  createBoard() {
    let board = []
    for (let i = 0; i < 20; i++) {
      let row = []
      for (let j = 0; j < 20; j++) {
        /*row.push(<Square value={this.state.squares[20 * i + j]} onClick={() => this.handleClick(20 * i + j)} />)*/
        row.push(this.renderSquare(20 * i + j))
      }
      board.push(<div className="board-row">{row}</div>);
    }
    return board;
  }
  render() {
    return (
      this.createBoard()
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(400).fill(null)
        }
      ],
      locations:[], // array stores location of individual move
      stepNumber: 0,
      xIsNext: true,
      winner: null,
      selectedStep: null,
      winArea: [], // array stores winning locations
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const locations = this.state.locations.slice();
    const board = this.state.history[this.state.stepNumber];
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let winner;
    let winArea;

    if (this.state.winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    locations.push(i);
    winArea = calculateWinner(i, board, squares[i]);
    if (winArea.length ===5)
    {
        winner = squares[i];
    }
    this.setState({ winner: winner, winArea: winArea});
  
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
  
  }

  jumpTo(step) {
    // reset the game
    if(step===0)
    {
      this.setState({ history: [{ squares: Array(400).fill(null) }], winner: null, xNext: true, stepNumber: 0 });
    } else{
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
    }
    this.setState({selectedStep: step});
}

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.state.winner;
    const winArea = this.state.winArea;

    
    const moves = history.map((step, move) => {
      const location = this.state.locations;

      let row = Math.floor(location[move-1] / 20);
      let col = location[move-1] % 20;
      let colrow = col!=null && row!=null ? ` (${col}, ${row})`:``;

      const desc = move ?
        'Go to move #' + move + colrow :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} className={this.state.selectedStep !== move ? '' : 'bold'}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winner={winner && winArea.length === 5 ? winArea:null}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(i, squares, value) {
  let row = Math.floor(i / 20);
  let col = i % 20;
  let count = 0;
  let winArea = [];


  // check row
  for (let k = 0; k < 20; k++) {
    if (squares.squares[row * 20 + k] !== value) {
      count = 0;
      winArea = winArea.slice(0,0);
    }
    else {
      count++;
      winArea.push(row * 20 + k);
    }
    if (count === 4) {
      winArea.push(i);
      return winArea;
    }
  }
  

  // check col
  for (let k = 0; k < 20; k++) {
    if (squares.squares[k * 20 + col] !== value) {
      count = 0;
      winArea = winArea.slice(0, 0);
    }
    else {
      count++;
      winArea.push(k * 20 + col);
    }
    if (count === 4) {
      winArea.push(i);      
      return winArea;
    }
  }
  // check diagonal
  let inital_pos = i % 21;
  for (let k = 0; k < 20; k++) {
    if (squares.squares[inital_pos + 21 * k] !== value) {
      count = 0;
      winArea = winArea.slice(0, 0);
    }
    else {
      count++;
      winArea.push(inital_pos + 21 * k);
    }
    if (count === 4) {
      winArea.push(i);
      return winArea;
    }
  }
  // check anti-diagonal
  let inital_pos_anti = i % 21 + 2 * row;

  for (let k = 0; k < 20; k++) {
    if (squares.squares[inital_pos_anti + 19 * k] !== value) {
      count = 0;
      winArea = winArea.slice(0, 0);
    }
    else {
      count++;
      winArea.push(inital_pos_anti + 19 * k);
    }
    if (count === 4) {
      winArea.push(i);
      return winArea;
    }
  }
  return winArea;
}

export default Game;