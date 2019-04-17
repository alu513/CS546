const lab1 = require("./lab1");

// should output 14
console.log(lab1.questionOne([1, 2, 3]));

// 134
console.log(lab1.questionOne([-5, 3, 10])); 

// 9
console.log(lab1.questionOne([2, 1, 2])); 

// 206
console.log(lab1.questionOne([5, 10, 9])); 

// should output error
try{
    console.log(lab1.questionOne([1, "test", 3])); 
}
catch(e){
    console.error('function successfully threw an error:', e);
}

console.log()

// should output 13
console.log(lab1.questionTwo(7));

// should output 0
console.log(lab1.questionTwo(-1)); 

// should output error
try{
    console.log(lab1.questionTwo("test"))
}
catch(e){
    console.error('function successfully threw an error:', e);
}

// should output 0
console.log(lab1.questionTwo(0)); 

// should output error
try{
    console.log(lab1.questionTwo(4.5))
}
catch(e){
    console.error('function successfully threw an error:', e);
}

console.log()

// should output 196
console.log(lab1.questionThree("Mr. and Mrs. Dursley, of number four, Privet Drive, were  proud  to  say  that  they  were  perfectly  normal,  thank you  very  much. They  were  the  last  people  youd  expect  to  be  involved in anything strange or mysterious, because they just didn't hold with such nonsense. \n Mr. Dursley was the director of a firm called Grunnings, which  made  drills.  He  was  a  big,  beefy  man  with  hardly  any  neck,  although he did have a very large mustache. Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as she spent so much of her time craning over garden fences, spying on the neighbors. The Dursleys had a small son  called  Dudley  and  in  their  opinion  there  was no finer boy anywhere.")); 

// should output error
try{
    console.log(lab1.questionThree(1))
}
catch(e){
    console.error('function successfully threw an error:', e);
}

// should output 5
console.log(lab1.questionThree("aeiou"))

// should output error
try{
    console.log(lab1.questionThree(true))
}
catch(e){
    console.error('function successfully threw an error:', e);
}

//should output 5
console.log(lab1.questionThree("abcdefghijklmnopqrstuvwxyz"))

console.log()


// should output 3628800 
console.log(lab1.questionFour(10)); 

// should output NaN 
console.log(lab1.questionFour(-5));

// should output 1
console.log(lab1.questionFour(0));

// should output error
try{
    console.log(lab1.questionTwo("test"))
}
catch(e){
    console.error('function successfully threw an error:', e);
}

// should output error 
try{
    console.log(lab1.questionTwo(4.5))
}
catch(e){
    console.error('function successfully threw an error:', e);
}