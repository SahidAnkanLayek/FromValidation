
// Get references to the error elements
let nameError = document.getElementById("error_user");
let emailError = document.getElementById("error_email");
let phoneError = document.getElementById("error_phone");
let passwordError = document.getElementById("error_password");
let confirmPasswordError = document.getElementById("error_cpassword");
let formError = document.getElementById("error_submit");

// Validation functions
function validateUserName() {
  let usernameValue = document.getElementById("username").value.trim();

  if (usernameValue === "") {
    nameError.innerHTML = "Username cannot be empty";
    return false;
  } else if (usernameValue.length < 4) {
    nameError.innerHTML = "Username must be at least 4 characters long";
    return false;
  } else if (!/^[a-zA-Z0-9_]+$/.test(usernameValue)) {
    nameError.innerHTML = "only contain letters, numbers, and underscores";
    return false;
  }
  nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'; // Clear error message if validation passes
  return true;
}

function validateEmail() {
  let emailValue = document.getElementById("email").value.trim();

  if (emailValue === "") {
    emailError.innerHTML = "Please enter your email address";
    return false;
  } else if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
    emailError.innerHTML = "Please provide a valid email address";
    return false;
  }
  emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'; // Clear error message if validation passes
  return true;
}

function validatePhone() {
  let phoneValue = document.getElementById("phone").value.trim();

  if (phoneValue === "") {
    phoneError.innerHTML = "Please enter your phone number";
    return false;
  } else if (!/^\d{10}$/.test(phoneValue)) {
    phoneError.innerHTML = "Please enter a valid 10-digit phone number";
    return false;
  }
  phoneError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'; // Clear error message if validation passes
  return true;
}

function validatePassword() {
  let passwordValue = document.getElementById("password").value;

  if (passwordValue.length < 8) {
    passwordError.innerHTML = "Password must be at least 8 characters long";
    return false;
  } else if (!/[a-z]/.test(passwordValue)) {
    passwordError.innerHTML =
      "Password must include at least one lowercase letter";
    return false;
  } else if (!/[A-Z]/.test(passwordValue)) {
    passwordError.innerHTML =
      "Password must include at least one uppercase letter";
    return false;
  } else if (!/\d/.test(passwordValue)) {
    passwordError.innerHTML = "Password must include at least one digit";
    return false;
  } else if (!/[_!@$%*?&]/.test(passwordValue)) {
    passwordError.innerHTML =
      "Password must include at least one special character (_!@$%*?&)";
    return false;
  }
  passwordError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'; // Clear error message if validation passes
  return true;
}

function validateConfirmPassword() {
  let passwordValue = document.getElementById("password").value;
  let confirmPasswordValue = document.getElementById("confirm_password").value;

  if (confirmPasswordValue === "") {
    confirmPasswordError.innerHTML = "Please confirm password";
    return false;
  } else if (confirmPasswordValue !== passwordValue) {
    confirmPasswordError.innerHTML = "Passwords do not match";
    return false;
  }
  confirmPasswordError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'; // Clear error message if validation passes
  return true;
}

// Validate form
function validateForm() {
  // Clear any previous error messages
  formError.innerHTML = "";

  // Perform validation for each field
  let isUsernameValid = validateUserName();
  let isEmailValid = validateEmail();
  let isPhoneValid = validatePhone();
  let isPasswordValid = validatePassword();
  let isConfirmPasswordValid = validateConfirmPassword();

  // Check if all validations pass
  if (
    isUsernameValid &&
    isEmailValid &&
    isPhoneValid &&
    isPasswordValid &&
    isConfirmPasswordValid
  ) {
    formError.innerHTML = "Successfully Submitted!!!"; // Display success message
    return true; // Allow form submission
  } else {
    formError.innerHTML = "Please fix the errors before submitting."; // Display error message
    return false; // Prevent form submission
  }
}


const form = document.querySelector(".form");
form.addEventListener("submit",(event)=>{
  if (validateForm()) {
    event.preventDefault();

    const formData = new FormData(form);
   // console.log(formData.get("username"));
   const userData = Object.fromEntries(formData);
   //console.log(userData);
   
    // TO DO :Store the user data in the database using fetch API
  
    fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User data saved successfully");
        } else {
          console.log("Failed to store the data");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    event.preventDefault(); // Prevent form submission if validation fails
  }
});

