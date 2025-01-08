// CONSOLE

// console.log('Hello World!');

// TRUTHY AND FALSY

// if(20) {
//   console.log("20 is truthy");
// }

// console.log('20 == "20" is', 20 == "20", ', but 20 === "20" is', 20 === "20" );
//truthy, reg comparison == compare values
//fully strict comparison, === truthy and compare types

//0 is falsey but not false, string '0' is == falsey but not === false

// console.log("'0'==false is", '0' == false, ", but '0'===false is", '0' === false);

// INT AND BIG INT

// let n = 9007199254740991;
// console.log(n);
// console.log(n + 1);
// console.log(n + 2);

// n = 9007199254740991n;
// console.log(n);
// console.log(n + 1n);
// console.log(n + 2n);
// console.log(BigInt(9007199254740991));

// ARRAYS

// let arr = [1, 2, 3, 'other'];
// console.log(arr);

//  for (const element of arr) {
//   console.log(`${element}`, element); //strings printed white
//  }

// arr[50] = 'whaaa';
// console.log(arr);

// for (const element of arr) {
//   console.log(`${element}`, element);
// }

// arr.length = 2; //truncates the array, pretends like other elements don't exist

// console.log(arr);

// arr.length = 3; //can't recover the prev items in list
// console.log(arr); 

// SEMICOLONS

// const s = 'World';
// const ab = "Hello" + s;
// [3].forEach(n => console.log(n));

//without ; the terminal thinks you're saying const ab = "Hello" + s[3].forEach(n => console.log(n));
//char string doesn't have a for each function 
// console.log(ab);


// OBJECTS

let obj = {
  "name": 'some name',   //prop can be expressed with quotes
  property: 3.14         //but it doesn't need quotes
};

// for (const prop in obj) {
//   console.log(`${prop} = ${obj[prop]}`);
// }

let newobj = {
    'nested': {
        "other": 123,
        more: obj
    }

};
console.log(newobj.nested['more']);
// console.log(newobj.nested.other);
