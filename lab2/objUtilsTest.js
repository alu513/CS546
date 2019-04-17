const test = require("./objUtils");


const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };

const f = {};
const g = {};


console.log(test.extend(f, first, second, g));
//console.log(test.extend(second, third));
//console.log(test.extend(third, first, second));

//console.log(test.smush(first, second, third));
//console.log(test.smush(second, third));
//console.log(test.smush(third, first, second));

//console.log(test.mapValues({ a: 1, b: 2, c: 3 }, n => n + 1));


