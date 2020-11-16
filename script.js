let form = document.querySelector(".form");
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirm = document.querySelector("#confirm");

let errorMessage = (input, message) => {
  let formCheck = input.parentElement;
  formCheck.classList.add("error");
  let span = formCheck.querySelector("span");
  span.innerText = message;
};

let successMessage = (input) => {
  let formCheck = input.parentElement;
  formCheck.classList.add("success");
  formCheck.classList.remove("error");
};

let checkEmail = (input) => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  re.test(String(input.value).toLowerCase())
    ? successMessage(input)
    : errorMessage(input, "Not valid email");
};

let capitalize = (input) => {
  /*capitalizeFirstLetter */
  return input.charAt(0).toUpperCase() + input.slice(1);
};

let fillCheck = (arr) => {
  for (let i of arr) {
    i.value.trim() === ""
      ? errorMessage(i, `${capitalize(i.id)} is required`)
      : successMessage(i);
  }
};

let lengthCheck = (arr, min, max) => {
  for (let i of arr) {
    if (i.value.length < min) {
      errorMessage(i, `${capitalize(i.id)} must be min ${min} characters`);
    } else if (i.value.length > max) {
      errorMessage(i, `${capitalize(i.id)} must be max ${max} characters`);
    }
  }
};

let equalPas = (pas1, pas2) => {
  if (pas1.value !== pas2.value) {
    errorMessage(pas2, "Passwords don't match");
  }
};

form.addEventListener("submit", (obj) => {
  obj.preventDefault();
  fillCheck([username, email, password, confirm]);
  lengthCheck([username, password], 5, 20);
  checkEmail(email);
  equalPas(password, confirm);
});
