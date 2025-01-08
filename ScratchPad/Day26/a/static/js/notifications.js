const myName = localStorage.getItem('name');

/*****\
* GUI *
\*****/
function testNotification(titleText, bodyText) {
  const options = {
    body: bodyText,
    icon: '/img/chat-icon.svg'
  };

  new Notification(titleText, options);

}
const notifyButton = document.querySelector("#notify");
notifyButton.addEventListener("click", () => {
  if (Notification.permission == "granted") {
    testNotification("Test Chat Notification", "This is a test notification. We already have permission to show these.");
    return;
  } else {
    Notification.requestPermission().then((permission) => {
      console.log(permission);
      if (permission === 'granted') {
        testNotification("Example Chat Notification", "This is what a notification will look like.");
      }
    });
  }
});


const btnSubscribe = document.querySelector("#subscribe");
btnSubscribe.addEventListener('click', (event) => {
  // Send the subscription details to the server
  // The existing subscriptions will be sent in case it changed
  // We're sending the name of the user to identify the subscription
  subscribeToPush(myName);
});



/********************\
* PUSH NOTIFICATIONS *
\********************/
const PUSH_PUBLIC_KEY = 'BPfVld8nBvv9EvkyjQD7eYDJStRXBN5ONYRAEQsehmKh5yOuCOnH41YeomwRW02BWyxtetQjLfRJPRK8eB1eKcw';

function subscribeToPush(name) {
  // Check if service workers are supported in the browser
  if (!navigator.serviceWorker) {
    return;
  }
  navigator.serviceWorker.ready.then(registration => {    //outer promise
    // Code to obtain a subscription to push notifications
    return registration.pushManager.getSubscription() //try get current subscription if we have it
      .then(existingSubscription => {
        // Code to subscribe to push notifications
        if (existingSubscription) {
          return existingSubscription;
        } else {
          return registration.pushManager.subscribe({
            userVisibleOnly: true, //Our push notifications will be visible to the user
            applicationServerKey: PUSH_PUBLIC_KEY
          });
        }

      });
  }).then(subscription => {
    console.log('Subscribing to push notifications: ', subscription);
    fetch("/subscribe", {
      method: "POST",
      headers:{"Content-type":"application/json"},
      body: JSON.stringify({
        username: name,
        subscription: subscription
      }),
    });
  }).catch(err => {
    console.log(err);
  });

};
