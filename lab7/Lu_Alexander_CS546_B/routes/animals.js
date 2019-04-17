const express = require("express");
const router = express.Router();
const animalsData = require("../data/animals");
const postsData = require("../data/posts");

router.get("/", async (req, res) => {
  try {
    const animals = await animalsData.getAll();

    let postsByUser = [];
    for (var i = 0; i < animals.length; i++) {
      try {
        postsByUser = await postsData.getPostbyAuthor(animals[i]._id);
      } catch (e) {
        console.log(e);
      }

      for (var j = 0; j < postsByUser.length; j++) {
        delete postsByUser[j].author;
        delete postsByUser[j].content;
      }

      animals[i].posts = postsByUser;
    }
    res.json(animals);
  } catch (e) {
    console.log(e);
    res.sendStatus(500).send("animal get failed");
  }
});

router.post("/", async (req, res) => {
  const json = req.body;
  var size = Object.keys(json).length;

  let newAnimal;
  if (
    typeof json == "object" &&
    json.hasOwnProperty("name") &&
    json.hasOwnProperty("animalType") &&
    size == 2
  ) {
    try {
      newAnimal = await animalsData.create(json.name, json.animalType);
    } catch (e) {
      console.log(e);
    }
    newAnimal.posts = [];
    return res.status(200).json(newAnimal);
  } else {
    return res.status(400).send("animal post failed");
  }
});

router.get("/:id", async (req, res) => {
  let animal = await animalsData.get(String(req.params.id));

  if (!animal) {
    return res.status(404).send("animal get id failed");
  } else {
    try {
      postsByUser = await postsData.getPostbyAuthor(animal._id);
    } catch (e) {
      console.log(e);
    }

    for (var j = 0; j < postsByUser.length; j++) {
      delete postsByUser[j].author;
      delete postsByUser[j].content;
    }

    animal.posts = postsByUser;
    return res.status(200).json(animal);
  }
});

router.put("/:id", async (req, res) => {
  const json = req.body;

  let animal = await animalsData.get(String(req.params.id));

  if (!animal) {
    return res.status(404).send("animal get id failed");
  }
  var size = Object.keys(json).length;

  let newAnimal;
  if (
    typeof json == "object" &&
    json.hasOwnProperty("newName") &&
    json.hasOwnProperty("newType") &&
    size == 2
  ) {
    try {
      newAnimal = await animalsData.rename(animal._id, json.newName);
    } catch (e) {
      console.log(e);
    }
    try {
      newAnimal = await animalsData.retype(animal._id, json.newType);
    } catch (e) {
      console.log(e);
    }
    return res.status(200).json(newAnimal);
  } else if (
    typeof json == "object" &&
    json.hasOwnProperty("newName") &&
    size == 1
  ) {
    try {
      newAnimal = await animalsData.rename(animal._id, json.newName);
    } catch (e) {
      console.log(e);
    }
    return res.status(200).json(newAnimal);
  } else if (
    typeof json == "object" &&
    json.hasOwnProperty("newType") &&
    size == 1
  ) {
    try {
      newAnimal = await animalsData.retype(animal._id, json.newType);
    } catch (e) {
      console.log(e);
    }
    return res.status(200).json(newAnimal);
  } else {
    return res.status(400).send("animal put failed");
  }
});

router.delete("/:id", async (req, res) => {
  let animal = await animalsData.get(String(req.params.id));

  //let post = await postsData.getPostById(String(req.params.id));

  if (!animal) {
    return res.status(404).send("animal delete id failed");
  } else {
    let deletedObject = {};
    try {
      postsByUser = await postsData.getPostbyAuthor(animal._id);
    } catch (e) {
      console.log(e);
    }
    for (var j = 0; j < postsByUser.length; j++) {
      delete postsByUser[j].author;
      delete postsByUser[j].content;
    }
    for (var z = 0; z < postsByUser.length; z++) {
      await postsData.removePost(postsByUser[z]._id);
    }
    try {
      let removedAnimal = await animalsData.remove(animal._id);
      removedAnimal.posts = postsByUser;
      deletedObject.deleted = true;
      deletedObject.data = removedAnimal;
      return res.status(200).json(deletedObject);
    } catch (e) {
      console.log(e);
    }
  }
});

module.exports = router;
