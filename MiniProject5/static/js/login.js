import api from './APIClient.js';

document.addEventListener('DOMContentLoaded', function() {  
  const loginForm = document.querySelector('#loginForm');
  const username = document.querySelector('#username');
  const errorBox = document.querySelector('#errorbox');

  function showError(error) {
    errorBox.classList.remove("hidden");
    if (error.message === 'Login failed') {
      errorBox.textContent = "Invalid login information";
    } else {
      errorBox.textContent = error.message;
    }
  }

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    errorBox.classList.add("hidden");
    // console.log('User:', username); // Log the username value

    // console.log('Usernameeeeee:', username.value); // Log the username value
    // console.log('Passwordddd:', password.value); // Log the password value

    api.logIn(username.value, password.value).then(userData => {
      console.log('User data:', userData); // Log the user data
      document.location = "/main";
    }).catch((error) => {
      console.error('Error logging in:', error); // Log the error
      showError(error);
    });
  });
});
