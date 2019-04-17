const connection = require("./data/connections");

async function main() {
  try {
    const db = await connection();
    db.collection("animals").drop();
    db.collection("posts").drop();
    db.serverConfig.close();
  } catch (e) {
    console.log(e);
  }
}

main();
