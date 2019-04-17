const dic = require("./dictionary");


try {
    console.log(dic.lookupDefinition("programming"))
}catch (error){
    console.log(error)
}

try {
    console.log(dic.lookupDefinition("test"))
}catch (error){
    console.log(error)
}

try {
    console.log(dic.lookupDefinition("charisma"))
}catch (error){
    console.log(error)
}

try {
    console.log(dic.lookupDefinition(1))
}catch (error){
    console.log(error)
}

try{
    console.log(dic.getWord("The action or process of writing computer programs."))
}catch (error){
    console.log(error)
}

try{
    console.log(dic.getWord("A personal magic of leadership arousing special popular loyalty or enthusiasm for a public figure (such as a political leader)"))
}catch (error){
    console.log(error)
}

try{
    console.log(dic.getWord("test"))
}catch (error){
    console.log(error)
}

try{
    console.log(dic.getWord(1))
}catch (error){
    console.log(error)
}