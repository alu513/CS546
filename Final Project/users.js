const mongoCollections = require("./collections");
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");

function isValidUSZip(sZip) {
  return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(sZip);
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

async function createUser(username, firstName, lastName, email, password, zip) {
  if (!username) {
    throw "error: argument username does not exist";
  }
  if (!firstName) {
    throw "error: argument firstName does not exist";
  }
  if (!lastName) {
    throw "error: argument lastName does not exist";
  }
  if (!email) {
    throw "error: argument email does not exist";
  }
  if (!password) {
    throw "error: argument password does not exist";
  }
  if (!zip) {
    throw "error: argument zip does not exist";
  }

  if (typeof username !== "string") {
    throw "error: argument username is not type string";
  }
  if (typeof firstName !== "string") {
    throw "error: argument firstName is not type string";
  }
  if (typeof lastName !== "string") {
    throw "error: argument lastName is not type string";
  }
  if (typeof lastName !== "string") {
    throw "error: argument lastName is not type string";
  }
  if (typeof password !== "string") {
    throw "error: argument password is not type string";
  }
  if (!validateEmail(email)) {
    throw "error: argument email is not a valid email address";
  }
  if (!isValidUSZip(zip)) {
    throw "error: argument zip is not a valid US zip code";
  }

  const userCollection = await users();

  let newUser = {
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    zip: zip,
    likedPlaylists: [],
    unlikedPlaylists: [],
    likedSongs: [],
    unlikedSongs: []
  };

  const insertInfo = await userCollection.insertOne(newUser);
  if (insertInfo.insertedCount === 0) throw "Could not add user";

  const newId = insertInfo.insertedId;

  const user = await this.get(newId.toString());
  return user;
}

async function getAll() {
  const userCollection = await users();

  const userArray = await userCollection.find({}).toArray();

  return userArray;
}

async function get(id) {
  if (!id) throw "You must provide an id to search for";

  const userCollection = await users();
  const parsedId = ObjectId(id);

  const user = await userCollection.findOne({ _id: parsedId });
  if (user === null) throw "No user with that id";

  return user;
}

module.exports = {
  createUser,
  getAll,
  get,
  remove,
  rename,
  retype,
  likePost,
  unlikePost
};
