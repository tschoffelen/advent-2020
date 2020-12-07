const input = require('./data/day7').trim().split("\n");

const rules = Object.fromEntries(input.map((rule) => {
  const outer = rule.substring(0, rule.indexOf(' bags'));
  const inner = rule.substring(rule.indexOf('contain ') + 8).trim().split(', ').map((bag) => {
    bag = bag.replace(/ bags?\.?$/, '');
    return [parseInt(bag.substring(0, 1)), bag.substring(2)];
  }).filter(([count]) => !!count);
  return [outer, inner];
}));

// Part 1

const getBagsThatCanContain = (bagType) => {
  const types = new Set(); // using Set because we want unique values
  for (const [outer, inner] of Object.entries(rules)) {
    if (inner.find((bag) => bag[1] === bagType)) {
      types.add(outer);
      for (const type of getBagsThatCanContain(outer)) {
        types.add(type);
      }
    }
  }
  return types;
};

const types = getBagsThatCanContain('shiny gold');
console.log(`Part 1: ${types.size} bags can contain a shiny gold one`);

// Part 2

const getBagsCountInside = (bagType) => {
  let total = 0;
  const bags = rules[bagType];
  for (const [number, type] of bags) {
    total += number;
    total += getBagsCountInside(type) * number;
  }

  return total;
};

const count = getBagsCountInside('shiny gold');
console.log(`Part 2: a shiny gold bag needs to contain ${count} other bags`);
