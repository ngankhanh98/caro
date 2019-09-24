import React from 'react';
import { Square } from "./Square";
export class Board extends React.Component {
  renderSquare(i) {
    let winningSquare = this.props.winner && this.props.winner.includes(i) ? true : false;
    console.log(winningSquare);
    return (<Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} winningSquare={winningSquare} />);
  }
  createBoard() {
    let board = [];
    for (let i = 0; i < 20; i++) {
      let row = [];
      for (let j = 0; j < 20; j++) {
        /*row.push(<Square value={this.state.squares[20 * i + j]} onClick={() => this.handleClick(20 * i + j)} />)*/
        row.push(this.renderSquare(20 * i + j));
      }
      board.push(<div className="board-row">{row}</div>);
    }
    return board;
  }
  render() {
    return (this.createBoard());
  }
}
