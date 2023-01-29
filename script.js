let attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.

const validUser = {
  username: "admin123",
  phone: "9549969303",
  email: "rahul.k.jain@habilelabs.io",
  password: "admin#123",
};

function validate() {
  const idValue = document.querySelector("#entered-value").value;
  let password = document.getElementById("entered-password").value;

  let validIdentity = false;
  if (
    idValue === validUser.username ||
    idValue === validUser.phone ||
    idValue === validUser.email
  ) {
    validIdentity = true;
  }

  const errorTextSelector = document.querySelector(".error-text");

  if (password !== "admin#123") {
    errorTextSelector.textContent = "Entered Password is incorrect!";
    errorTextSelector.style.color = 'red';
  }

  if (!validIdentity) {
    errorTextSelector.textContent = "User not found...";
    errorTextSelector.style.color = 'red';
  }

  if (validIdentity && password == validUser.password) {
    alert("Login successfully");
    window.location = "./addEmployee.html";
    return false;
  } else {
    attempt--; // Decrementing by one.
    alert("You have left " + attempt + " attempt;");
    // Disabling fields afvenderter 3 attempts.
    if (attempt == 0) {
      document.getElementById("entered-email").disabled = true;
      document.getElementById("entered-password").disabled = true;
      document.getElementById("submit").disabled = true;
      return;
    }
  }
}


// for add employee

