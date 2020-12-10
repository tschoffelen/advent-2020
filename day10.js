const input = require('./data/day10').trim().split("\n").map((num) => parseInt(num)).sort((a, b) => a - b);

// Part 1

const diffs = {
  0: 0,
  1: 0,
  2: 0,
  3: 1 // device's built-in adapter
};

let currentJolts = 0;
input.forEach((jolt) => {
  const diff = jolt - currentJolts;
  if (diff > 3) {
    console.log('Failed: diff too big', { jolt, currentJolts });
    process.exit();
  }
  diffs[diff]++;
  currentJolts = jolt;
});

console.log(`Part 1: ${diffs[1] * diffs[3]}`);

// Part 2

input.unshift(0);
input.push(input[input.length - 1] + 3);

const cache = {};
const countOptions = (index) => {
  if (index >= input.length - 1) {
    return 1;
  }
  if (index in cache) {
    return cache[index];
  }
  const value = input[index];
  let poss = countOptions(index + 1);
  if (index < input.length - 1 && input[index + 2] <= value + 3) {
    poss += countOptions(index + 2);
  }
  if (index < input.length - 3 && input[index + 3] <= value + 3) {
    poss += countOptions(index + 3);
  }
  cache[index] = poss;
  return poss;
};

console.log(`Part 2: ${countOptions(0)}`);
