const mongoCollections = require("./collections");
const posts = mongoCollections.posts;
const { ObjectId } = require("mongodb");
const animals = require("./animals");

async function getPostById(postID) {
  if (!postID) throw "You must provide an id to search for";
  try {
    const postCollection = await posts();
    const parsedId = ObjectId(postID);
    const post = await postCollection.findOne({ _id: parsedId });
    if (!post) throw "Post not found, cannot get id";
    return post;
  } catch (e) {
    console.log(e);
  }
}

async function getAllPosts() {
  const postCollection = await posts();
  return await postCollection.find({}).toArray();
}

async function getPostbyAuthor(author) {
  if (!author) throw "You must provide an id to search for";

  const postArray = await getAllPosts();
  //  const parsedId = ObjectId(author);

  let results = [];

  for (var i = 0; i < postArray.length; i++) {
    if (postArray[i].author == author) {
      results.push(postArray[i]);
    }
  }

  return results;
}

async function getTitleByID(postID) {
  if (!postID) throw "You must provide an id to search for";

  const postCollection = await posts();
  const parsedId = ObjectId(postID);
  const post = await postCollection.findOne({ _id: parsedId });

  if (!post) throw "Post not found, cannot get title";
  return post.title;
}

async function addPost(title, author, content) {
  if (typeof title !== "string") throw "No title provided";
  if (typeof author !== "string") throw "No author provided";
  if (typeof content !== "string") throw "No content provided";

  const postCollection = await posts();

  const newPost = {
    title: title,
    author: author,
    content: content
  };

  const newInsertInformation = await postCollection.insertOne(newPost);
  const newId = newInsertInformation.insertedId;
  return await this.getPostById(newId);
}

async function updatePost(postID, updatedPost) {
  if (!postID) throw "You must provide an id to search for";

  const postCollection = await posts();
  const parsedId = ObjectId(postID);

  const updatedPostData = {};
  //console.log(updatedPost)

  if (updatedPost.newTitle) {
    updatedPostData.title = updatedPost.newTitle;
  }

  if (updatedPost.newContent) {
    updatedPostData.content = updatedPost.newContent;
  }

  let updateCommand = {
    $set: updatedPostData
  };
  const query = {
    _id: parsedId
  };
  await postCollection.updateOne(query, updateCommand);

  return await this.getPostById(parsedId);
}

async function removePost(postID) {
  if (!postID) throw "You must provide an id to search for";

  const postCollection = await posts();
  const tempPost = await this.getPostById(postID);
  const parsedId = ObjectId(postID);

  const deletionInfo = await postCollection.removeOne({ _id: parsedId });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete post with id of ${parsedId}`;
  }
  return tempPost;
}

module.exports = {
  getPostById,
  getAllPosts,
  getPostbyAuthor,
  getTitleByID,
  addPost,
  updatePost,
  removePost
};
