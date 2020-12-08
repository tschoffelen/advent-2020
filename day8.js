const input = require('./data/day8').trim().split("\n");

const instructions = input.map((instruction) => {
  return [
    instruction.substr(0, 3),
    parseInt(instruction.substr(4))
  ];
});

// Part 1

const history = [];
let pointer = 0;
let accumulator = 0;

while (pointer < instructions.length) {
  if (history.includes(pointer)) {
    console.log(`Part 1: accumulator has value ${accumulator} before entering loop`);
    break;
  }
  history.push(pointer);
  const [operation, argument] = instructions[pointer];
  switch (operation) {
  case 'acc':
    accumulator += argument;
    pointer += 1;
    break;
  case 'jmp':
    pointer += argument;
    break;
  case 'nop':
    pointer += 1;
    break;
  }
}

// Part 2

let fixPointer = 0;
while (fixPointer < instructions.length) {
  const fixedInstructions = [...instructions];
  if (instructions[fixPointer][0] === 'jmp') {
    fixedInstructions[fixPointer] = ['nop', instructions[fixPointer][1]];
  }else if (instructions[fixPointer][0] === 'nop') {
    fixedInstructions[fixPointer] = ['jmp', instructions[fixPointer][1]];
  }

  const history = [];
  let pointer = 0;
  let accumulator = 0;
  let infiniteLoop = false;

  while (pointer < fixedInstructions.length) {
    if (history.includes(pointer)) {
      infiniteLoop = true;
      break;
    }
    history.push(pointer);
    const [operation, argument] = fixedInstructions[pointer];
    switch (operation) {
    case 'acc':
      accumulator += argument;
      pointer += 1;
      break;
    case 'jmp':
      pointer += argument;
      break;
    case 'nop':
      pointer += 1;
      break;
    }
  }

  if (!infiniteLoop) {
    console.log(`Part 2: value of accumulator after non-loop termination is ${accumulator}`);
    break;
  }

  fixPointer++;
}
