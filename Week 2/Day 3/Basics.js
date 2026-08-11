//Variable declaration
var college = "SSGMCE";
let branch = "EXTC";
const country = "India";

console.log(college);
console.log(branch);
console.log(country);

branch = "Computer";
console.log(branch);

country = "USA"; // Error because const cannot be changed


//Data types 
let name = "Shrawani";     // String
let age = 21;              // Number
let isStudent = true;      // Boolean
let marks = null;          // Null
let city;                  // Undefined
let skills = ["HTML","CSS"]; // Array
let person = {name:"Ram"};   // Object

console.log(typeof name);
console.log(typeof age);
console.log(typeof isStudent);
console.log(typeof city);
console.log(typeof skills); //object
console.log(typeof person);
console.log(Array.isArray(skills)); //true

//Arithmetic operators
let a = 20;
let b = 5;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);

//Comparison operators
console.log(a > b);
console.log(a < b);
console.log(a == b);
console.log(a != b);
console.log(a === b);

//Control flow statements
//if
let age = 20;
if(age >= 18){
    console.log("Eligible to vote");
}

// if else
  let marks = 65;

if(marks >= 40){
    console.log("Pass");
}
else{
    console.log("Fail");
}  

// else if
let score = 85;

if(score >= 90){
    console.log("A Grade");
}
else if(score >= 75){
    console.log("B Grade");
}
else{
    console.log("C Grade");
}

// switch
let day = 2;

switch(day){
    case 1:
        console.log("Monday");
        break;

    case 2:
        console.log("Tuesday");
        break;

    default:
        console.log("Invalid");
}

//loops
//for loop
for(let i=1; i<=5; i++){
    console.log(i);
}

// while loop
let j = 1;
while(j <= 5){
    console.log(j);
    j++;
}

// do while loop
let k = 1;
do{
    console.log(k);
    k++;
}while(k <= 5);

//Functions
//Normal function
function greet(){
    console.log("Hello");
}
greet();

//Function with parameters
function add(a,b){
    return a+b;
}
console.log(add(10,20));

//Function with expression
const square = function(num){
    return num*num;
};
console.log(square(5));

//Arrow function
const multiply = (a,b)=>{
    return a*b;
};
console.log(multiply(4,5));

// Anonymous function
setTimeout(function(){
    console.log("Executed");
},2000);

//Immediately Invoked Function (IIFE)
(function(){
    console.log("Runs immediately");
})();

//Callback Function
function greet(name, callback){
    console.log("Hello "+name);
    callback();
}

function bye(){
    console.log("Good Bye");
}
greet("Shrawani", bye);

// Arrays and methods
let fruits = ["Apple","Banana","Mango"];
console.log(fruits);

fruits.push("Orange"); // Add element at the end
fruits.pop(); // Remove last element
fruits.shift(); // Remove first element
fruits.unshift("Grapes"); // Add element at the beginning

console.log(fruits);
console.log(fruits.length);

console.log(fruits.indexOf("Banana"));
console.log(fruits.includes("Mango"));

let numbers=[1,2,3,4];
let square=numbers.map(num=>num*num); // [1,4,9,16]
console.log(square);

let even=numbers.filter(num=>num%2==0);
console.log(even);

numbers.forEach(function(num){
    console.log(num);
});

// Objects and methods
let student={
    name:"Shrawani",
    age:21,
    branch:"EXTC",

    display:function(){
        console.log(this.name);
    }
};

console.log(student.name);
console.log(student.branch);

student.display();

student.city="Shegaon"; //Adding property

student.age=22; //Updating property

delete student.city; //Deleting property