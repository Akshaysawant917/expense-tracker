const incomeInput = document.getElementById("income");
const submitBtn = document.getElementById("submit-btn");
const incomeForm = document.getElementById("incomeForm");
const incomeDisplay = document.getElementById("incomeDisplay");

const expenseSubmit = document.getElementById("expenseSubmit");
const expenseInput = document.getElementById("expenseVal");
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const expenseName = document.getElementById("expenseName");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function getUserIncome() {
  const storedIncome = localStorage.getItem("userIncome");
  console.log(storedIncome);
  if (storedIncome) {
    incomeForm.style.display = "none";
    incomeDisplay.innerHTML = `<h2 class="text-lg font-bold text-gray-800">Total Income: ₹${storedIncome}</h2>`;
    incomeDisplay.classList.remove("hidden");
    expenseForm.classList.remove("hidden");
    displayExpenses();
  }
}

getUserIncome();

submitBtn.addEventListener("click", function () {
    const incomeValue = incomeInput.value.trim();
    if (incomeValue) {
      localStorage.setItem("userIncome", incomeValue);
      getUserIncome(); // Refresh UI
    }
  });
  
expenseSubmit.addEventListener("click", function (event) {
  event.preventDefault();
  const nameValue = expenseName.value.trim();
  const amountValue = expenseInput.value.trim();
  if (nameValue && amountValue && !isNaN(amountValue)) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    console.log(expenses);
    
    expenses.push({ name: nameValue, amount: parseFloat(amountValue) });
    localStorage.setItem("expenses", JSON.stringify(expenses));

    expenseName.value = "";
    expenseInput.value = "";
    displayExpenses(); 
  } else {
    alert("Please enter a valid expense name and amount!");
  }
});

function displayExpenses() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || []; // Ensure it's always an array
    expenseList.innerHTML = ""; // Clear previous entries

    if (expenses.length === 0) {
        expenseList.innerHTML = `<p class="text-gray-600 text-center">No expenses added yet.</p>`;
        return;
    }

    expenses.forEach((expense, index) => {
        let expenseItem = document.createElement("div");
        expenseItem.classList.add("flex", "justify-between", "bg-gray-100", "p-2", "rounded-lg", "mt-2");

        expenseItem.innerHTML = `
            <span class="text-gray-800">${expense.name}: ₹${expense.amount}</span>
            <button onclick="deleteExpense(${index})" class="text-red-500 font-bold">X</button>
        `;

        expenseList.appendChild(expenseItem);
    });
}


function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}
