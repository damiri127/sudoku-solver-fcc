class SudokuSolver {

  constructor() {
    this.actualPuzzle = "";
  }

  validate(puzzleString) {
    // if the puzzleString is not 81 char long
    if (puzzleString.length !== 81) {
      return { error: 'Expected puzzle to be 81 characters long' };
    }

    // Regex for number and dot, and string should be 81 char long
    let regex = /^[0-9.]{81}$/;
    if (!regex.test(puzzleString)) {
      return { error: 'Invalid characters in puzzle' };
    } else {
      return true;
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let checkRow = puzzleString.slice(row * 9, row * 9 + 9);

    // if the value is already in the cell
    if (checkRow[column] === value) {
      return true;
    }
    // if value present in the row and the value is not in the cell
    if (checkRow.includes(value) && checkRow[column] !== value) {
      return false;
    }
    // if the location is already filled
    else if (!checkRow[column] === '.') {
      return false;
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let checkCol = '';
    for (let i = 0; i < 9; i++){
      checkCol += puzzleString[i * 9 + column];
    }
    // if the value is already in the cell
    if (checkCol[row] === value) {
      return true;
    }
    // if value present in the column and the value is not in the cell
    if (checkCol.includes(value) && checkCol[row] !== value) {
      return false;
    }
    // if the location is already filled
    else if (!checkCol[row] === '.') {
      return false;
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let checkRegion = '';

    // determine the region
    let regionRow = Math.floor(row / 3);
    let regionCol = Math.floor(column / 3);

    // Determine the checkRegion string
    for (let i = regionRow * 3; i < regionRow * 3 + 3; i++){
      for (let j = regionCol * 3; j < regionCol * 3 + 3; j++){
        checkRegion += puzzleString[i * 9 + j];
      }
    }
    let cell = puzzleString[(row) * 9 + column];
    // if the value is already in cell
    if (cell === value) {
      return true;
    }
    // if value present in the region and the value is not in the cell
    if (checkRegion.includes(value) && cell !== value) {
      return false;
    }
    // if the location is already filled
    else if (!checkRegion[(row % 3) * 3 + (column % 3)] === ".") {
      return false;
    }
    return true;
  }

  // function to check if the string has a unique value
  isUnique(str) {
    let set = new Set(str);
    return str.length === set.size;
  }

  solve(puzzleString) {
    // check puzzle validity
    if (this.validate(puzzleString) !== true) {
      console.log("puzzle not valid");
      return false;
    }
    // check if the puzzle stored in the actualPuzzle is the same as the puzzleString, if so, puzzle can not be solved
    if (puzzleString === this.actualPuzzle) {
      console.log("can't be solved");
      return false;
    }

    // puzzle is not solved
    if (puzzleString.includes('.') === true) {
      // adding this puzzle to the actualPuzzle
      this.actualPuzzle = puzzleString;

      // create a temporary array to store the possible values
      let temporarySol = [];
      for (let i = 0; i < 81; i++) {
        // if the iteration not a dot then add the value into the temporary arry
        if (puzzleString[i] !== '.') {
          temporarySol.push(puzzleString[i]);
        }
        // if iteration is a dot, then add the possible value into the temporary array
        else {
          let possibleValues = [];
          // loop through the temporary array and if we have only one possible value, then add it to the solvedPuzzle
          for (let j = 1; j <= 9; j++) {
            if (this.checkRowPlacement(puzzleString, Math.floor(i / 9), i % 9, j.toString()) &&
              this.checkColPlacement(puzzleString, Math.floor(i / 9), i % 9, j.toString()) &&
              this.checkRegionPlacement(puzzleString, Math.floor(i / 9), i % 9, j.toString())) {
              possibleValues.push(j.toString());
            }
          }
          temporarySol.push(possibleValues);
        }
      }
      for (let k = 0; k < 81; k++) {
        if (temporarySol[k].length === 1) {
          temporarySol[k] = temporarySol[k][0];
        } else {
          temporarySol[k] = '.';
        }
      }

      // now we have a new puzzle
      let newPuzzle = temporarySol.join("");
      return this.solve(newPuzzle);
      // puzzle is solved
    } else {
      console.log("puzzle solved >> ", puzzleString);

      // checking if all rows are valid
      for (let i = 0; i < 9; i++) {
        if (!this.isUnique(puzzleString.substr(i * 9, 9))) {
          console.log("row not valid");
          return false;
        }
      }
      // checking if all columns are valid
      for (let j = 0; j < 9; j++){
        let column = '';
        for (let i = 0; i < 9; i++){
          column += puzzleString[i * 9 + j];
        }
        if (!this.isUnique(column)) {
          console.log("column not valid");
          return false;
        }
      }
      // checking if all regions are valid
      for (let bloc = 0; bloc < 9; bloc++){
        let grille = '';
        for (let i = 0; i < 3; i++){
          for (let j = 0; j < 3; j++){
            grille += puzzleString[Math.floor(bloc / 3) * 27 + i * 9 + (bloc % 3) * 3 + j];
          }
        }
        if (!this.isUnique(grille)) {
          console.log("region not valid");
          return false;
        }
      }
      // the puzzle is valid, so we return the solved puzzle
      return puzzleString;
    }
  }
}

module.exports = SudokuSolver;

