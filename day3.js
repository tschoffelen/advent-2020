const input = require('./data/day3.js').trim().split("\n")

const getValueAt = (x, y) => {
	const row = input[y];
	while(x >= row.length){
		x -= row.length;
	}
	return row[x] === '#' ? 1 : 0;
}

// Part 1
let trees = 0;
let y = 0;
let x = 0;
while (y < input.length - 1) {
	y += 1;
	x += 3;
	trees += getValueAt(x, y);
}

console.log('Part 1 answer', trees);


// Part 2
const deltas = [
	[1,1],
	[3,1],
	[5,1],
	[7,1],
	[1,2]
];

const treeCounts = deltas.map(([dx,dy]) => {
	let trees = 0;
	let y = 0;
	let x = 0;
	while (y < input.length - dy) {
		y += dy;
		x += dx;
		trees += getValueAt(x, y);
	}

	return trees;
})

console.log('Part 2');
console.log(treeCounts);
console.log(treeCounts.reduce((sum, val) => sum ? sum * val : val, 0));
