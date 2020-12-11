const input = require('./data/day11').trim().split("\n").map((row) => row.split(''));

let map = [...input];

const isSeat = (x, y) => map[y][x] === 'L' || map[y][x] === '#';

const isOccupied = (x, y) => {
  if (!map[y]) {
    return 0;
  }
  if (x < 0 || x >= map[y].length) {
    return 0;
  }
  return map[y][x] === '#' ? 1 : 0;
};

const occupiedSeatsAdjacent = (x, y) => {
  let adjacentOccupied = 0;

  adjacentOccupied += isOccupied(x + 1, y);
  adjacentOccupied += isOccupied(x - 1, y);
  adjacentOccupied += isOccupied(x, y - 1);
  adjacentOccupied += isOccupied(x, y + 1);
  adjacentOccupied += isOccupied(x + 1, y + 1);
  adjacentOccupied += isOccupied(x - 1, y + 1);
  adjacentOccupied += isOccupied(x - 1, y - 1);
  adjacentOccupied += isOccupied(x + 1, y - 1);
  return adjacentOccupied;
};

const isOccupiedInDirection = (x, y, dx, dy) => {
  x += dx;
  y += dy;
  while (x >= 0 && y >= 0 && map[y] && map[y][x]) {
    if (isSeat(x, y)) {
      return isOccupied(x, y);
    }
    x += dx;
    y += dy;
  }

  return 0;
};

const occupiedSeatsNearby = (x, y) => {
  let nearbyOccupied = 0;

  nearbyOccupied += isOccupiedInDirection(x, y, 1, -1);
  nearbyOccupied += isOccupiedInDirection(x, y, 1, 0);
  nearbyOccupied += isOccupiedInDirection(x, y, 1, 1);
  nearbyOccupied += isOccupiedInDirection(x, y, -1, -1);
  nearbyOccupied += isOccupiedInDirection(x, y, -1, 0);
  nearbyOccupied += isOccupiedInDirection(x, y, -1, 1);
  nearbyOccupied += isOccupiedInDirection(x, y, 0, 1);
  nearbyOccupied += isOccupiedInDirection(x, y, 0, -1);

  return nearbyOccupied;
};

// Part 1

let changes = 1;
while (changes > 0) {
  changes = 0;
  const newMap = JSON.parse(JSON.stringify(map));
  for (let y in map) {
    y = parseInt(y);
    for (let x in map[y]) {
      x = parseInt(x);
      if (!isSeat(x, y)) {
        continue;
      }
      const occupied = isOccupied(x, y);
      const adjacentOccupied = occupiedSeatsAdjacent(x, y);
      if (!occupied && !adjacentOccupied) {
        newMap[y][x] = '#';
        changes++;
      } else if (occupied && adjacentOccupied >= 4) {
        newMap[y][x] = 'L';
        changes++;
      }
    }
  }

  map = newMap;
}

const occupiedSeats = map.reduce((acc, row) => acc + row.filter((seat) => seat === '#').length, 0);
console.log(`Part 1: ${occupiedSeats}`);

// Part 2

map = [...input];
let numChanges = 1;
while (numChanges > 0) {
  numChanges = 0;
  const newMap = JSON.parse(JSON.stringify(map));
  for (let y in map) {
    y = parseInt(y);
    for (let x in map[y]) {
      x = parseInt(x);
      if (!isSeat(x, y)) {
        continue;
      }
      const occupied = isOccupied(x, y);
      const nearbyOccupied = occupiedSeatsNearby(x, y);
      //console.log({ x, y, occupied, nearbyOccupied });
      if (!occupied && !nearbyOccupied) {
        newMap[y][x] = '#';
        numChanges++;
      } else if (occupied && nearbyOccupied >= 5) {
        newMap[y][x] = 'L';
        numChanges++;
      }
    }
  }

  map = newMap;
}

const occupiedSeatsPart2 = map.reduce((acc, row) => acc + row.filter((seat) => seat === '#').length, 0);
console.log(`Part 2: ${occupiedSeatsPart2}`);
