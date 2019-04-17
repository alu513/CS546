const questionOne = function questionOne(arr) {
    // Implement question 1 here

    let sum = 0
    let squared = 0
    for (var i = 0; i < arr.length; i++) {
        if(typeof arr[i] != "number")
        {
            throw "one of the elements is not a number"
        }
        squared = arr[i]*arr[i]
        sum += squared
    }
    return sum
}

const questionTwo = function questionTwo(num) { 
    // Implement question 2 here
    if(!Number.isInteger(num))
    {
        throw "value given is not an integer"
    }
    if(num<=0){
        return 0
    }
    if(num==1){
        return 1
    }
    else{
        return questionTwo(num-1)+questionTwo(num-2)
    }
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    if(typeof text != "string")
    {
        throw "value given is not an string"
    }
    let lower = text.toLowerCase()
    // got the lower.match function from https://stackoverflow.com/questions/881085/count-the-number-of-occurrences-of-a-character-in-a-string-in-javascript
    return (lower.match(/a/g)||[]).length + (lower.match(/o/g)||[]).length + 
    (lower.match(/i/g)||[]).length + (lower.match(/e/g)||[]).length + (lower.match(/u/g)||[]).length
}

const questionFour = function questionFour(num) {
    // Implement question 4 here
    if(!Number.isInteger(num))
    {
        throw "value given is not an integer"
    }
    if(num<0){
        return NaN
    }
    if(num==0 || num==1){
        return 1
    }
    else{
        return num*questionFour(num-1)
    }
}

module.exports = {
    firstName: "Alexander", 
    lastName: "Lu", 
    studentId: "10419132",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};