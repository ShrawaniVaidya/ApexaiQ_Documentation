# JavaScript Documentation


## 1. Variable Declarations (var, let, const)

### Theory

Variables are used to store data in JavaScript. JavaScript provides three keywords to declare variables: **var**, **let**, and **const**.

**`var`**
- Introduced in older versions of JavaScript.
- Function scoped.
- Can be redeclared and updated.
- Hoisted and initialized with `undefined`.
- Not recommended in modern JavaScript because it can lead to unexpected behavior.

**`let`**
- Introduced in ES6 (ECMAScript 2015).
- Block scoped.
- Can be updated but cannot be redeclared within the same block.
- Preferred when the variable value may change.

**`const`**
- Introduced in ES6.
- Block scoped.
- Cannot be updated or redeclared.
- Must be initialized during declaration.
- Used for values that should remain constant.

### Syntax

```javascript
var variableName = value;
let variableName = value;
const variableName = value;
```

### Example

```javascript
var company = "Infosys";
var company = "TCS"; // Allowed

let city = "Pune";
city = "Mumbai"; // Allowed

const country = "India";
// country = "USA"; // Error - cannot reassign a const

console.log(company);
console.log(city);
console.log(country);
```

---

## 2. Data Types and Operators

### Theory

A **data type** specifies what kind of value a variable stores. JavaScript is a **dynamically typed language**, meaning the data type is determined automatically at runtime.

**Primitive Data Types**
- String
- Number
- Boolean
- Undefined
- Null
- BigInt
- Symbol

**Non-Primitive (Reference) Data Types**
- Object
- Array
- Function

### Example

```javascript
let name = "Ankit";              // String
let age = 24;                    // Number
let isStudent = true;            // Boolean
let marks = null;                // Null
let address;                     // Undefined
let student = { city: "Pune" };  // Object
let fruits = ["Apple", "Mango"]; // Array
```

### Operators

**Arithmetic Operators**

| Operator | Description    |
|----------|-----------------|
| +        | Addition        |
| -        | Subtraction     |
| *        | Multiplication  |
| /        | Division        |
| %        | Modulus         |
| **       | Exponent        |

```javascript
let a = 20;
let b = 5;

console.log(a + b);  // 25
console.log(a - b);  // 15
console.log(a * b);  // 100
console.log(a / b);  // 4
console.log(a % b);  // 0
```

**Comparison Operators**

Used to compare two values and return a boolean result.

```javascript
console.log(a > b);   // true
console.log(a < b);   // false
console.log(a == b);  // false (loose equality)
console.log(a === b); // false (strict equality)
console.log(a != b);  // true
```

**Logical Operators**

Used to combine or invert boolean conditions.

```javascript
console.log(a > 10 && b < 10); // true (AND)
console.log(a < 10 || b < 10); // true (OR)
console.log(!(a < b));         // true (NOT)
```

---

## 3. Control Flow Statements

### Theory

Control flow statements determine the order in which code executes. They help in decision-making and repetition.

### if-else

Executes different blocks of code depending on a condition.

```javascript
let marks = 82;

if (marks >= 90) {
    console.log("Grade A");
} else if (marks >= 75) {
    console.log("Grade B");
} else {
    console.log("Grade C");
}
```

### switch

Used when multiple conditions depend on the value of a single expression.

```javascript
let day = 2;

switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    default:
        console.log("Invalid");
}
```

### for Loop

Used when the number of iterations is known in advance.

```javascript
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

### while Loop

Runs as long as the condition remains true, checked before each iteration.

```javascript
let i = 1;

while (i <= 5) {
    console.log(i);
    i++;
}
```

### do...while Loop

Runs at least once, since the condition is checked after the loop body executes.

```javascript
let num = 1;

do {
    console.log(num);
    num++;
} while (num <= 5);
```

---

## 4. Functions (All Types)

### Theory

A function is a reusable block of code that performs a specific task. Functions help avoid code repetition and improve readability.

### Function Declaration

```javascript
function greet(name) {
    return "Hello " + name;
}

console.log(greet("Ankit"));
```

### Function Expression

```javascript
const add = function (a, b) {
    return a + b;
};

console.log(add(10, 20));
```

### Arrow Function

Introduced in ES6, arrow functions offer a shorter syntax and do not bind their own `this`.

```javascript
const multiply = (a, b) => a * b;

console.log(multiply(5, 6));
```

### Anonymous Function

A function without a name, often used as an argument to another function.

```javascript
setTimeout(function () {
    console.log("Executed");
}, 2000);
```

### IIFE (Immediately Invoked Function Expression)

Runs immediately as soon as it is defined.

```javascript
(function () {
    console.log("IIFE Executed");
})();
```

### Callback Function

A function passed as an argument to another function, to be executed later.

```javascript
function calculate(a, b, operation) {
    operation(a, b);
}

calculate(10, 20, function (x, y) {
    console.log(x + y);
});
```

### Higher-Order Function

A function that accepts another function as an argument, or returns a function.

```javascript
function welcome(name) {
    return "Hello " + name;
}

function display(func) {
    console.log(func("Ankit"));
}

display(welcome);
```

---

## 5. Arrays and Their Methods

### Theory

An array stores multiple values in a single variable. Arrays are ordered collections indexed starting from **0**.

```javascript
let numbers = [10, 20, 30, 40];
```

### push()

Adds an element to the end of the array.

```javascript
numbers.push(50); // [10, 20, 30, 40, 50]
```

### pop()

Removes the last element from the array.

```javascript
numbers.pop(); // [10, 20, 30, 40]
```

### map()

Creates a new array by applying a function to every element.

```javascript
let square = numbers.map(num => num * num);
console.log(square);
```

### filter()

Returns a new array containing elements that satisfy a condition.

```javascript
let result = numbers.filter(num => num > 20);
console.log(result);
```

### reduce()

Reduces all elements of an array to a single accumulated value.

```javascript
let total = numbers.reduce((sum, num) => sum + num, 0);
console.log(total);
```

### forEach()

Executes a given function once for each array element.

```javascript
numbers.forEach(num => console.log(num));
```

### find()

Returns the first element that matches a given condition.

```javascript
console.log(numbers.find(num => num > 25));
```

---

## 6. Objects and Their Methods

### Theory

Objects store data as **key-value pairs**, allowing related data and behavior to be grouped together.

```javascript
let student = {
    name: "Ankit",
    age: 24,
    city: "Pune"
};
```

### Object Method

A function stored as a property of an object.

```javascript
let student = {
    name: "Ankit",
    age: 24,
    display() {
        console.log(this.name);
    }
};

student.display();
```

### Object.keys()

Returns an array of an object's keys.

```javascript
console.log(Object.keys(student));
```

### Object.values()

Returns an array of an object's values.

```javascript
console.log(Object.values(student));
```

### Object.entries()

Returns an array of key-value pairs.

```javascript
console.log(Object.entries(student));
```

### Adding / Deleting a Property

```javascript
student.course = "JavaScript"; // add a property
delete student.city;           // remove a property

console.log(student);
```

---

## 7. DOM (Document Object Model)

### Theory

The **Document Object Model (DOM)** is a programming interface that represents an HTML page as a tree of objects. It allows JavaScript to access and modify HTML elements, CSS styles, and page content dynamically.

Common DOM methods:
- `getElementById()`
- `getElementsByClassName()`
- `querySelector()`
- `querySelectorAll()`

### HTML

```html
<h2 id="heading">Welcome</h2>
<button id="changeBtn">Change Text</button>
```

### JavaScript

```javascript
const heading = document.getElementById("heading");
heading.style.color = "blue";

document.getElementById("changeBtn").onclick = function () {
    heading.innerHTML = "JavaScript DOM Example";
};
```

---

## 8. Event Handling

### Theory

Events are actions performed by the user or the browser, such as:
- Mouse click
- Keyboard press
- Mouse hover
- Form submission
- Page loading

JavaScript uses **event listeners** to detect and respond to these actions.

### HTML

```html
<input type="text" id="name">
<button id="btn">Submit</button>
<p id="output"></p>
```

### JavaScript

```javascript
const btn = document.getElementById("btn");

btn.addEventListener("click", function () {
    let username = document.getElementById("name").value;
    document.getElementById("output").innerHTML = "Hello " + username;
});
```

---

## Conclusion

JavaScript is a powerful scripting language used to create dynamic and interactive web applications. Understanding variables, data types, operators, control flow, functions, arrays, objects, the DOM, and event handling forms the foundation of JavaScript programming. These concepts are essential for building responsive websites and modern web applications.
