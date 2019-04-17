function head(array){
    if(!array){
        throw "error array does not exist"
    }
    if(!Array.isArray(array)){
        throw "error value given is not an array"
    }
    if(!array.length){
        throw "error array is empty"
    }

    return array[0]
}

function last(array){
    if(!array){
        throw "error array does not exist"
    }
    if(!Array.isArray(array)){
        throw "error value given is not an array"
    }
    if(!array.length){
        throw "error array is empty"
    }

    return array[array.length-1]
}

function remove(array, index){
    if(!array){
        throw "error array does not exist"
    }
    if(!index){
        throw "error index does not exist"
    }
    if(!Array.isArray(array)){
        throw "error value given is not an array"
    }
    if(!array.length){
        throw "error array is empty"
    }
    if(index>array.length-1 || index<0){
        throw "error index not in bounds"
    }

    for (var i = 0; i < array.length; i++) {
        if(i==index){
            array.splice(index,1)
        }
    }

    return array
}

function range(end, value){
    if(!end){
        throw "error end does not exist"
    }
    if(!Number.isInteger(end)){
        throw "error end is not an integer"
    }
    if(end<1){
        throw "error end is not greater than 0"
    }

    var tempArray = []

    if(value===undefined){
        for (var i = 0; i < end; i++) {
            tempArray.push(i)
        }
    }
    else{
        for (var i = 0; i < end; i++) {
            tempArray.push(value)
        }
    }
    
    return tempArray
}

function countElements(array){
    if(!array){
        throw "error array does not exist"
    }
    if(!Array.isArray(array)){
        throw "error value given is not an array"
    }

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

function isEqual(arrayOne, arrayTwo){
    if(!arrayOne){
        throw "error arrayOne does not exist"
    }
    if(!arrayTwo){
        throw "error arrayTwo does not exist"
    }
    if(!Array.isArray(arrayOne)){
        throw "error value given for arrayOne is not an array"
    }
    if(!Array.isArray(arrayTwo)){
        throw "error value given for arrayTwo is not an array"
    }

    if(arrayOne.length != arrayTwo.length){
        return false
    }
    for(var i=0; i<arrayOne.length; i++){
        if(arrayOne[i]!==arrayTwo[i]){
            return false
        }
    }

    return true
}

module.exports = {
    head,
    last,
    remove,
    range,
    countElements,
    isEqual
};
