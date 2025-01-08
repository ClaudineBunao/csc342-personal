const inputField = document.querySelector("input");

console.log(inputField);

function restrictInput(e){
    console.log(e.key);
    
    if (!/^[A-Z]$/.test(e.key) ){
        console.log("regex true for", e.key);
        e.preventDefault();
    } 
    // if ('A' <= e.key && e.key <= 'Z'){
    //     console.log("regex true for", e.key);
    //     e.preventDefault();
    // }
}

// inputField.addEventListener('keydown', e = restrictInput, input);
inputField.addEventListener('keydown', restrictInput);
