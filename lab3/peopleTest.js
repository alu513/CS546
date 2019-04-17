const test = require("./people");
const test2 = require("./weather");
const test3 = require("./work");


async function main() {
    try {
      array = await test.getPersonById(43);
      console.log(array);
    } catch (error) {
      console.error(error);
    }
  }

  //main()

  async function main2() {
    try {
      array = await test.lexIndex(2);
      console.log(array);
    } catch (error) {
      console.error(error);
    }
  }

  //main2()

  async function main3() {
    try {
      array = await test.firstNameMetrics();
      console.log(array);
    } catch (error) {
      console.error(error);
    }
  }

  //main3()

  async function main4() {
    try {
      array = await test2.shouldTheyGoOutside("Calli", "Ondrasek");
      console.log(array);
    } catch (error) {
      console.error(error);
    }
  }

  //main4()

  async function main5() {
    try {
      array = await test3.whereDoTheyWork("Hank", "Tarling");
      console.log(array);
    } catch (error) {
      console.error(error);
    }
  }

  //main5()

  async function main6() {
    try {
      array = await test3.findTheHacker("foo");
      console.log(array);
    } catch (error) {
      console.error(error);
    }
  }

  main6()






