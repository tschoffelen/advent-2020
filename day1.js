const numbers = require('./data/day1.json');

for (const x of numbers) {
	for (const y of numbers) {
		if (x+y === 2020) {
			console.log('2 numbers sum:', {x,y, sum: x*y})
		}
		for (const z of numbers) {
			if (x+y+z === 2020) {
				console.log('3 numbers sum:', {x,y, z, sum: x*y*z})
			}
		}
	}
}
