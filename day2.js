const input = require('./data/day2.js');

let matches = 0;
input.trim().split("\n").forEach((line) => {
	const [policy, password] = line.trim().split(': ');
	const [len, letter] = policy.split(' ');
	const [min, max] = len.split('-');

	// First part
	//	const count = password.split(letter).length - 1;
	//	if(count >= min && count <= max){
	//		matches++;
	//	}

	// Second part
	const score =
		(password.substring(min-1, min) === letter ? 1 : 0) +
		(password.substring(max-1, max) === letter ? 1 : 0)

	if(score === 1) {
		matches++;
	}
});

console.log({matches})
