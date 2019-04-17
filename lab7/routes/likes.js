const express = require("express");
const router = express.Router();
const animalsData = require("../data/animals");
const postsData = require("../data/posts");
const { ObjectId } = require("mongodb");

router.post("/:animalId", async (req, res) => {
  let animal = await animalsData.get(String(req.params.animalId));
  let post = await postsData.getPostById(String(req.query.postId));

  if (!animal) {
    return res.status(404).send("like post animalId failed");
  }
  if (!post) {
    return res.status(404).send("like post postId failed");
  }

  for (var i = 0; i < animal.likes.length; i++) {
    //console.log(post._id);
    //console.log(animal.likes[i]._id);
    //console.log(ObjectId(post._id) == ObjectId(animal.likes[i]._id));
    if (String(post._id) == String(animal.likes[i]._id)) {
      res.status(200);
      return;
    }
  }

  let newLikeUser = await animalsData.likePost(animal._id, post._id);
  //console.log(newLikeUser);
  newLikeUser.likes.title = await postsData.getTitleByID(post._id);
  //console.log(newLikeUser);
  return res.status(200);
});

router.delete("/:animalId", async (req, res) => {
  let animal = await animalsData.get(String(req.params.animalId));
  let post = await postsData.getPostById(String(req.query.postId));

  if (!animal) {
    return res.status(404).send("like post animalId failed");
  }
  if (!post) {
    return res.status(404).send("like post postId failed");
  }

  let isidInside;
  for (var i = 0; i < animal.likes.length; i++) {
    if (String(post._id) == String(animal.likes[i]._id)) {
      isidInside = true;
      break;
    }
  }

  if (isidInside) {
    await animalsData.unlikePost(animal._id, post._id);
    return res.status(200);
  }
  return res.status(200);
});

module.exports = router;
