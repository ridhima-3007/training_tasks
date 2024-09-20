// var userName = prompt("Enter your name");

// if(userName != null) {
//     document.getElementById("name").innerHTML = userName;
// }

function getLocalStorage(a) {
    return JSON.parse(localStorage.getItem(a));
}

function setLocalStorage(a, b) {
    localStorage.setItem(a , JSON.stringify(b));
}

let totalAmount = document.getElementById("total-amount");
let productTitle = document.getElementById("product-title");
let userAmount = document.getElementById("user-amount");

const totalAmountButton = document.getElementById("total-amount-button");
const checkAmountButton = document.getElementById("check-amount");

const budgetErrorMessage = document.getElementById("budget-error");
const productTitleErrorMessage = document.getElementById("product-title-error");
const productCostErrorMessage = document.getElementById("product-cost-error");

let amount = document.getElementById("amount");
let expenditureValue = document.getElementById("expenditure-value");
let balanceValue = document.getElementById("balance-value");

const list = document.getElementById("list");


let budget = 0;
function addBudget() {
    budget += totalAmount.getAttribute(value);
    console.log(budget);
}

console.log(budget);

