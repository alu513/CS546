const mongoCollections = require("./collections");
const playlists = mongoCollections.playlists;
const { ObjectId } = require("mongodb");

async function createPlaylist(title, genre, weatherTag, songs, spotifyId) {
  if (!title) {
    throw "error: argument title does not exist";
  }
  if (!genre) {
    throw "error: argument genre does not exist";
  }
  if (!weatherTag) {
    throw "error: argument weatherTag does not exist";
  }
  if (!songs) {
    throw "error: argument songs does not exist";
  }
  if (!spotifyId) {
    throw "error: argument spotifyId does not exist";
  }

  if (typeof title !== "string") {
    throw "error: argument title is not type string";
  }
  if (typeof genre !== "string") {
    throw "error: argument genre is not type string";
  }
  if (typeof weatherTag !== "string") {
    throw "error: argument weatherTag is not type string";
  }
  if (Array.isArray(songs) == false) {
    throw "error: argument songs is not type array";
  }
  if (typeof spotifyId !== "string") {
    throw "error: argument spotifyId is not type string";
  }

  const playlistCollection = await playlists();

  let newPlaylist = {
    title: title,
    genre: genre,
    weatherTag: weatherTag,
    songs: songs,
    comments: [],
    spotifyId: spotifyId
  };

  const insertInfo = await playlistCollection.insertOne(newPlaylist);
  if (insertInfo.insertedCount === 0) throw "Could not add playlist";

  const newId = insertInfo.insertedId;

  const playlist = await this.getPlaylistWithId(newId.toString());
  return playlist;
}

async function getPlaylistWithId(id) {
  if (!id) throw "You must provide an id to search for";

  const playlistCollection = await playlists();
  const parsedId = ObjectId(id);

  const playlist = await playlistCollection.findOne({ _id: parsedId });
  if (playlist === null) throw "No playlist with that id";

  return playlist;
}

async function getAllPlaylists() {
  const playlistCollection = await playlists();

  const playlistArray = await playlistCollection.find({}).toArray();

  return playlistArray;
}

async function getPlaylistsWithWeatherTag(tag) {
  if (!tag) throw "You must provide a weather tag to search for";
  if (typeof tag != "string") throw "tag must be type string";

  let playlistArray = await getAllPlaylists();

  let list = [];

  for (var i = 0; i < playlistArray.length; i++) {
    if (playlistArray[i].weatherTag == tag) {
      list.push(playlistArray[i]);
    }
    if (list.length == 5) {
      break;
    }
  }
  return list;
}

module.exports = {
  createPlaylist,
  getPlaylistWithId,
  getAllPlaylists,
  getPlaylistsWithWeatherTag
};
