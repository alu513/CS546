const animals = require("./data/animals");
const connection = require("./mongoConnection");

async function main() {
  const db = await connection();

  db.collection("animals").drop();

  let sasha = undefined;
  let lucy = undefined;

  try {
    sasha = await animals.create("Sasha", "Dog");
    console.log(sasha);
  } catch (e) {
    console.log("Got an error1!");
    console.log(e);
  }

  try {
    lucy = await animals.create("Lucy", "Dog");
  } catch (e) {
    console.log("Got an error2!");
    console.log(e);
  }

  try {
    const allMyAnimals = await animals.getAll();
    console.log(allMyAnimals);
  } catch (e) {
    console.log("Got an error3!");
    console.log(e);
  }

  try {
    const duke = await animals.create("Duke", "Walrus");
    console.log(duke);
  } catch (e) {
    console.log("Got an error4!");
    console.log(e);
  }

  try {
    const rename = await animals.rename(String(sasha._id), "Sashita");
    console.log(rename);
  } catch (e) {
    console.log("Got an error5!");
    console.log(e);
  }

  try {
    const rem = await animals.remove(String(lucy._id));
    console.log(rem);
  } catch (e) {
    console.log("Got an error6!");
    console.log(e);
  }

  try {
    const allMyAnimals2 = await animals.getAll();
    console.log(allMyAnimals2);
  } catch (e) {
    console.log("Got an error7!");
    console.log(e);
  }

  db.serverConfig.close();
}

main();
