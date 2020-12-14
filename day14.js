let input = require('./data/day14').trim().split("\n");

const decToBin = (dec) => {
  const bin = (dec >>> 0).toString(2);
  return `${'0'.repeat(36 - bin.length)}${bin}`;
};

const binToDec = (bin) => parseInt(bin, 2);

const applyBitMask = (input, bitmask) => {
  const bin = decToBin(input).split('');
  const output = bitmask.split('').map((mask, index) => mask === 'X' ? bin[index] : mask).join('');
  return binToDec(output);
};

const resolveRecursive = (str) => {
  if (!str.includes('X')) {
    return [str];
  }

  return [
    ...resolveRecursive(str.replace(/X/, '0')),
    ...resolveRecursive(str.replace(/X/, '1'))
  ];
};

const applyBitMaskVersion2 = (input, bitmask) => {
  const bin = decToBin(input).split('');
  const output = bitmask.split('').map((mask, index) => mask === '0' ? bin[index] : mask).join('');

  return resolveRecursive(output).map((address) => binToDec(address));
};

// Part 1

let mask = null;
let memory = {};
for (const line of input) {
  if (line.indexOf('mask = ') === 0) {
    mask = line.substr(7);
    continue;
  }
  let [loc, val] = line.split(' = ');
  loc = loc.replace('mem[', '').replace(']', '');
  val = Number(val);
  memory[loc] = applyBitMask(val, mask);
}

console.log(`Part 1: ${Object.values(memory).reduce((acc, val) => acc + val, 0)}`);

// Part 2

memory = {};
for (const line of input) {
  if (line.indexOf('mask = ') === 0) {
    mask = line.substr(7);
    continue;
  }
  let [loc, val] = line.split(' = ');
  loc = loc.replace('mem[', '').replace(']', '');
  val = Number(val);
  for (const address of applyBitMaskVersion2(loc, mask)) {
    memory[address] = val;
  }
}

console.log(`Part 2: ${Object.values(memory).reduce((acc, val) => acc + val, 0)}`);
