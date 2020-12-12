const input = require('./data/day12').trim().split("\n").map(
  (row) => ([
    row.substr(0, 1),
    parseInt(row.substr(1))
  ])
);

// Part 1

let x = 0;
let y = 0;
let z = 90;

for (const [action, value] of input) {
  switch (action) {
  case 'N':
    y -= value;
    break;
  case 'S':
    y += value;
    break;
  case 'W':
    x -= value;
    break;
  case 'E':
    x += value;
    break;
  case 'L':
    z -= value;
    break;
  case 'R':
    z += value;
    break;
  case 'F':
    switch (z) {
    case 0:
      y -= value;
      break;
    case 90:
      x += value;
      break;
    case 180:
      y += value;
      break;
    case 270:
      x -= value;
      break;
    default:
      console.log(`Unknown angle ${z}`);
    }
    break;
  default:
    console.log(`Unknown action ${action}`);
  }
  while (z >= 360) {
    z -= 360;
  }
  while (z < 0) {
    z += 360;
  }
}

console.log(`Part 1: ${Math.abs(x) + Math.abs(y)}`);

// Part 2

let wx = 10;
let wy = -1;
let sx = 0;
let sy = 0;

for (const [action, value] of input) {
  let px = wx;
  let py = wy;
  switch (action) {
  case 'N':
    wy -= value;
    break;
  case 'S':
    wy += value;
    break;
  case 'W':
    wx -= value;
    break;
  case 'E':
    wx += value;
    break;
  case 'L':
    for (let i = 0; i < value / 90; i++) {
      wx = py;
      wy = -px;
      px = wx;
      py = wy;
    }
    break;
  case 'R':
    for (let i = 0; i < value / 90; i++) {
      wx = -py;
      wy = px;
      px = wx;
      py = wy;
    }
    break;
  case 'F':
    sx += value * wx;
    sy += value * wy;
    break;
  default:
    console.log(`Unknown action ${action}`);
  }
}

console.log(`Part 2: ${Math.abs(sx) + Math.abs(sy)}`);
