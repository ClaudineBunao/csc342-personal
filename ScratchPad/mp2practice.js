var completeN;

// appends the number
function Attach(num) {
    completeN = document.getElementById('ans');

    var lastChar = completeN.value[completeN.value.length - 1];
    
    // console.log(lastChar + " " + num);

    // var operators = '+-*/';
    // console.log(lastChar + " " + num);
    
    // if (operators.includes(lastChar) && operators.includes(num)){
    //     console.log("here " +completeN.value.slice(0, -1));
    //     completeN.value = completeN.value.slice(0, -1);
    // } 
    completeN.value += num;

}

const element = document.getElementById("enter");
element.addEventListener("click", Answer);

var timesCalled = 0;

function Answer() {
    // document.getElementById("p").innerHTML = completeN.value;
    var num = document.getElementById('ans').value;
    console.log("num: " + num);
    timesCalled++;
    console.log("times called: " + timesCalled);

    try {
        //acount for both * and x as multiply
        var temp = num;
        let curr = num[0];
        let prev;
        var operators = '+-*/';
        for (let i = 1; i < num.length; i++) {
            curr = num[i];
            prev = num[i - 1];
            if (operators.includes(curr) && operators.includes(prev)) {
                temp = temp.slice(0, i - 1) + temp.slice(i, temp.length);
                console.log("temp: " + temp);
                break;
            }
        }
        num = temp;
        var num2 = eval(num.replace('x', '*'));
        document.getElementById('ans').value = num2;
    } catch {
        document.getElementById('ans').value = 'Error';
    }

    if (timesCalled == 2) {
        //create another button
        var doc = document.getElementsByClassName(log);
        var div = document.createElement("div");
        var ansB = document.createElement(doc.button);
        // console.log("num: " + num);
        // console.log("num2: " + num2);
        var node = document.createTextNode(num);
        ansB.appendChild(node);
        // var div = document.getElementsByClassName(log);
        div.appendChild(ansB);
        doc.appendChild(div);
        timesCalled = 0;
    }
}

function Clear() {
    var num = document.getElementById('ans');
    num.value = '';
}

document.addEventListener('keydown', function (event) {
    const key = event.key;
    
    if (key === 'Enter') {
        Answer();
    } else if (key.toUpperCase() === 'C') {
        Clear();
    } 
 });


 //js history using divs

    // //create div
    // var ansB = document.createElement("div");

    // //attach value to div
    // var node = document.createTextNode(document.getElementById('ans').value);
    // ansB.appendChild(node);
    // console.log("node " + node);

    // //attach div with text to the p tag in html div log history section
    // var div = document.getElementById("p");
    // div.appendChild(ansB);

    // ansB.setAttribute("id", "History");
    // // const element = document.getElementById("history");
    // console.log("ele " + document.getElementById("History"));
    // // element.addEventListener("click", Answer);
    // ansB.addEventListener("click", function () {
    //     alert('click');
    // });
    
// function onbuttonclicked() {

//     var buttonsCount = buttons.length;
//     for (var i = 0; i <= buttonsCount; i += 1)
//         buttons[i].onclick = function(e) {
//             alert(this.id);
//             ansB.style.backgroundColor = "red";
//         }
// }




    // //set the id of the new button
    // ansB.setAttribute("id", "b");


// function onbuttonclicked() {
//     if (onbuttonclicked) {
//         // console.log("(" + ansB.id + ")");
//         // console.log("inner " + ansB.innerHTML);
//         Attach(ansB.innerHTML);
//         // ansB.style.backgroundColor = "red";
//         // ansB.disabled = true;
//     }
// }




// // // //clears the history log 
// function ClearHistory() {
//     var buttons = document.getElementById('b');
//     // var buttons = document.getElementById("clear");

// //     //TODO getElementById get the 
//     // var buttons = document.getElementById("b");

//     buttons.style.backgroundColor = "red";
//     // ansB.disabled = true;


// // const btns = document.getElementById('b');
// // btns.disabled = true;

// // // const log = document.querySelectorAll('#b');
// // btns.forEach(btn=>{
// //     btn.style.display = "none";
// //  })

// // console.log("log " + log);
// // const elementToRemove = document.querySelector('#b');

// // log.remove();

// //     var num = document.getElementById('contain');
// //     console.log("p " + num.value);

// //     num.value = '';
// }