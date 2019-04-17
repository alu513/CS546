const words ={
    programming: "The action or process of writing computer programs.",
    charisma: "A personal magic of leadership arousing special popular loyalty or enthusiasm for a public figure (such as a political leader)",
    sleuth: "To act as a detective : search for information",
    foray: "A sudden or irregular invasion or attack for war or spoils : raid",
    adjudicate: "to make an official decision about who is right in (a dispute) : to settle judicially"
}

function checkInput(inp){
    if(typeof inp != "string"){
        throw "input value is not a string"
    }
    else{
        return inp
    }
}

function lookupDefinition(inputVal){
    checkInput(inputVal);
    if (words[inputVal] != undefined){
        return words[inputVal]
    }
    else{
        throw "definition does not exist in the object words"
    }
}
function getWord(def){
    checkInput(def);
    //https://stackoverflow.com/questions/13274050/get-key-using-value-from-an-object-in-javascript
    let word = Object.keys(words).find(key => words[key] === def);
    if (word == undefined){
        throw "Word not found in dictionary"
    }
    return word
}

module.exports = {
    lookupDefinition,
    getWord
};