function extend(...args){
    if(args.length<2){
        throw "there must be at least two arguments"
    }
    for(var i=0; i<args.length; i++){
        if(args[i]==undefined){
            throw "an argument is undefined"
        }
        if(typeof args[i] != "object" || args[i] == null){
            throw "an argument is not type object"
        }
    }

    let obj = {}
    for(var i=0; i<args.length; i++){
        for (var key in args[i]){
            if(!(key in obj)){
                obj[key] = args[i][key]
            }
        }
    }
    
    return obj

}

function smush(...args){
    if(args.length<2){
        throw "there must be at least two arguments"
    }
    for(var i=0; i<args.length; i++){
        if(args[i]==undefined){
            throw "an argument is undefined"
        }
        if(typeof args[i] != "object" || args[i] == null){
            throw "an argument is not type object"
        }
    }

    let obj = {}
    for(var i=0; i<args.length; i++){
        for (var key in args[i]){
                obj[key] = args[i][key]
        }
    }
    
    return obj

}


function mapValues(object, func){

    if(!object){
        throw "object does not exist"
    }
    if(typeof object != "object" || object == null){
        throw "object argument is not type object"
    }
    if(!func){
        throw "function does not exist"
    }
    if(typeof func != "function"){
        throw "func argument is not type function"
    }

    for(var key in object){
        object[key] = func(object[key])
    }

    return object
}


module.exports = {
    extend,
    smush,
    mapValues
}