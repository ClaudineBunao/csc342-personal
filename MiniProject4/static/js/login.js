import api from './APIClient.js';

document.addEventListener('DOMContentLoaded', function() {  
  const loginForm = document.querySelector('#loginForm');
  const username = document.querySelector('#username');
  const errorBox = document.querySelector('#errorbox');

  function showError(error) {
    errorBox.classList.remove("hidden");
    if (error.message === 'Login failed') {
      errorBox.textContent = "Invalid username";
    } else {
      errorBox.textContent = error.message;
    }
  }

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    errorBox.classList.add("hidden");
    // console.log('User:', username); // Log the username value

    console.log('Usernameeeeee:', username.value); // Log the username value

    api.logIn(username.value).then(userData => {
      localStorage.setItem('token', userData.token); // Store the token in localStorage
      document.location = "/main";
    }).catch((error) => {
      showError(error);
    });
  });
});
