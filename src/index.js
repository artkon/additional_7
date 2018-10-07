module.exports = function solveSudoku(matrix) {

  //копия матрицы
  let solution = matrix.map( arr => arr.slice() );
  
  if(solveHelper(solution) == true){
    return solution;
  } else {
    return false;
  }


  function solveHelper(solution){
    let minPossibleCountCell = false;

    while(true){
      minPossibleCountCell = false;

      for(let i = 0; i < solution.length; i++){
        for(let j = 0; j < solution.length; j++){

          if(solution[i][j] != 0) continue;

          let possibleValues = findPossibleValues(i, j, solution);
          let possibleValuesCount = possibleValues.length;

          if(possibleValuesCount == 0){
            return false;
          }
          if(possibleValuesCount == 1){
            solution[i][j] = possibleValues[0];
            continue;
          }
          if(minPossibleCountCell == false || possibleValuesCount < minPossibleCountCell[1].length){
            minPossibleCountCell = [[i, j], possibleValues];
          }
        }
      }

      if(minPossibleCountCell == false){
        return true;
      } else if(minPossibleCountCell[1].length > 1){
          if(findPossibleValues(minPossibleCountCell[0][0], minPossibleCountCell[0][1], solution).length == minPossibleCountCell[1].length){
            break;
        }
      }
    }


    //Из вариативных решений пробуем каждое пока не получится 
    let row = minPossibleCountCell[0][0];
    let column = minPossibleCountCell[0][1];

    for(let iter = 0; iter < minPossibleCountCell[1].length; iter++){

        let solutionCopy = solution.map( arr => arr.slice() );

        solutionCopy[row][column] = minPossibleCountCell[1][iter];

        if( solveHelper( solutionCopy ) ){

          for(let j = 0; j < 9; j++){
            for(let k = 0; k < 9; k++){
              
              solution[j][k] = solutionCopy[j][k];
            } 
          }
          return true;
        }
    }
    return false;      

  }


  function findPossibleValues( rowIndex, columnIndex, matrix ){
    let sourceNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let rowValues = getRowValues(rowIndex, matrix);
    let columnValues = getColumnValues(columnIndex, matrix);
    let blockValues = getBlockValues(rowIndex, columnIndex, matrix);
    let complete = rowValues.concat( columnValues.concat(blockValues) );
    complete.forEach(function(numCheck){
      if( sourceNum.indexOf(numCheck) != -1){
        sourceNum.splice( sourceNum.indexOf(numCheck), 1 );
      }
    })
    return sourceNum;
  }

  function getRowValues( rowIndex, matrix ){
    return matrix[rowIndex].filter( element => element > 0 );
  }

  function getColumnValues( columnIndex, matrix ){
    let result = [];
    for(let n = 0; n < matrix.length; n++){
      if( matrix[n][columnIndex] == 0 ) continue;
      result.push( matrix[n][columnIndex] );
    }
    return  result;
  }

  function getBlockValues( rowIndex, columnIndex, matrix ){
    let blockRowStart = 3 * Math.floor(rowIndex / 3);
    let blockColumnStart = 3 * Math.floor(columnIndex / 3);
    let result = [];
    for(let m = blockRowStart; m < blockRowStart + 3; m++){
      for(let l = blockColumnStart; l < blockColumnStart + 3; l++){
        if( matrix[m][l] > 0 ) result.push (matrix[m][l]);
      }
    }
    return result;
  }
}