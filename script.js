let previousNum = "";
let operator = "";
let currentNum = "";
let answer = "0";

const add = function(a,b) {
    return a + b
};
  
const subtract = function(a,b) {
    return a - b
};

const multiply = function(a,b) {
    return a * b
};

const divide = function(a,b) {
    return a / b
};

const power = function(a,b) {
    let total = 1;
    for (let i = 1; i <= b; i++){
        total *= a;
  }
    return total;
};

const operate = function(){
    let a = +previousNum;
    let b = +currentNum;
    let cal = operator;
    switch(cal){
        case('+'):
        answer = add(a,b);
        break;
        case('-'):
        answer = subtract(a,b);
        break;
        case('*'):
        answer = multiply(a,b);
        break;
        case('/'):
        answer = divide(a,b);
        break;
        case('^'):
        answer = power(a,b);
        break;
    }
    
    currentDisplay.textContent = Number(answer);
    currentNum="";
    previousNum="";
    operator="";
}

//query
const screen = document.querySelector("#screen");
const display = document.querySelector("#display");
const currentDisplay = document.querySelector("#currentDisplay");
const allClean = document.querySelector("#ac")
const numDelete = document.querySelector("#delete")
const numberButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator");

currentDisplay.textContent = "0";
display.textContent = "";

//event log
numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

operatorButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      handleOperator(e.target.textContent);
    });
  });

allClean.addEventListener("click", clean)

numDelete.addEventListener("click", del)


//function log
function handleNumber(number) {
  //no more than one dot
    if (currentNum.includes('.')){
        document.querySelector("#dot").disabled = true;
      }else{
        document.querySelector("#dot").disabled = false;
      }
  //limit the length
    if (currentNum.length <= 16) {
      currentNum += number;
      currentDisplay.textContent = currentNum;
      }
}

function handleOperator(op) {
  //change operator
    if (currentNum === "" && previousNum !== "" && operator !== ""){
        operator = op;
        display.textContent = previousNum + " " +op;
    }
  //cal process with the last answer
    if (currentNum === "" && previousNum === ""){
        previousNum = answer;
        operator = op;
        display.textContent = previousNum + " " +op; 
        currentDisplay.textContent = "0";
    }
  //cal process in normal
    if (previousNum === "" && currentNum !== "") {
        previousNum = currentNum;
        currentNum="";
        operator = op;
        display.textContent = previousNum + " " +op;
        currentDisplay.textContent = "0";
      }
  //answer with equal button
    if (previousNum !== "" && currentNum !== "" && operator !== "" && op === "="){
        display.textContent = previousNum + " " + operator + " " + currentNum + " " +op;
        operate();
    }
  //answer with other operator (with the last answer)
    if (previousNum !== "" && currentNum !== "" && operator !== ""){
        operate();
        previousNum = answer
        operator = op;
        display.textContent = previousNum + " " +op;
        currentDisplay.textContent = "0";
    }
}


function clean(){
    currentDisplay.textContent = "0";
    display.textContent = "";
    previousNum = "";
    currentNum = "";
    operator = "";
    answer = "";
}

function del(){
    if (currentNum.length <= 1){
      currentNum = "";
      currentDisplay.textContent = "0";
    }else{
    currentNum = currentNum.slice(0,-1);
    currentDisplay.textContent = currentNum;}
}

//keyboard input
document.onkeydown = function myOp(event){
  let key = event.key;

  operatorButtons.forEach((btn) => {
    if (key === btn.textContent){
    handleOperator(key);}
  })
  
  if (key === "Enter"){
    key = "=";
    handleOperator(key);
  }

  numberButtons.forEach((btn) => {
    if (key === btn.textContent){
      if (key === "." && currentNum.includes('.')){
        //do nothing
      }else{
      handleNumber(key)}}
  })

  if (key === "Backspace"){
    del()}
  
  if (key === "Escape"){
    clean()}
}

