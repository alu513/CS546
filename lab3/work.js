const axios = require('axios')

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json')
    return data // this will be the array of people
}

async function getWork(){
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json')
    return data // this will be the array of work
}

async function whereDoTheyWork(firstName, lastName){
    if(!firstName){
        throw "error argument firstName does not exist"
    }
    if(!lastName){
        throw "error argument lastName does not exist"
    }
    if(typeof firstName != "string"){
        throw "error type of firstName is not string"
    }
    if(typeof lastName != "string"){
        throw "error type of lastName is not string"
    }

    arrayPeople = await getPeople()
    arrayWork = await getWork()

    if(arrayPeople.find(x => x.firstName === firstName && x.lastName ===lastName) == undefined){
        throw "error person specified does not exist"
    }

    let ssn = arrayPeople.find(x => x.firstName === firstName && x.lastName ===lastName).ssn
    let company = arrayWork.find(x => x.ssn === ssn).company
    let title = arrayWork.find(x => x.ssn === ssn).jobTitle
    let fired = arrayWork.find(x => x.ssn === ssn).willBeFired

    if(fired){
        return firstName + " " + lastName + " - " + title + " at " + company + ". They will be fired."
    }
    else{
        return firstName + " " + lastName + " - " + title + " at " + company + ". They will not be fired."
    }

}

async function findTheHacker(ip){
    if(!ip){
        throw "error argument ip does not exist"
    }
    if(typeof ip != "string"){
        throw "error type of ip is not string"
    }

    arrayPeople = await getPeople()
    arrayWork = await getWork()

    if(arrayWork.find(x => x.ip === ip) == undefined){
        throw "error ip specified does not exist"
    }

    let ssn = arrayWork.find(x => x.ip === ip).ssn
    let person = arrayPeople.find(x => x.ssn === ssn)

    return person.firstName + " " + person.lastName + " is the hacker!"

}

module.exports = {
    getPeople,
    getWork,
    whereDoTheyWork,
    findTheHacker
};