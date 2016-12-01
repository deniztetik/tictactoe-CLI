var chalk       = require('chalk')
var clear       = require('clear')
var figlet      = require('figlet')
var inquirer    = require('inquirer')


clear()
console.log(
  chalk.yellow(
    figlet.textSync('TicTacToe!', { horizontalLayout: 'full' })
  )
)

var turn = 'O'
var board = [['.', '.', '.'],['.', '.', '.'],['.', '.', '.']]
playTurn(0)

function playTurn(numMoves) {
  if (numMoves > 8) {
    console.log("It's a draw! :(")
    return
  }
  console.log(redrawBoard())
  if (numMoves > 2 && checkIfWon(turn)) {
    console.log(turn + " wins!!")
  } else {
    turn = (turn === 'X' ? 'O' : 'X')
    getMove(function() {
      playTurn(numMoves + 1)
    })
  }
}

function checkIfWon(turn) {
  // check rows
  for (var i = 0; i < 3; i++) {
    var piecesInRow = 0;
    for (var j = 0; j < 3; j++) {
      // var idName = "#" + i + j
      if (board[i][j] === turn) {
        piecesInRow++
      }
    }
    if (piecesInRow === 3) return true
  }

  // check columns
  for (var i = 0; i < 3; i++) {
    var piecesInColumn = 0
    for (var j = 0; j < 3; j++) {
      // var className = "#" + j + i
      if (board[j][i] === turn) {
        piecesInColumn++
      }
    }
    if (piecesInColumn === 3) return true
  }

  // check first diagonal
  var piecesInDiagonal = 0;
  for (var i = 0; i < 3; i++) {
    // var className = "#" + i + i
    if (board[i][i] === turn) {
      piecesInDiagonal++
    }
  }
  if (piecesInDiagonal === 3) return true


  // check second diagonal
  var piecesInDiagonal = 0;
  for (var i = 0; i < 3; i++) {
    // var className = "#" + i + (2 - i)
    if (board[i][2 - i] === turn) {
      piecesInDiagonal++
    }
  }
  if (piecesInDiagonal === 3) return true

  return false
}

function redrawBoard() {
  return '\n' + board.reduce(function(stringBoard, row) {
    return stringBoard + '| ' + row.join(' | ') + ' |\n'
  }, '') + '\nPositions:\n| 1 | 2 | 3 |\n| 4 | 5 | 6 |\n| 7 | 8 | 9 |\n';
}
// getGithubCredentials(function() {
  // console.log(arguments)
// })
function getMove(callback) {
  var questions = [
    {
      name: 'move',
      type: 'input',
      message: "\nIt's " + turn + "'s turn!",
      validate: function(value) {
        if (validateMove(value)) {
          return true
        } else {
          return 'Please enter a valid move'
        }
      }
    },
  ]
  inquirer.prompt(questions).then(callback)
}

function validateMove(move) {
  if ('123456789'.indexOf(move) === -1) return false
  if (board[Math.floor((move - 1) / 3)] &&
      board[Math.floor((move - 1) / 3)][(move - 1) % 3] !== '.') return false
  board[Math.floor((move - 1) / 3)][(move - 1) % 3] = turn
  return true
}
