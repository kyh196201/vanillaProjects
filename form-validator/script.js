const form = document.getElementById("form");
const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkRequired([userName, email, password, password2]);
    checkLength(userName, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);

    console.log("submit");
});

function showError(input, message) {
    const parent = input.parentElement;
    const errorEl = parent.querySelector(".form__error");
    errorEl.innerText = message;

    parent.className = "form__row error";
}

function showSuccess(input) {
    const parent = input.parentElement;
    parent.className = "form__row success";
}

function checkRequired(inputArr) {
    let isValid = true;

    inputArr.forEach((input) => {
        if (input.value.trim() === "") {
            showError(input, `${getFieldName(input)} is required.`);
            isValid = false;
        } else {
            showSuccess(input);
        }
    });

    return isValid;
}

function checkLength(input, min, max) {
    const value = input.value.trim();

    if (value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} length.`
        );
    } else if (value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be more than ${max} length.`
        );
    } else {
        showSuccess(input);
    }
}

function checkEmail(input) {
    if (validateEmail(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, "Email is not valid.");
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkPasswordMatch(input1, input2) {
    if (input1.value.trim() !== input2.value.trim()) {
        showError(input2, "Password is not matched");
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
