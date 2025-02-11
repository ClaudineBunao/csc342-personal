console.clear();

/**
 * DO NOT MODIFY THIS FUNCTION 
 */
// function fetchWithCallback(URL, callback) {
//   let result;
//   setTimeout(() => {
//       result = {body: `fetchWithCallback of ${URL}`, status: 200};
//       callback(result);
//   }, 5000);
//   return true;
// }

function onResult(result) {
  console.log("3. Fetch Result", result);
}


/**
 * ADD YOUR CODE NEXT
 */
function fetch(URL) {
  return new Promise((resolve, reject) => {
    if (URL === null) {
      console.log('reject')
      reject({err})
    }
    setTimeout(() => {
      resolve({ body: `fetch of ${URL}!`, status: 200 } );  //backticks for obj
    }, 1000);
  });
}


/**
 * TEST CASE
 */

console.log('1. Work before request');

/**
 * TODO: Replace fetchWithCallback here with your new fetch function
 * and print the result using console.log("3. Fetch Result", result);
*/
// fetch('https://ncsu.edu').then(result => { // function called with resolve as param
//   console.log("3. Fetch Result", result);
// })


fetch('https://ncsu.edu').then(onResult) //null
.catch(err => {
  console.error("Error in promise")
});

console.log('2. Work after request');

/*
 * Expected output:
 * 1. Work before request
 * 2. Work after request
 * 3. Fetch Result { body: `fetch of ${URL}`, status: 200 }
 */