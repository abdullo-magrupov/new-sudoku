module.exports = function solveSudoku(matrix) {
  let solvedCells = [];
  let result = matrix.map(a => Object.assign([], a));

  for (let n = 0; n < matrix.length; n++) {
    for (let k = 0; k < matrix.length; k++) {
      if (matrix[n][k] !== 0) continue;

      let j = result[n][k] + 1;

      if (j === 10) {
        result[n][k] = 0;
        let copyCells = solvedCells.map(a => Object.assign([], a));
        n = copyCells[solvedCells.length - 1][0];
        k = copyCells[solvedCells.length - 1][1] - 1;
        let removedCell = solvedCells.pop();
      } else {
        for (; j <= 9; j++) {
          let toCheck = result.map(a => Object.assign([], a));
          let isValid = isValidCandidate(toCheck, j, n, k);

          if (isValid) {
            let solvedCell = [n, k, j];
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

  function isValidCandidate(latestMatrix, val, rowIndex, colIndex) {
    let horizontalAreaIndex = Math.floor(colIndex / 3) * 3;
    let verticalAreaIndex = Math.floor(rowIndex / 3) * 3;

    for (i = verticalAreaIndex; i < verticalAreaIndex + 3; i++) {
      for (j = horizontalAreaIndex; j < horizontalAreaIndex + 3; j++) {
        if (latestMatrix[i][j] !== 0 && latestMatrix[i][j] === val) {
          return false;
        }
      }
    }

    for (i = 0; i < latestMatrix.length; i++) {
      if (i === colIndex) continue;

      if (
        latestMatrix[rowIndex][i] !== 0 &&
        latestMatrix[rowIndex][i] === val
      ) {
        return false;
      }
    }

    for (i = 0; i < latestMatrix.length; i++) {
      if (i === rowIndex) continue;
      if (
        latestMatrix[i][colIndex] !== 0 &&
        latestMatrix[i][colIndex] === val
      ) {
        return false;
      }
    }

    return true;
  }

  return result;
};
