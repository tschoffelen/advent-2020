const input = require('./data/day6').trim().split("\n\n");

// Part 1π

const uniqueYesAnswersPerGroup = (groupData) => {
  const answers = {};
  groupData.replace(/\s+/g, '').split('').map((answer) => {
    answers[answer] = answer;
  });

  return Object.values(answers).length;
};

const totalAnswers = input.reduce((acc, data) => acc + uniqueYesAnswersPerGroup(data), 0);
console.log(`Part 1: total answers count is ${totalAnswers}`);

// Part 2

const allYesAnswersPerGroup = (groupData) => {
  const answers = {};
  const personCount = groupData.split("\n").length;
  groupData.replace(/\s+/g, '').split('').map((answer) => {
    answers[answer] = (answers[answer] || 0) + 1;
  });

  return Object.values(answers).filter((count) => count === personCount).length;
};

const allYesAnswers = input.reduce((acc, data) => acc + allYesAnswersPerGroup(data), 0);
console.log(`Part 2: questions answered yes by everyone count is ${allYesAnswers}`);
