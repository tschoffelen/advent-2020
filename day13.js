const input = require('./data/day13').trim().split("\n");
const timestamp = input[0];
const busses = input[1].split(',').filter((id) => id !== 'x').map((id) => Number(id));

// Part 1

let firstBus = null;
let ts = timestamp;
outer:
  while (true) {
    for (const bus of busses) {
      if (ts % bus === 0) {
        firstBus = bus;
        break outer;
      }
    }
    ts++;
  }

console.log(`Part 1: ${(ts - timestamp) * firstBus}`);

// Part 2

const allBusses = input[1].split(',').map((id) => Number(id));
let offset = allBusses[0];
let product = allBusses[0];
for (let i = 1; i < allBusses.length; i++) {
  const id = allBusses[i];
  if (!id) continue;
  while ((offset + i) % id) {
    offset += product;
  }
  product *= id;
}

console.log(`Part 2: ${offset}`);
