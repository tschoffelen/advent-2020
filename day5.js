const input = require('./data/day5').trim().split("\n");

const getSeatId = (seat) => {
  const row = parseInt(seat
    .substr(0, 7)
    .split('')
    .map((dir) => dir === 'F' ? '0' : '1')
    .join(''), 2);
  const col = parseInt(seat
    .substr(7, 3)
    .split('')
    .map((dir) => dir === 'L' ? '0' : '1')
    .join(''), 2);

  return row * 8 + col;
};

// Part 1

const highest = input.reduce((acc, seat) => {
  const id = getSeatId(seat);
  return id > acc ? id : acc;
}, 0);

console.log(`Part 1: highest ticket number is ${highest}`);

// Part 2

const tickets = {};
input.map((seat) => `${getSeatId(seat)}`).forEach((ticket) => tickets[ticket] = ticket);
for (let i = 0; i < highest; i++) {
  if (!tickets[i] && tickets[i - 1] && tickets[i + 1]) {
    console.log(`Part 2: my ticket number is ${i}`);
  }
}
