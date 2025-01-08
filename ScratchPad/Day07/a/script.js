// console.log(clear);

const toggle = document.querySelector("#darkModeToggle");
console.log(toggle);


function toggleDarkMode(e){
    console.log(e.target.checked);
    if (e.target.checked){
        document.querySelector("html").style.filter = "invert(1)"
    } else {
        document.querySelector("html").style.filter = "invert(0)"
    }
    
}
toggle.addEventListener('change', e = toggleDarkMode, darkModeToggle);
//first param is a string, second is a callback