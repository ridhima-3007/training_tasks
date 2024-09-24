var userName = getLocalStorage("userName") || prompt("Enter your name");

if (userName != null) {
  document.getElementById("name").innerHTML = userName;
  setLocalStorage("userName", userName);
}

function getLocalStorage(a) {
  return JSON.parse(localStorage.getItem(a));
}

function setLocalStorage(a, b) {
  localStorage.setItem(a, JSON.stringify(b));
}

let totalAmount = document.getElementById("total-amount");
let productTitle = document.getElementById("product-title");
let userAmount = document.getElementById("user-amount");

const totalAmountButton = document.getElementById("total-amount-button");
const checkAmountButton = document.getElementById("check-amount");
const updateAmountButton = document.getElementById("update-amount");

const budgetErrorMessage = document.getElementById("budget-error");
const productTitleErrorMessage = document.getElementById("product-title-error");
const productCostErrorMessage = document.getElementById("product-cost-error");

let amount = document.getElementById("amount");
let expenditureValue = document.getElementById("expenditure-value");
let balanceValue = document.getElementById("balance-amount");

const list = document.getElementById("list");

let expenses = getLocalStorage("expenses") || [];

let budget = parseInt(getLocalStorage("budget")) || 0;
let cost = parseInt(getLocalStorage("expense")) || 0;
let balance = parseInt(getLocalStorage("balance")) || 0;
amount.innerHTML = getLocalStorage("budget") || 0;
balanceValue.innerHTML = getLocalStorage("balance") || 0;
expenditureValue.innerHTML = getLocalStorage("expense") || 0;

let editIndex = null;

createFullList();

function addBudget(clear = false) {
  const value = parseInt(totalAmount.value);
  totalAmount.value = null;
  if (isNaN(value) || value <= 0) {
    budgetErrorMessage.setAttribute("class", "error");
  } else {
    budgetErrorMessage.setAttribute("class", "hide error");
    budget += value;
    balance = budget-cost;
    setLocalStorage("balance", balance);
    setLocalStorage("budget", budget);
    setLocalStorage("expense", cost);
    setLocalStorage("expenses", expenses);
    amount.innerHTML = getLocalStorage("budget");
    balanceValue.innerHTML = getLocalStorage("balance");
    expenditureValue.innerHTML = getLocalStorage("expense");
  }
}

function clearBudget() {
  budget = 0;
  cost = 0;
  expenses = [];
  list.innerHTML = "";
  balance = budget-cost;
  setLocalStorage("balance", balance);
  setLocalStorage("budget", budget);
  setLocalStorage("expense", cost);
  setLocalStorage("expenses", expenses);
  amount.innerHTML = getLocalStorage("budget");
  balanceValue.innerHTML = getLocalStorage("balance");
  expenditureValue.innerHTML = getLocalStorage("expense");
}

function addExpense(update=false) {
  const expense = parseInt(userAmount.value);
  const title = productTitle.value.trim();
  userAmount.value = "";
  productTitle.value = null;
  if (budget == 0) {
    productTitleErrorMessage.innerHTML = "Please set a budget first!";
    productTitleErrorMessage.setAttribute("class", "error");
  } else if (title == "" || isNaN(expense) || expense <= 0) {
    productTitleErrorMessage.setAttribute("class", "error");
  } else if (expense > balance) {
    productTitleErrorMessage.innerHTML = "You do not have enough balance!";
    productTitleErrorMessage.setAttribute("class", "error");
  } else {
    productTitleErrorMessage.setAttribute("class", "hide error");
    cost += expense;
    if(update) {
      cost -= expenses[editIndex].ecost;
      expenses[editIndex].ecost = expense;
      expenses[editIndex].etitle = title;
      editIndex = null;
      setLocalStorage("expenses", expenses);
      updateAmountButton.setAttribute("class", "hide");
      checkAmountButton.setAttribute("class", "");
    }
    else {
      createObject(title, expense);
    }
    expenditureValue.innerHTML = cost;
    balance = budget - cost;
    balanceValue.innerHTML = balance;
    setLocalStorage("expense", cost);
    setLocalStorage("balance", balance);
    createFullList();
  }
}

function updateExpense() {
  addExpense(true);
}

function createList(expenseTitle, expenseCost, i) {
  const listItem = document.createElement("div");
  listItem.classList.add("list-item", "list-head");
  list.append(listItem);
  listItem.innerHTML = `<p class="product">${expenseTitle}</p><p class="amount">${expenseCost}</p>`;
  const action = document.createElement("div");
  action.classList.add("action");
  const edit = document.createElement("button");
  edit.classList.add("fa-solid", "fa-pen-to-square");
  edit.addEventListener("click", () => {
    editAction(listItem, i);
  });
  action.append(edit);
  const trash = document.createElement("button");
  trash.classList.add("fa-solid", "fa-trash");
  trash.addEventListener("click", () => {
    deleteAction(listItem);
  });
  action.append(trash);
  listItem.append(action);
}

function editAction(listItem, i) {
  const expenseTitle = listItem.querySelector(".product").innerText;
  const expenseCost = parseInt(listItem.querySelector(".amount").innerText);
  productTitle.value = expenseTitle;
  userAmount.value = expenseCost;
  updateAmountButton.setAttribute("class", "");
  checkAmountButton.setAttribute("class", "hide");
  editIndex = i;
  // deleteAction(listItem);
}

function deleteAction(listItem) {
  const expenseTitle = listItem.querySelector(".product").innerText;
  const expenseCost = parseInt(listItem.querySelector(".amount").innerText);
  cost -= expenseCost;
  balance += expenseCost;
  setLocalStorage("expense", cost);
  setLocalStorage("balance", balance);
  balanceValue.innerHTML = getLocalStorage("balance");
  expenditureValue.innerHTML = getLocalStorage("expense");
  expenses = getLocalStorage("expenses");
  let index = expenses.findIndex(
    (item) => item.etitle === expenseTitle && item.ecost == expenseCost
  );
  expenses.splice(index, 1);
  setLocalStorage("expenses", expenses);
  listItem.remove();
}

function createObject(expenseTitle, expenseCost) {
  const newExpense = {
    etitle: expenseTitle,
    ecost: expenseCost,
  };
  expenses.push(newExpense);
  setLocalStorage("expenses", expenses);
}

function createFullList() {
  list.innerHTML = "";
  for (let i = 0; i < expenses.length; i++) {
    createList(expenses[i].etitle, expenses[i].ecost, i);
  }
}
