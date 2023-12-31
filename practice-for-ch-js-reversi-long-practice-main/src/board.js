// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  const Piece = require("./piece");
}
// DON'T TOUCH THIS CODE


/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4].
 */
function _makeGrid() {

  let grid = new Array(8);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(8);
  }

  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
  this.grid[3][3] = new Piece("white");
  this.grid[4][4] = new Piece("white");
  this.grid[3][4] = new Piece("black");
  this.grid[4][3] = new Piece("black");
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let x = pos[0];
  let y = pos[1];

  if (x < 0 || y < 0) {
    return false
  }

  if (x > 7 || y > 7) {
    return false
  }

  return true;
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  let x = pos[0];
  let y = pos[1];
  if (!this.isValidPos(pos)){
    throw new Error('Not valid pos!');
  }
  return this.grid[x][y];
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  let x = pos[0];
  let y = pos[1];

  if (!this.getPiece(pos)) {
    return false
  }

  if (this.getPiece(pos).color === color) {
    return true
  } else {
    return false
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  let x = pos[0];
  let y = pos[1];

  if (this.grid[x][y] instanceof Piece) {
    return true;
  }

  return false;
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding 
 * another piece of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function (pos, color, dir, piecesToFlip) {

    if (!this.isValidPos(pos)) {
      return [];
    }

      let nextPos = [pos[0] + dir[0], pos[1] + dir[1]]
      let positions = piecesToFlip || []
      if (!this.isOccupied(nextPos)) {
        return [];
      }

      if (this.isMine(nextPos, color)) {
        return positions;
      }
    
      if (this.isValidPos(nextPos) && this.isOccupied(nextPos) && !this.isMine(nextPos, color)) {
        positions.push(nextPos);
      }
      if (this.isValidPos(nextPos) && this.isOccupied(nextPos) && this.isMine(nextPos, color)) {
        return positions;
      }
      return this._positionsToFlip(nextPos, color, dir, positions);
}


/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)) {
    return false
  }
  let that = this;
  let alex = false;
  Board.DIRS.forEach(function(direction) {
    let posFlip = that._positionsToFlip(pos, color, direction, [])
  if (posFlip.length > 0) {
      alex = true;
  }
  });
  return alex;
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  let x = pos[0];
  let y = pos[1];
  
    if (this.validMove(pos, color)) {
      this.grid[x][y] = new Piece(color)
      Board.DIRS.forEach((direction) => {
        this._positionsToFlip(pos, color, direction, []).forEach((posit) => {
            this.getPiece(posit).flip()
        })
      })
      
    } else {
      throw new Error('Invalid move!')
    }
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};

// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE