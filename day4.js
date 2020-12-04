const passports = require('./data/day4').split("\n\n");

const requiredFields = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid'
];

// Part 1

const validPassports = passports.filter((passport) => {
  const pairs = passport.trim().replace(/\s+/g, " ").split(' ');
  const keys = pairs.map((pair) => pair.split(':')[0]);
  const missingFields = requiredFields.filter((field) => !keys.includes(field));
  return !missingFields.length;
});

console.log(`Part 1: ${validPassports.length} valid passports`);

// Part 2

const actuallyValidPassports = passports.filter((passport) => {
  const pairs = passport.trim().replace(/\s+/g, " ").split(' ');
  const values = {};
  pairs.forEach((pair) => {
    const [key, val] = pair.split(':');
    values[key] = val;
  });

  if (requiredFields.filter((field) => !Object.keys(values).includes(field)).length) {
    return false;
  }

  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = values;

  if (!/^\d{4}$/.test(byr) || byr > 2002 || byr < 1920) {
    return false;
  }
  if (!/^\d{4}$/.test(iyr) || iyr > 2020 || iyr < 2010) {
    return false;
  }
  if (!/^\d{4}$/.test(eyr) || eyr > 2030 || eyr < 2020) {
    return false;
  }
  if (!/^(\d{2}in|\d{3}cm)$/.test(hgt)) {
    return false;
  }
  const numericHgt = hgt.replace(/[^\d]+/, '');
  if (hgt.includes('cm') && (numericHgt > 193 || numericHgt < 150)) {
    return false;
  }
  if (hgt.includes('in') && (numericHgt > 76 || numericHgt < 59)) {
    return false;
  }
  if (!/^#[0-9-a-f]{6}$/.test(hcl)) {
    return false;
  }
  if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)) {
    return false;
  }
  return /^\d{9}$/.test(pid);
});

console.log(`Part 2: ${actuallyValidPassports.length} valid passports after additional validation`);
