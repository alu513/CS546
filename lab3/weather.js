const axios = require('axios')

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json')
    return data // this will be the array of people
}

async function getWeather(){
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/1b950dc4fbe9d5209de4a0be7d503801/raw/eee79bf85970b8b2b80771a66182aa488f1d7f29/weather.json')
    return data // this will be the array of weather
}

async function shouldTheyGoOutside(firstName, lastName)
{
    if(!firstName){
        throw "error firstName does not exist"
    }
    if(!lastName){
        throw "error lastName does not exist"
    }
    if(typeof firstName != "string"){
        throw "error type of firstName is not string"
    }
    if(typeof lastName != "string"){
        throw "error type of lastName is not string"
    }

    arrayPeople = await getPeople()
    arrayWeather = await getWeather()

    if(arrayPeople.find(x => x.firstName === firstName && x.lastName ===lastName) == undefined){
        throw "error person specified does not exist"
    }

    let zipCode = arrayPeople.find(x => x.firstName === firstName && x.lastName ===lastName).zip
    let temp = arrayWeather.find(x => x.zip === zipCode).temp

    if(temp>=34){
        return "Yes, " + firstName + " should go outside."
    }
    else{
        return "No, " + firstName + " should not go outside."
    }
}

module.exports = {
    getPeople,
    getWeather,
    shouldTheyGoOutside
};