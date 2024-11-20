const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {
    suite('Logic Handles', function () { 
        // Logic handles a valid puzzle string of 81 characters
        test('Logic handles a valid puzzle string of 81 characters', function (done) { 
            let validPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
            assert.equal(solver.validate(validPuzzle), true);
            done();
        });
        // Logic handles a puzzle string with invalid characters (not 1-9 or .)
        test('Logic handles a invalid characters', function (done) { 
            let invalidPuzzle = '1x5xx2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
            assert.deepEqual(solver.validate(invalidPuzzle), {error: "Invalid characters in puzzle"});
            done();
        });
        // Logic handles a puzzle string that is not 81 characters in length
        test('Logic handles a puzzle string that is not 81 characters in length', function (done) { 
            let invalidPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...'
            assert.deepEqual(solver.validate(invalidPuzzle), {error: "Expected puzzle to be 81 characters long"});
            done();
        });
        // Logic handles a valid row placement
        test('Logic handles a valid row placement', function (done) { 
            let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
            let row = 0;
            let column = 1;
            let value = 3;
            assert.equal(solver.checkRowPlacement(puzzle, row, column, value), true);
            done();
        });
        // Logic handles an invalid row placement
        test('Logic handles an invalid row placement', function (done) { 
            let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
            let row = 0;
            let column = 1;
            let value = 5;
            assert.equal(solver.checkRowPlacement(puzzle, row, column, value), false);
            done();
        });
        // Logic handles a valid column placement
        test('Logic handles a valid column placement', function (done) { 
            let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
            let row = 0;
            let column = 1;
            let value = 3;
            assert.equal(solver.checkColPlacement(puzzle, row, column, value), true);
            done();
        });
        // Logic handles an invalid column placement
        test('Logic handles an invalid column placement', function (done) { 
            let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
            let row = 0;
            let column = 1;
            let value = 2;
            assert.equal(solver.checkColPlacement(puzzle, row, column, value), false);
            done();
        });
        // Logic handles a valid region (3x3 grid) placement
        test('Logic handles a valid region (3x3 grid) placement', function (done) { 
            let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
            let row = 0;
            let column = 1;
            let value = 3;
            assert.equal(solver.checkRegionPlacement(puzzle, row, column, value), true);
            done();
        });
        // Logic handles an invalid region (3x3 grid) placement
        test('Logic handles a valid region (3x3 grid) placement', function (done) { 
            let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
            let row = 0;
            let column = 1;
            let value = 6;
            assert.equal(solver.checkRegionPlacement(puzzle, row, column, value), false);
            done();
        });
    });
    suite('Check deferent puzzles', function () { 
        // Valid puzzle strings pass the solver
        test('Valid puzzle string passed the solver', function (done) { 
            let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.equal(solver.solve(puzzle), '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
            done();
        });
        // Invalid puzzle strings fail the solver
        test('Invalid puzzle string passed the solver', function (done) { 
            let invalidPuzzle = '1x5xx2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.equal(solver.solve(invalidPuzzle), false)
            done();
        });
    });
    suite('Check return puzzles', function () { 
        // Solver returns the expected solution for an incomplete puzzle
        test('Solver retruns the expected solution for an incomplete puzzle', function (done) { 
            let incompletePuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.equal(solver.solve(incompletePuzzle), "135762984946381257728459613694517832812936745357824196473298561581673429269145378");
            done();
        });
    });
});
