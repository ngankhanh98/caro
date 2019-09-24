export function calculateWinner(i, squares, value) {
  let row = Math.floor(i / 20);
  let col = i % 20;
  let count = 0;
  let winArea = [];
  // check row
  for (let k = 0; k < 20; k++) {
    if (squares.squares[row * 20 + k] !== value) {
      count = 0;
      winArea = winArea.slice(0, 0);
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
    let inital_pos_anti = i % 20 + row;
  console.log(inital_pos_anti);
    for (let k = 0; k < 20 && k <= inital_pos_anti; k++) {
      console.log(inital_pos_anti + 19 * k);
    if (squares.squares[inital_pos_anti + 19 * k] !== value) {
      count = 0;
      winArea = winArea.slice(0, 0);
    }
    else {
      count++;
      console.log(`count ${value}: ${count}`);
      winArea.push(inital_pos_anti + 19 * k);
    }
    if (count === 4) {
      winArea.push(i);
      return winArea;
    }
  }
  return winArea;
}
