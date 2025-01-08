import api from './APIClient.js';

function displayUserInHeader(user) {
  let link = document.createElement('a');
  link.href = '#';
  link.innerHTML = "Log Out";
  link.addEventListener("click", e => {
    e.preventDefault();
    logOut();
  })

  document.getElementById('user').textContent = `${user.first_name} ${user.last_name} (${user.username}) `;
  document.getElementById('user').appendChild(document.createElement('br'));
  document.getElementById('user').appendChild(link);
}


//Call the logOut function from the APIClient. This function returns a promise.
function logOut() {
  api.logOut().then(() => {
    document.location = './login';
  }).catch(err => {
    console.error('Logout failed', err);
  });
}

api.getCurrentUser().then(user => {
  displayUserInHeader(user);
}).catch(error => {
  console.log(`${error.status}`, error);
  if (error.status == 401) {
    document.location = './login';
  }
});