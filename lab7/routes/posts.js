const express = require("express");
const router = express.Router();
const animalsData = require("../data/animals");
const postsData = require("../data/posts");

router.get("/", async (req, res) => {
  try {
    const allPosts = await postsData.getAllPosts();

    let tempAuthor = allPosts.map(a => a.author);
    //console.log(tempAuthor);
    for (var i = 0; i < allPosts.length; i++) {
      delete allPosts[i].author;
    }

    for (var j = 0; j < allPosts.length; j++) {
      let newAuthorObj = {};
      newAuthorObj._id = tempAuthor[j];
      let test = await animalsData.get(newAuthorObj._id);
      newAuthorObj.name = test.name;
      allPosts[j].author = newAuthorObj;
    }
    console.log(allPosts[0]);
    res.json(allPosts);
  } catch (e) {
    console.log(e);
    res.sendStatus(500).send("posts get failed");
  }
});

router.post("/", async (req, res) => {
  const json = req.body;
  var size = Object.keys(json).length;

  let newPost;
  if (
    typeof json == "object" &&
    json.hasOwnProperty("title") &&
    json.hasOwnProperty("author") &&
    json.hasOwnProperty("content") &&
    size == 3
  ) {
    try {
      newPost = await postsData.addPost(json.title, json.author, json.content);
    } catch (e) {
      console.log(e);
    }
    let tempAuthor = newPost.author;
    //console.log(tempAuthor);
    delete newPost.author;
    let newAuthorObj = {};
    newAuthorObj._id = tempAuthor;

    try {
      let test = await animalsData.get(tempAuthor);
      newAuthorObj.name = test.name;
    } catch (e) {
      console.log(e);
    }
    newPost.author = newAuthorObj;
    return res.status(200).json(newPost);
  } else {
    return res.status(400).send("posts post failed");
  }
});

router.get("/:id", async (req, res) => {
  let post = await postsData.getPostById(String(req.params.id));

  if (!post) {
    return res.status(404).send("post get id failed");
  } else {
    let tempAuthor = post.author;
    delete post.author;
    let newAuthorObj = {};
    newAuthorObj._id = tempAuthor;
    try {
      let test = await animalsData.get(tempAuthor);
      newAuthorObj.name = test.name;
      post.author = newAuthorObj;
    } catch (e) {
      console.log(e);
    }

    return res.status(200).json(post);
  }
});

router.put("/:id", async (req, res) => {
  const json = req.body;

  let post = await postsData.getPostById(String(req.params.id));

  if (!post) {
    return res.status(404).send("post get id failed");
  }
  var size = Object.keys(json).length;

  if (
    (typeof json == "object" &&
      json.hasOwnProperty("newTitle") &&
      json.hasOwnProperty("newContent") &&
      size == 2) ||
    (typeof json == "object" && json.hasOwnProperty("newTitle") && size == 1) ||
    (typeof json == "object" && json.hasOwnProperty("newContent") && size == 1)
  ) {
    try {
      let newPost = await postsData.updatePost(post._id, json);
      return res.status(200).json(newPost);
    } catch (e) {
      console.log(e);
    }
  } else {
    return res.status(400).send("post put failed");
  }
});

router.delete("/:id", async (req, res) => {
  let post = await postsData.getPostById(String(req.params.id));

  if (!post) {
    return res.status(404).send("post delete id failed");
  } else {
    let deletedObject = {};

    try {
      let deletedPost = await postsData.removePost(post._id);
      let tempAuthor = deletedPost.author;
      delete deletedPost.author;
      let newAuthorObj = {};
      newAuthorObj._id = tempAuthor;

      try {
        let test = await animalsData.get(tempAuthor);
        newAuthorObj.name = test.name;
      } catch (e) {
        console.log(e);
      }
      deletedPost.author = newAuthorObj;

      deletedObject.deleted = true;
      deletedObject.data = deletedPost;
      return res.status(200).json(deletedObject);
    } catch (e) {
      console.log(e);
    }
  }
});

module.exports = router;
