const axios = require("axios");
var request = require("request"); // "Request" library

var client_id = "aba7897fb89b4bf299913de0fda991e0"; // Your client id
var client_secret = "9d58ecc5a16f4f8299cc6e0bbea197bf"; // Your secret

// your application requests authorization
var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " + new Buffer(client_id + ":" + client_secret).toString("base64")
  },
  form: {
    grant_type: "client_credentials"
  },
  json: true
};

async function getData() {
  const { data } = await axios({
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    params: {
      grant_type: "client_credentials"
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    auth: {
      username: "aba7897fb89b4bf299913de0fda991e0",
      password: "9d58ecc5a16f4f8299cc6e0bbea197bf"
    }
  });

  let token = data.access_token;
  console.log(token);

  const { playlists } = await axios({
    url: "https://api.spotify.com/v1/users/123643422/playlists/",
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  console.log(playlists);
  /*
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {});
    */
}

getData();

/*
request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    // use the access token to access the Spotify Web API
    var token = body.access_token;
    //console.log(body);
    var options = {
      url: "https://api.spotify.com/v1/users/123643422/playlists/",
      headers: {
        Authorization: "Bearer " + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});
*/
