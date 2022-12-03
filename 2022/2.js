const fs = require('fs');
const path = require('path');

/**
 * A = rock 
 * B = paper
 * C = scissors
 * 
 * X = rock
 * Y = paper
 * Z = scissors
 */

const getScore = (input) => {
  const scoreByShape = ['A', 'B', 'C', 'X', 'Y', 'Z'];
  const wins = { A: 'Y', B: 'Z', C: 'X' };
  const draw = { A: 'X', B: 'Y', C: 'Z' };

  return input
    .split('\n')
    .reduce((p, c) => {
      const [opponent, me] = c.split(' ');

      const scoreByResult = wins[opponent] === me 
        ? 6
        : draw[opponent] === me 
          ? 3
          : 0;

      return p + (scoreByShape.indexOf(me) % 3 + 1) + scoreByResult;
    }, 0);
}

const getScoreByDecision = (input) => {
  const scoreByShape = ['A', 'B', 'C', 'X', 'Y', 'Z'];
  const scoreByDecision = ['X', 'Y', 'Z'];
  const choices = {
    X: { A: 'Z', B: 'X', C: 'Y' },
    Y: { A: 'X', B: 'Y', C: 'Z' },
    Z: { A: 'Y', B: 'Z', C: 'X' },
  };

  return input
    .split('\n')
    .reduce((p, c) => {
      const [opponent, decision] = c.split(' ');

      return p
        + (scoreByShape.indexOf(choices[decision][opponent]) % 3 + 1)
        + (scoreByDecision.indexOf(decision) * 3);
    }, 0);
}

(async () => {
  const input = (await fs.promises.readFile(path.join(__dirname, 'inputs/2.txt'))).toString();

  // Part 1
  const score = getScore(input);
  console.log(`Score: ${score}`);

  // Part 2
  const scoreByDecision = getScoreByDecision(input);
  console.log(`Score by decision: ${scoreByDecision}`);
})();