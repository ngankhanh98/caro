import React from 'react';
export function Square(props) {
  const highlightwin = {
    backgroundColor: 'yellow'
  };
  return (<button key={props.key} className="square" onClick={props.onClick} style={props.winningSquare ? highlightwin : null}>
    {props.value}
  </button>);
}
