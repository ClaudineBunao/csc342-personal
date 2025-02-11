const darkModeToggle = document.querySelector('.menu input');

const DARK_MODE_KEY = 'darkMode';

// Handle dark mode toggle
darkModeToggle.addEventListener('change', e => {
  if (e.target.checked) {
    document.body.classList.add('dark');
    localStorage.setItem(DARK_MODE_KEY, 1);
  }
  else {
    document.body.classList.remove('dark');
    localStorage.setItem(DARK_MODE_KEY, 0);
  }

});

// Restore dark mode setting
if (localStorage.getItem(DARK_MODE_KEY) === "1") {
  darkModeToggle.checked = true;
  document.body.classList.add('dark');
}




/*********************\
* SERVICE WORKER CODE *
\*********************/

function registerServiceWorker() {

  if (!navigator.serviceWorker) { // Are SWs supported?
    return;
  }

  navigator.serviceWorker.register('/serviceWorker.js')
    .then((registration) => {
      registration.addEventListener('updatefound', () => { //This is fired whenever registration.installing gets a new worker
        console.log("SW update found", registration, navigator.serviceWorker.controller);
        newServiceWorkerReady(registration.installing);
      });
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed, but waiting');
        newServiceWorkerReady(registration.waiting); // Show prompt to user
      } else if (registration.active) {
        console.log('Service worker active');
      }

      
    })
    .catch(error => {
      console.error(`Registration failed with error: ${error}`);
    });

  navigator.serviceWorker.addEventListener('message', event => {
    console.log('Message from service worker:', event.data);
  });


  // Ensure refresh is only called once.
  // This works around a bug in "force update on reload" in dev tools.
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });

};

registerServiceWorker();


function newServiceWorkerReady(worker) {
  const popup = document.createElement('div');
  popup.className = "popup";
  popup.innerHTML = '<div>New Version Available</div>';

  const buttonOk = document.createElement('button');
  buttonOk.innerHTML = 'Update';
  buttonOk.addEventListener('click', e => {
    worker.postMessage({ action: 'skipWaiting' });
  });
  popup.appendChild(buttonOk);

  const buttonCancel = document.createElement('button');
  buttonCancel.innerHTML = 'Dismiss';
  buttonCancel.addEventListener('click', e => {
    document.body.removeChild(popup);
  });
  popup.appendChild(buttonCancel);

  document.body.appendChild(popup);
}