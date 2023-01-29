const list = document.querySelector("#employees-list");
const salariesList = document.querySelector("#salaries-list");
const totalSalarySelector = document.querySelector("#total-amount");
const totalBalanceSelector = document.querySelector("#total-balance");
const paymentBtn = document.querySelector(".payment-btn");

let totalAmount = 0;
let emplSalaries = [];

if (localStorage.getItem("paid-employees") === null) {
  localStorage.setItem("paid-employees", JSON.stringify([]));
}

const availableBalance = () => {
  const balanceJSON = localStorage.getItem("totalBalance");
  if (balanceJSON === null) {
    localStorage.setItem("totalBalance", 1000000.0);
  }

  balance = localStorage.getItem("totalBalance");
  return parseFloat(balance);
};

const unpaidEmployees = () => {
  let paidEmployees;
  const paidEmployeesJSON = localStorage.getItem("paid-employees");
  if (paidEmployeesJSON === null) {
    paidEmployees = [];
  } else {
    paidEmployees = JSON.parse(paidEmployeesJSON);
  }

  let allEmployees = JSON.parse(localStorage.getItem("employees"));
  let unpaidEmployees = [];

  allEmployees.forEach((empl) => {
    let employee = {
      id: empl.id,
      name: empl.name,
      email: empl.email,
      salary: parseFloat(parseInt(empl.basicPay) / 12 + 1000).toFixed(2),
    };
    unpaidEmployees.push(employee);
  });

  for (id in paidEmployees) {
    unpaidEmployees.forEach((empl, index) => {
      if (paidEmployees[id] === empl.id) {
        unpaidEmployees.splice(index, 1);
      }
    });
  }

  return unpaidEmployees;
};

const displayUnpaidEmployees = () => {
  const unpaidEmpl = unpaidEmployees();
  const companyBalance = availableBalance().toLocaleString("en-IN");
  totalBalanceSelector.textContent = `₹${companyBalance}`;

  unpaidEmpl.forEach((empl) => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td class="empl-id">${empl.id}</td>
    <td>${empl.name}</td>
    <td>${empl.email}</td>
    <td>₹${empl.salary}</td>
    <td><input type="checkbox" data-salary="${empl.salary}" data-id="${empl.id}"></td>
    `;

    list.appendChild(row);
  });
};

document.addEventListener("DOMContentLoaded", displayUnpaidEmployees());

const displaySalaries = (passedSalaries) => {
  salariesList.innerHTML = "";
  totalAmount = 0;

  passedSalaries.forEach((empl) => {
    const row = document.createElement("tr");
    totalAmount += parseFloat(empl.salary);

    row.innerHTML = `
    <td>${empl.id}</td>
    <td>₹${empl.salary}</td>
    `;

    salariesList.appendChild(row);
  });

  const totalAmountCopy = totalAmount.toLocaleString("en-IN");
  totalSalarySelector.textContent = `₹${totalAmountCopy}`;
};

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    emplSalaries = [];
    checkboxes.forEach((chk) => {
      if (chk.checked) {
        const indSalary = {
          id: chk.dataset.id,
          salary: chk.dataset.salary,
        };
        emplSalaries.push(indSalary);
      }
    });
    displaySalaries(emplSalaries);
  });
});

const makePayment = () => {
  let accountBalance = parseFloat(localStorage.getItem("totalBalance"));

  if (accountBalance < totalAmount) {
    alert(
      "You bank account does not have required balance to make payment request!"
    );
  } else if (totalAmount === 0) {
    alert("Please select at least 1 employee to make payment!");
  } else {
    if (confirm("Do you want to make payment?")) {
      let paidEmplId = JSON.parse(localStorage.getItem("paid-employees"));

      accountBalance -= totalAmount;
      totalAmount = 0;
      totalSalarySelector.textContent = `₹00.00`;
      accountBalance = parseFloat(accountBalance).toFixed(2);
      localStorage.setItem("totalBalance", accountBalance);

      emplSalaries.forEach((empl) => {
        paidEmplId.push(String(empl.id));
      });

      localStorage.setItem("paid-employees", JSON.stringify(paidEmplId));

      // updating DOM
      salariesList.innerHTML = "";
      list.innerHTML = "";
      displayUnpaidEmployees();
      totalBalanceSelector.textContent = `₹${accountBalance}`;
    }
  }
};

paymentBtn.addEventListener("click", makePayment);
