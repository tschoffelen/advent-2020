const input = require('./data/day9').trim().split("\n").map((num) => parseInt(num));

// Part 1

const preLen = 25;
let index = preLen;
let num;
while (index < input.length) {
  num = input[index];
  const preamble = input.slice(index - preLen, index + preLen);
  let found = false;
  for (const num1 of preamble) {
    for (const num2 of preamble) {
      if (num1 + num2 === num) {
        found = true;
      }
    }
  }
  if (!found) {
    console.log(`Part 1: ${num}`);
    break;
  }
  index++;
}

// Part 2

const rangeSum = (index, length) => input
  .slice(index, index + length)
  .reduce((acc, val) => acc + val, 0);

for (let a = 0; a < input.length; a++) {
  for (let b = 0; b < input.length; b++) {
    if (rangeSum(a, b) === num) {
      const smallest = input.slice(a, a + b).reduce((acc, val) => val < acc ? val : acc, Infinity);
      const largest = input.slice(a, a + b).reduce((acc, val) => val > acc ? val : acc, 0);
      console.log(`Part 2: ${smallest + largest}`);
      process.exit();
    }
  }
}
