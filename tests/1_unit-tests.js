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
        // Logic handles a puzzle string that is not 81 characters in length
        // Logic handles a valid row placement
        // Logic handles an invalid row placement
        // Logic handles a valid column placement
        // Logic handles an invalid column placement
        // Logic handles a valid region (3x3 grid) placement
        // Logic handles an invalid region (3x3 grid) placement
    });
    suite('Check deferent puzzles', function () { 
        // Valid puzzle strings pass the solver
        // Invalid puzzle strings fail the solver
    });
    suite('Check return puzzles', function () { 
        // Solver returns the expected solution for an incomplete puzzle
    });
});
