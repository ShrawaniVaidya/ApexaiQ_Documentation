// Selecting elements (DOM)

const title = document.getElementById("title");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const branchInput = document.getElementById("branch");

const showBtn = document.getElementById("showBtn");
const colorBtn = document.getElementById("colorBtn");
const resetBtn = document.getElementById("resetBtn");

const card = document.getElementById("studentCard");


// Show Student Details (Click Event)
showBtn.addEventListener("click", function () {

    card.innerHTML = `
        <h2>Name : ${nameInput.value}</h2>
        <h2>Age : ${ageInput.value}</h2>
        <h2>Branch : ${branchInput.value}</h2>
    `;

});

// Change Card Color
colorBtn.addEventListener("click", function () {

    card.style.backgroundColor = "lightblue";
    card.style.color = "darkblue";
    card.style.borderRadius = "10px";

});

// Reset Everything
resetBtn.addEventListener("click", function () {

    nameInput.value = "";
    ageInput.value = "";
    branchInput.value = "";

    title.innerHTML = "Student Information";

    card.innerHTML = `
        <h2>Name :</h2>
        <h2>Age :</h2>
        <h2>Branch :</h2>
    `;

    card.style.backgroundColor = "white";
    card.style.color = "black";

});

// Mouse Over Heading
title.addEventListener("mouseover", function () {

    title.style.color = "red";

});

// Mouse Out Heading
title.addEventListener("mouseout", function () {

    title.style.color = "black";

});

// Live Typing in Name Box
nameInput.addEventListener("keyup", function () {

    title.innerHTML = "Hello " + nameInput.value;

});

// Show Key Pressed
nameInput.addEventListener("keydown", function (event) {

    console.log("Key Pressed :", event.key);

});

// Double Click on Card
card.addEventListener("dblclick", function () {

    alert("Student Card Double Clicked");

});