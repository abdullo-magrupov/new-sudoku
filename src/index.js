module.exports = function solveSudoku(matrix) {
  // solvedCells array used to keep track of all solved cells on matrix
  let solvedCells = [];

  // deeply copying the original matrix, in order not to mutate it
  let result = matrix.map(a => Object.assign([], a));

  // For solving the sudoku backtracking algorithm was implemented
  // Loop goes through each empty cell 
  // and initiates candidates from 1-9 and checks the cell for validness
  // and keeps track of each valid filled cell on the solvedCells array
  // If on some point program will run out of valid candidates
  // it returns to the last valid cell by changing the loop's iterator variables and changes cells value 
  // this process will continue until the end of the matrix
  for (let n = 0; n < matrix.length; n++) {
    for (let k = 0; k < matrix.length; k++) {
      // No need for checking initially filled cell
      if (matrix[n][k] !== 0) continue;

      // Initiating cell's value
      let j = result[n][k] + 1;

      // If j === 10 , program will not enter the loop below
      // and will not go back to the valid cell if necessary
      if (j === 10) {
        // Undoing the choice on the cell
        result[n][k] = 0;

        let copyCells = solvedCells.map(a => Object.assign([], a));

        // Setting iterator variable to last valid cell's indexes
        n = copyCells[solvedCells.length - 1][0];
        k = copyCells[solvedCells.length - 1][1] - 1;

        // Removing the last valid cell from the solvedCells array, as it is not the valid cell anymore
        let removedCell = solvedCells.pop();
      } else {
        // This loops checks the cell for candidates 1-9 and initiates if valid
        for (; j <= 9; j++) {
          let toCheck = result.map(a => Object.assign([], a));
          let isValid = isValidCandidate(toCheck, j, n, k);

          // If valid candidate is found then it is filled on matrix 
          // and cell's indexes pushed to solvedCells array, as it is the latest valid cell
          if (isValid) {
            let solvedCell = [n, k];
            solvedCells.push(solvedCell);
            result[n][k] = j;
            break;
          } else if (!isValid && j === 9) {
            result[n][k] = 0;
            let copyCells = solvedCells.map(a => Object.assign([], a));
            n = copyCells[solvedCells.length - 1][0];
            k = copyCells[solvedCells.length - 1][1] - 1;

            let removedCell = solvedCells.pop();
          }
        }
      }
    }
  }

  // Helper function for cheking the cell's candidate for validness
  function isValidCandidate(latestMatrix, val, rowIndex, colIndex) {
    // Identifies the beginning index of horizontal subarea
    let horizontalAreaIndex = Math.floor(colIndex / 3) * 3;
    
    // Identifies the beginning index of vertical subarea
    let verticalAreaIndex = Math.floor(rowIndex / 3) * 3;

    // Checks the candidate's validness inside the subarea
    for (i = verticalAreaIndex; i < verticalAreaIndex + 3; i++) {
      for (j = horizontalAreaIndex; j < horizontalAreaIndex + 3; j++) {
        if (latestMatrix[i][j] !== 0 && latestMatrix[i][j] === val) {
          return false;
        }
      }
    }

    // Checks candidate's validness for row and column
    for (i = 0; i < latestMatrix.length; i++) {
      if ((latestMatrix[rowIndex][i] !== 0 && latestMatrix[rowIndex][i] === val && i !== colIndex) || (latestMatrix[i][colIndex] !== 0 && latestMatrix[i][colIndex] === val && i !== rowIndex))  {
        return false;
      }
    }

    return true;
  }

  return result;
};
