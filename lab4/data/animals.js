const mongoCollections = require("../mongoCollections");
const animals = mongoCollections.animals;
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
    animalType: animalType
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

  if (typeof id !== "string") {
    throw "error: argument id is not type string";
  }

  const animalCollection = await animals();
  const parsedId = ObjectId(id);

  const ani = await animalCollection.findOne({ _id: parsedId });
  if (ani === null) throw "No animal with that id";

  return ani;
}

async function remove(id) {
  if (!id) throw "You must provide an id to search for";

  if (typeof id !== "string") {
    throw "error: argument id is not type string";
  }

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

  if (typeof id !== "string") {
    throw "error: argument id is not type string";
  }

  if (!newName) throw "You must provide a name for your animal";

  if (typeof newName !== "string") {
    throw "error: argument newName is not type string";
  }

  const animalCollection = await animals();
  const parsedId = ObjectId(id);

  const newAnimal = await this.get(id);
  const newAnimalType = newAnimal.animalType;

  const updatedAnimal = {
    name: newName,
    animalType: newAnimalType
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

module.exports = {
  create,
  getAll,
  get,
  remove,
  rename
};
