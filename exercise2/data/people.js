const axios = require("axios");

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json"
  );
  return data; // this will be the array of people
}

async function getPersonById(id) {
  if (!id) {
    throw "error: argument id does not exist";
  }
  if (!Number.isInteger(id)) {
    throw "error: type of id is not integer";
  }
  if (id < 1 || id > 500) {
    throw "error: id is out of bounds";
  }

  array = await getPeople();
  //https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects for .find
  let result =
    array.find(x => x.id === id).firstName +
    " " +
    array.find(x => x.id === id).lastName;
  return result;
}

async function lexIndex(index) {
  if (!index) {
    throw "error: argument index does not exist";
  }
  if (!Number.isInteger(index)) {
    throw "error: type of index is not integer";
  }
  if (index < 0 || index > 499) {
    throw "error: index is out of bounds";
  }

  array = await getPeople();

  //https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  function compare(a, b) {
    if (a.lastName < b.lastName) return -1;
    if (a.lastName > b.lastName) return 1;
    return 0;
  }
  let sorted = array.sort(compare);

  for (var i = 0; i <= index; i++) {
    if (i == index) return sorted[i].firstName + " " + sorted[i].lastName;
  }
}

async function firstNameMetrics() {
  array = await getPeople();
  let obj = {};
  let totalLetters = 0;
  let totalVowels = 0;
  let totalConsonants = 0;
  let longestName = "";
  let shortestName = array[0].firstName;

  function vowelCounter(name) {
    let lower = name.toLowerCase();
    return (
      (lower.match(/a/g) || []).length +
      (lower.match(/o/g) || []).length +
      (lower.match(/i/g) || []).length +
      (lower.match(/e/g) || []).length +
      (lower.match(/u/g) || []).length
    );
  }

  function consCounter(name) {
    let lower = name.toLowerCase();
    let counter = 0;
    for (var i = 0; i < lower.length; i++) {
      if (
        lower[i] !== "a" &&
        lower[i] !== "e" &&
        lower[i] !== "i" &&
        lower[i] !== "o" &&
        lower[i] !== "u"
      ) {
        counter += 1;
      }
    }
    return counter;
  }

  for (var i = 0; i < array.length; i++) {
    totalLetters += array[i].firstName.length;
    totalVowels += vowelCounter(array[i].firstName);
    totalConsonants += consCounter(array[i].firstName);

    if (longestName.length < array[i].firstName.length) {
      longestName = array[i].firstName;
    }

    if (shortestName.length > array[i].firstName.length) {
      shortestName = array[i].firstName;
    }
  }

  obj["totalLetters"] = totalLetters;
  obj["totalVowels"] = totalVowels;
  obj["totalConsonants"] = totalConsonants;
  obj["longestName"] = longestName;
  obj["shortestName"] = shortestName;

  return obj;
}

module.exports = {
  getPeople,
  getPersonById,
  lexIndex,
  firstNameMetrics
};
