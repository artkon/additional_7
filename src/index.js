module.exports = function solveSudoku(matrix) {
  var solution = matrix.map(function(arr){
    return arr.slice();
  });
  // console.log(solution);

  // debugger;
  while(true){
    var minPossibleCountCell = false;
    for(var i = 0; i < solution.length; i++){
      for(var j = 0; j < solution.length; j++){
        if(solution[i][j] != 0) continue;
        var possibleValues = findPossibleValues(i, j, solution);
        var possibleValuesCount = possibleValues.length;

        if(possibleValuesCount == 0){
          console.log("FAIL");
          return false;
        }
        if(possibleValuesCount == 1){
          solution[i][j] = possibleValues[0];
          console.log('+1 : ' + i + ':' + j);
          continue;
        }
        if(minPossibleCountCell == false || possibleValuesCount < minPossibleCountCell[1].length){
          minPossibleCountCell = [[i, j], possibleValues];
          console.log(minPossibleCountCell);
        }
        // console.log(possibleValuesCount);
      }
      // break;
    }

    if(minPossibleCountCell == false){
      console.log("РЕШЕНО");
      printSudoku(solution);
      return solution;
    } else if(minPossibleCountCell[1].length > 1){
        if(findPossibleValues(minPossibleCountCell[0][0], minPossibleCountCell[0][1], solution).length == minPossibleCountCell[1].length){
          break;
      }
    }
  }
  debugger;




  //Из вариативных решений пробуем каждое пока не получится 
  var row = minPossibleCountCell[0][0];
  var column = minPossibleCountCell[0][1];
  for(let iter = 0; iter < minPossibleCountCell[1].length; iter++){
      var solutionCopy = solution.map(function(arr){
        return arr.slice();
      });
      solutionCopy[row][column] = minPossibleCountCell[1][iter];
      console.log("Внутри ");

      if(solveSudoku( solutionCopy )){
        for(let j = 0; j < 9; j++){
          for(let k = 0; k < 9; k++){
            solution[j][k] = solutionCopy[j][k];
          } 
        }
        return true;
      }

  }

  function findPossibleValues( rowIndex, columnIndex, matrix ){
    var sourceNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var rowValues = getRowValues(rowIndex, matrix);
    var columnValues = getColumnValues(columnIndex, matrix);
    var blockValues = getBlockValues(rowIndex, columnIndex, matrix);
    var complete = rowValues.concat( columnValues.concat(blockValues) );
    complete.forEach(function(numCheck){
      if( sourceNum.indexOf(numCheck) != -1){
        sourceNum.splice( sourceNum.indexOf(numCheck), 1 );
      }
    })
    // document.write(sourceNum);
    return sourceNum;
  }

  function getRowValues( rowIndex, matrix ){
    return matrix[rowIndex].filter(function(element){
      return element > 0;
    })
  }

  function getColumnValues( columnIndex, matrix ){
    var result = [];
    for(var n = 0; n < matrix.length; n++){
      if( matrix[n][columnIndex] == 0 ) continue;
      result.push( matrix[n][columnIndex] );
    }
    return  result;
  }

  function getBlockValues( rowIndex, columnIndex, matrix ){
    var blockRowStart = 3 * Math.floor(rowIndex / 3);
    var blockColumnStart = 3 * Math.floor(columnIndex / 3);
    var result = [];
    for(var m = blockRowStart; m < blockRowStart + 3; m++){
      for(var l = blockColumnStart; l < blockColumnStart + 3; l++){
        if( matrix[m][l] > 0 ) result.push (matrix[m][l]);
      }
    }
    // document.write(result + "<br>");
    return result;
  }

  function printSudoku(matrix){
    for(var i = 0; i < matrix.length; i++){
      // document.write(matrix[i] + "<br>");
    }
  }
}
