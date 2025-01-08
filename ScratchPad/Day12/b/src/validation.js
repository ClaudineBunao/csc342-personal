module.exports = function validateRegistration(body) {
    let valid = true;
    let errors = [];
  
    // Username validation (required, at least 5 characters, lowercase only)
  const usernamePattern = /^[a-z]{5,}$/;
  if (!usernamePattern.test(body.username)) {
    errors.push("Username must be at least 5 characters long and consist only of lowercase letters.");
    valid = false;
  }

  // Password validation (required, at least 8 characters)
  if (!body.password || body.password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
    valid = false;
  }

  // Confirm password validation (must match password)
  if (body.password !== body['confirm-password']) {
    errors.push("Passwords do not match.");
    valid = false;
  }
  
  // Language validation (required)
  if (!body.language || body.language === "") {
    errors.push("Please select a preferred language.");
    valid = false;
  }

  // Terms and conditions validation (required)
  if (body.terms !== "on") {
    errors.push("You must accept the terms and conditions.");
    valid = false;
  }

  // If any validation failed, log errors and return false
  if (!valid) {
    console.log(errors);
    return false;
  }
  return true;
}


// formValidation.js
//   let valid = true;
//   let errors = [];

//   usernameInput.setCustomValidity("");
//   if (!usernameInput.checkValidity()){
//     errors.push("username must be");
//     usernameInput.setCustomValidity("username must")
//     valid = false;
//   }

//   passwordInput.setCustomValidity("");
//   if (!passwordInput.checkValidity()){
//     errors.push("password must be");
//     passwordInput.setCustomValidity("password must")
//     valid = false;
//   }

//   confirmPasswordInput.setCustomValidity("");
//   if (confirmPasswordInput.value != ){
//     errors.push("passwords dont match");
//     confirmPasswordInput.setCustomValidity("password must")
//     valid = false;
//   }

//   if (!valid){
//     console.log(error)
//     form.reportValidity();
//     event.preventDefault();
//   }
  