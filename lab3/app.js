const test = require("./people");
const test2 = require("./weather");
const test3 = require("./work");

async function main() {
  try {
    array = await test.getPersonById(500);
    console.log(array);
  } catch (error) {
    console.error(error);
  }

  try {
    array = await test.lexIndex(2);
    console.log(array);
  } catch (error) {
    console.error(error);
  }

  try {
    array = await test.firstNameMetrics();
    console.log(array);
  } catch (error) {
    console.error(error);
  }

  try {
    array = await test2.shouldTheyGoOutside("bob", "smith");
    console.log(array);
  } catch (error) {
    console.error(error);
  }

  try {
    array = await test3.whereDoTheyWork("Hank", "Tarling");
    console.log(array);
  } catch (error) {
    console.error(error);
  }

  try {
    array = await test3.findTheHacker("79.222.167.180");
    console.log(array);
  } catch (error) {
    console.error(error);
  }
}

main();
