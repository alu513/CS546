const mongoCollections = require("./collections");
const animals = mongoCollections.animals;
const posts = mongoCollections.posts;
const { ObjectId } = require("mongodb");

async function create(name, animalType) {
  if (!name) {
    throw "error: argument name does not exist";
  }
  if (!animalType) {
    throw "error: argument animalType does not exist";
  }
  if (typeof name !== "string") {
    throw "error: argument name is not type string";
  }
  if (typeof animalType !== "string") {
    throw "error: argument animalType is not type string";
  }

  const animalCollection = await animals();

  let newAnimal = {
    name: name,
    animalType: animalType,
    likes: []
  };

  const insertInfo = await animalCollection.insertOne(newAnimal);
  if (insertInfo.insertedCount === 0) throw "Could not add animal";

  const newId = insertInfo.insertedId;

  const animal = await this.get(newId.toString());
  return animal;
}

async function getAll() {
  const animalCollection = await animals();

  const animalArray = await animalCollection.find({}).toArray();

  return animalArray;
}

async function get(id) {
  if (!id) throw "You must provide an id to search for";

  const animalCollection = await animals();
  const parsedId = ObjectId(id);

  const ani = await animalCollection.findOne({ _id: parsedId });
  if (ani === null) throw "No animal with that id";

  return ani;
}

async function remove(id) {
  if (!id) throw "You must provide an id to search for";

  const animalCollection = await animals();
  const tempAnimal = await this.get(id);
  const parsedId = ObjectId(id);
  const deletionInfo = await animalCollection.removeOne({ _id: parsedId });

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete animal with id of ${parsedId}`;
  }

  return tempAnimal;
}

async function rename(id, newName) {
  if (!id) throw "You must provide an id to search for";

  if (!newName) throw "You must provide a name for your animal";

  if (typeof newName !== "string") {
    throw "error: argument newName is not type string";
  }

  const animalCollection = await animals();
  const parsedId = ObjectId(id);

  const newAnimal = await this.get(id);
  const newAnimalType = newAnimal.animalType;

  const newLikes = newAnimal.likes;

  const updatedAnimal = {
    name: newName,
    animalType: newAnimalType,
    likes: newLikes
  };

  const updateInfo = await animalCollection.replaceOne(
    { _id: parsedId },
    updatedAnimal
  );

  if (updateInfo.modifiedCount === 0) {
    throw "could not update animal successfully";
  }

  return await this.get(id);
}

async function retype(id, newType) {
  if (!id) throw "You must provide an id to search for";

  if (!newType) throw "You must provide a name for your animal";

  if (typeof newType !== "string") {
    throw "error: argument newName is not type string";
  }

  const animalCollection = await animals();
  const parsedId = ObjectId(id);

  const newAnimal = await this.get(id);
  const newAnimalName = newAnimal.name;

  const newLikes = newAnimal.likes;

  const updatedAnimal = {
    name: newAnimalName,
    animalType: newType,
    likes: newLikes
  };

  const updateInfo = await animalCollection.replaceOne(
    { _id: parsedId },
    updatedAnimal
  );

  if (updateInfo.modifiedCount === 0) {
    throw "could not update animal successfully";
  }

  return await this.get(id);
}

async function likePost(userID, postID) {
  if (!userID) throw "You must provide an userID to search for";
  if (!postID) throw "You must provide an userID to search for";

  const animalCollection = await animals();
  const postCollection = await posts();
  const parsedUserId = ObjectId(userID);
  const parsedPostId = ObjectId(postID);

  let post = await postCollection.findOne({ _id: parsedPostId });

  let like = {};
  like._id = parsedPostId;
  like._title = post.title;

  const updateLikes = await animalCollection.updateOne(
    { _id: parsedUserId },
    { $push: { likes: like } }
  );

  if (updateLikes.modifiedCount === 0) {
    throw "could not like post successfully";
  }

  return await this.get(userID);
}

async function unlikePost(userID, postID) {
  if (!userID) throw "You must provide an userID to search for";
  if (!postID) throw "You must provide an userID to search for";

  const postCollection = await posts();
  const parsedUserId = ObjectId(userID);
  const parsedPostId = ObjectId(postID);

  let post = await postCollection.findOne({ _id: parsedPostId });

  let unlike = {};
  unlike._id = parsedPostId;
  unlike._title = post.title;

  const animalCollection = await animals();

  await animalCollection.updateOne(
    { _id: parsedUserId },
    { $pull: { likes: unlike } }
  );

  return await this.get(userID);
}

module.exports = {
  create,
  getAll,
  get,
  remove,
  rename,
  retype,
  likePost,
  unlikePost
};
