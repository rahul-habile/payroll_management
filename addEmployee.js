const enteredName = document.querySelector("#empName");
const enteredEmpID = document.querySelector("#empID");
const enteredPhone = document.querySelector("#empPhone");
const enteredEmail = document.querySelector("#empEmail");
const enteredDesignation = document.querySelector("#empDesignation");
const enteredCTC = document.querySelector("#empCTC");
const enteredStipend = document.querySelector("#empStipend");
const enteredBasicPay = document.querySelector("#empBasicPay");
const addEmpForm = document.querySelector("#addEmployee");
const inputs = document.querySelectorAll("input");
const submitBtn = document.querySelector("#submit-btn");
const addEmployeeSelector = document.querySelector(".add-employee-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const formSelector = document.querySelector("#add-employee-form");

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length >= 1;
const isPhone = (value) => value.trim().length === 10;

addEmpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const enteredNameIsValid = !isEmpty(enteredName.value);
  const enteredEmpIDIsValid =
    enteredEmpID.value && isSixChars(enteredEmpID.value);
  const enteredEmailIsValid = enteredEmail.value.includes("@");
  const enterePhoneIsValid = isPhone(enteredPhone.value);

  const formIsValid =
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredEmpIDIsValid &&
    enterePhoneIsValid;

  const errorEnterText = document.querySelector(".error--enter_text");

  if (!formIsValid) {
    errorEnterText.textContent = "Please fill the required fields correctly.";
  }

  // for localStorage
  const employee = {
    name: enteredName.value,
    email: enteredEmail.value,
    phone: enteredPhone.value,
    id: enteredEmpID.value,
    designation: enteredDesignation.value,
    ctc: enteredCTC.value,
    stipend: enteredStipend.value,
    basicPay: enteredBasicPay.value,
  };

  let employees = JSON.parse(localStorage.getItem("employees"));

  if (employees === null) {
    employees = [];
  }

  let isEmployeeExisted = false;

  employees.forEach((fetchedUser) => {
    if (fetchedUser.email === employee.email) {
      isEmployeeExisted = true;
      errorEnterText.textContent =
        "Employee already exists. Please Enter correct details.";
      return;
    }
  });

  // for reseting values
  inputs.forEach((input) => {
    input.value = "";
  });

  if (confirm("Do you want to add Employee??")) {
    if (!isEmployeeExisted) {
      employees.push(employee);
      const EmployeesJSON = JSON.stringify(employees);

      localStorage.setItem("employees", EmployeesJSON);
    }
  }
});

addEmployeeSelector.addEventListener("click", () => {
  formSelector.classList.remove("form--hidden");
});

cancelBtn.addEventListener("click", () => {
  formSelector.classList.add("form--hidden");
});

function toEmployeeRecord() {
  location.replace("./employees-record.html");
}

