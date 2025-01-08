console.clear();    //starts output fresh

// SYNC

// function fetchSync(URL) { //simulating request not using natural
//     let result;
//     console.log('1. Open connection to ' + URL);
//     console.log('2. Send request');
//     console.log('3. Receive and parse response');
//     result = {body: "It works!", status: 200};
//     return result;
// }

// console.log('Work before request');
// console.log('Response', fetchSync('https://ncsu.edu'));
// console.log('Work after request');

//Prints this: 
// Work before request
// 1. Open connection to https://ncsu.edu
// 2. Send request
// 3. Receive and parse response
// Response { body: 'It works!', status: 200 }
// Work after request



// ASYNC 1

// function fetchAsync(URL) {
//     let result;
//     setTimeout(() => {  //cues the func for executing for 5 sec in future after execution request
//         console.log('Async 1.1. Open connection to ' + URL);
//         console.log('Async 1.2. Send request');
//         console.log('Async 1.3. Receive and parse response');
//         result = {body: "It works!", status: 200};  //no way to get this try using a callback see next ex
//     }, 5000);

//     return result;
// }

// console.log('Work before request');
// console.log('Response', fetchAsync('https://ncsu.edu')); //not async
// console.log('Work after request');

// Prints:
// Work before request
// Response undefined
// Work after request
//  (waits 5 seconds)
// Async 1.1. Open connection to https://ncsu.edu
// Async 1.2. Send request
// Async 1.3. Receive and parse response



// ASYNC 2 (WITH CALLBACK)

function fetchAsync2(URL, callback) {   //callback(x) is a func
    let result;
    setTimeout(() => {
        console.log('Async 2.1. Open connection to ' + URL);
        console.log('Async 2.2. Send request');
        console.log('Async 2.3. Receive and parse response');
        result = {body: "Async 2 It works!", status: 200};
        callback(result);
    }, 5000);

    return result;
}

function onResult(result) {
    console.log("Async 2 result received", result);
}

console.log('Async 2 Work before request');
console.log('Async 2 Response', fetchAsync2('https://ncsu.edu', onResult));
console.log('Async 2 Work after request');

// Async 2 Work before request
// Async 2 Work before request
// Async 2 Response undefined
// Async 2 Work after request
// Async 2.1. Open connection to https://ncsu.edu
// Async 2.2. Send request
// Async 2.3. Receive and parse response
// Async 2 result received { body: 'Async 2 It works!', status: 200 }
