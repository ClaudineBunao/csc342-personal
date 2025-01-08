const keys = ['firstName', 'lastName', 'email', 'isStudent'];

const values = [
  ['Stuart', 'Dent', 'student@ncsu.edu', true],
  ['Grace', 'Duate', 'graduate@ncsu.edu', false],
  ['Facundo', 'Ulty', 'faculty@ncsu.edu', false],
];

// Write code to convert the above arrays into an array of objects
const result = values.map((item, index) => {  //for every item in values assign value to field
                                              //item is one student, index is which student
  // console.log(item[0]);
  let student = {
    firstName: item[0],
    lastName: item[1],
    email: item[2],
    isStudent: item[3]
  }
  // let student = [item[0],item[1],item[2],item[3]]; //doesn't include the field names

  return student;
})


// const test = values.map((item,index) => {
//   let user = {};
//   for (let i = 0; i <keys.length; i++){
//       user[keys[i] = item[i]];
      
//   }
//   return user;
// })


// console.log(test);

// Print the array of objects to the console
console.log(result);

/* Expected output: //a map
[
  {
    firstName: 'Stuart',
    lastName: 'Dent',
    email: 'student@ncsu.edu',
    isStudent: true
  },
  {
    firstName: 'Grace',
    lastName: 'Duate',
    email: 'graduate@ncsu.edu',
    isStudent: false
  },
  {
    firstName: 'Facundo',
    lastName: 'Ulty',
    email: 'faculty@ncsu.edu',
    isStudent: false
  }
]
*/