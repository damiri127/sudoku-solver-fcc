const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('Solved a puzzle', function () {
        let validPuzzle = {puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'};
        let invalidPuzzle = { puzzle: '1x5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.' };
        let incorrectPuzzle = { puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16.....' };
        // Solve a puzzle with valid puzzle string: POST request to /api/solve
        test('Solve a puzzle with valid puzzle string', function (done) { 
            chai
                .request(server)
                .post('/api/solve')
                .send(validPuzzle)
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'solution');
                })
            done();
        });
        // Solve a puzzle with missing puzzle string: POST request to /api/solve
        test('Solve a puzzle with missing puzzle string', function (done) { 
            chai
                .request(server)
                .post('/api/solve')
                .send({ puzzle: undefined })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Required field missing");
                })
            done();
        });
        // Solve a puzzle with invalid characters: POST request to /api/solve
        test('Solve a puzzle with invalid characters', function (done) {
            chai
                .request(server)
                .post('/api/solve')
                .send(invalidPuzzle)
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Invalid characters in puzzle");
                })
            done();
        });
        // Solve a puzzle with incorrect length: POST request to /api/solve
        test('Solve a puzzle with incorrect length', function (done) { 
            chai
                .request(server)
                .post('/api/solve')
                .send(incorrectPuzzle)
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
                })
            done();
        });
        // Solve a puzzle that cannot be solved: POST request to /api/solve
        test('Solve a puzzle that cannot be solved', function (done) { 
            let cannotSolvedPuzzle = {puzzle: '1.5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.'};
            chai
                .request(server)
                .post('/api/solve')
                .send(cannotSolvedPuzzle)
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Puzzle cannot be solved");
                })
            done();
        });
    });

    suite('Check a puzzle', function () { 
        // Check a puzzle placement with all fields: POST request to /api/check
        test('Check a puzzle placement with all fields', function (done) { 
            let input = { puzzle: '1.5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.', coordinate: 'A2', value: 3 };
            chai
                .request(server)
                .post('/api/check')
                .send(input)
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.valid, true);
                })
            done();
        });
        // Check a puzzle placement with single placement conflict: POST request to /api/check
        test('Check a puzzle placement with single placement conflict', function (done) { 
            let input = { puzzle: '1.5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.', coordinate: 'A2', value: 8 };
            chai
                .request(server)
                .post('/api/check')
                .send(input)
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.valid, false);
                    assert.property(res.body, 'conflict');
                    assert.lengthOf(res.body.conflict, 1);
                })
            done();
        });
        // Check a puzzle placement with multiple placement conflicts: POST request to /api/check
        test('Check a puzzle placement with multiple placement conflicts', function (done) { 
            let input = { puzzle: '1.5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.', coordinate: 'E2', value: 6 };
            chai
                .request(server)
                .post('/api/check')
                .send(input)
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.valid, false);
                    assert.property(res.body, 'conflict');
                    assert.lengthOf(res.body.conflict, 2);
                })
            done();
        });
        // Check a puzzle placement with all placement conflicts: POST request to /api/check
        test('Check a puzzle placement with  all placement conflicts', function (done) { 
            let input = { puzzle: '1.5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.', coordinate: 'A5', value: 5 };
            chai
                .request(server)
                .post('/api/check')
                .send(input)
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.valid, false);
                    assert.property(res.body, 'conflict');
                    assert.lengthOf(res.body.conflict, 3);
                })
            done();
        });
        // Check a puzzle placement with missing required fields: POST request to /api/check
        test('Check a puzzle placement with missing required fields', function (done) {
            let invalidInput = { puzzle: '1.5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.', coordinate: 'A1', value: undefined };
            chai
                .request(server)
                .post('/api/check')
                .send(invalidInput)
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Required field(s) missing");
                })
            done();
        });
        // Check a puzzle placement with invalid characters: POST request to /api/check
        test('Check a puzzle placement with invalid characters', function (done) { 
            let invalidPuzzle = {
                puzzle: '1x5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914x37.',
                coordinate: 'D3',
                value: 4
            };
            chai
                .request(server)
                .post('/api/check')
                .send(invalidPuzzle)
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Invalid characters in puzzle");
                })
            done();
        });
        // Check a puzzle placement with incorrect length: POST request to /api/check
        test('Check a puzzle placement with incorrect length', function (done) { 
            let incorrectPuzzle = {
                puzzle: '1.5..2.8...63.12.7.2..5...1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.',
                coordinate: 'E5',
                value: 2
            }
            chai
                .request(server)
                .post('/api/check')
                .send(incorrectPuzzle)
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
                })
            done();
        });
        // Check a puzzle placement with invalid placement coordinate: POST request to /api/check
        test('Check a puzzle placement with invalid placement coordinate', function (done) { 
            let invalidCoordinate = {
                puzzle: '1.5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.',
                coordinate: 'A10',
                value: 8
            }
            chai
                .request(server)
                .post('/api/check')
                .send(invalidCoordinate)
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Invalid coordinate");
                })
            done();
        });
        // Check a puzzle placement with invalid placement value: POST request to /api/check
        test('Check a puzzle placement with invalid placement value', function (done) { 
            let invalidValue = {
                puzzle: '1.5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.',
                coordinate: 'A1',
                value: 10
            }
            chai
                .request(server)
                .post('/api/check')
                .send(invalidValue)
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Invalid value");
                })
            done();
        });
    });

});

