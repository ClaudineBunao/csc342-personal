const array1 = [1, 2, 3, 4, 5];


// TASK 1: Functional Array Iteration

// Your function here
function printArray() {
    array1.forEach((item, index) => {
        console.log(`The value at the position ${index} is ${item}`);
    })
}

printArray(array1);


// TASK 2: Operating on Array Elements

// Your function here
const squareArray = (arr) => {
    return arr.map((val) => {
        return val * val
    })
}


console.log(squareArray(array1));


// TASK 3: Filtering Array Elements

// Your function here
const filterArray = (arr) => {
    return arr.filter((val) => {         //return arr.filter((val)=> val % 2) === 0 ??
        // if (val % 2 == 0) {
        //     return true;
        // }
        // return false;
        return !(val % 2);
    })
}

console.log(filterArray(array1));


// TASK 4: Reducing Arrays

// Your function here

// const sumArray = (arr) => {
//     return arr.reduce((acc,val) => {
//         return //smth accumulator/sum and curr val of array
//     }, 0);
//     //callbackfn, 0 is start of accumulator, initial value, for sum
// }

const sumArray = (arr) => {
    return arr.reduce(
        (acc, val) => acc + val,
        0,
    );
}
console.log(sumArray(array1));


// TASK 5: Chaining Array Methods

// Your function here
const chainArray = (arr) => {
    
        let x = arr.filter((val) => {
            if ((val % 2) == 0) {    
                return val * val;
            }
        })
        let y = x.map((val) => {
            return val * val
        })
        // return y;
        return y.reduce(
            (acc, val) => acc + val,
            0,
        ); 


}

console.log(chainArray(array1));

