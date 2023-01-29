const list = document.querySelector("#employees-list");

const getEmpl = () => {
  let empl;
  let emplJSON = localStorage.getItem("employees");
  if (emplJSON === null) {
    empl = [];
  } else {
    empl = JSON.parse(emplJSON);
  }
  return empl;
};

const displayEmpl = () => {
  const employees = getEmpl();
  if (employees == []) {
    return;
  }

  let sno = 1;

  employees.map((empl) => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${sno}</td>
    <td class="empl-id">${empl.id}</td>
    <td>${empl.name}</td>
    <td>${empl.email}</td>
    <td>${empl.designation}</td>
    <td>${empl.ctc}</td>
    <td>${empl.stipend}</td>
    <td>${empl.basicPay}</td>
    <td><button class="btn delete"><i class="fa fa-trash delete-icon" aria-hidden="true"></i></button></td>
    `;

    list.appendChild(row);
    sno++;
  });
};

const deleteEmplUI = (el) => {
  if (el.classList.contains("delete")) {
    el.parentElement.parentElement.remove();
  }
  if (el.classList.contains("delete-icon")) {
    el.parentElement.parentElement.parentElement.remove();
  }
};

const deleteEmpl = (id) => {
  let employees = JSON.parse(localStorage.getItem("employees"));

  employees.forEach((empl, index) => {
    if (empl.id === id) {
      employees.splice(index, 1);
    }
  });

  localStorage.setItem("employees", JSON.stringify(employees));
};

document.addEventListener("DOMContentLoaded", displayEmpl);

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = e.target.parentElement.parentElement.childNodes[3].textContent;
    if (confirm("Do you want to delete employee record??")) {
      deleteEmplUI(e.target);
      deleteEmpl(id);
    }
  }

  if (e.target.classList.contains("delete-icon")) {
    const id =
      e.target.parentElement.parentElement.parentElement.childNodes[3]
        .textContent;
    if (confirm("Do you want to delete employee record??")) {
      deleteEmplUI(e.target);
      deleteEmpl(id);
    }
  }
});

function toAddEmployee() {
  location.replace("./addEmployee.html");
}

function toPaymentsPage() {
  location.replace("./payment.html");
}
