function capitalize(string){
    if(!string){
        throw "error string does not exist"
    }
    if(typeof string != "string"){
        throw "error type is not string"
    }

    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase()
}

function repeat(string, num){
    if(!string){
        throw "error string does not exist"
    }
    if(typeof string != "string"){
        throw "error type of string is not string"
    }
    if(num==undefined){
        throw "error num does not exist"
    }
    if(!Number.isInteger(num)){
        throw "error type of num is not integer"
    }
    if(num<0){
        throw "error num is negative"
    }

    temp = ""
    for (var i=0; i<num; i++){
        temp += string
    }
    return temp
}

function countChars(string){
    array = string.split('')
    let obj = {}
    for (var i = 0; i < array.length; i++) {
        if(array[i] in obj){
            obj[array[i]] += 1
        }
        else{
            obj[array[i]] = 1
        }
    }

    return obj
}

module.exports = {
    capitalize,
    repeat,
    countChars
}