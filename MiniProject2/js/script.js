

const buttons = document.querySelectorAll('.ops button');

buttons.forEach(button => {
    button.addEventListener('click', function () {
        attach(button.value);
    });
});

// appends the number
function attach(numb) {
    var completeN = document.getElementById('ans');
    completeN.value += numb;
}

var enter = document.getElementById("enter");
enter.onclick = answer;

//when = is clicked, solve and log result in history
function answer() {
    var num = document.getElementById('ans').value;

    try {
        //check for last operator if multiple are consecutive 
        var temp = num;
        let curr = num[0];
        let prev;

        var operators = '+-*/x';
        for (let i = 1; i < num.length; i++) {
            curr = num[i];
            prev = num[i - 1];
            
            if (operators.includes(curr) && operators.includes(prev)) {
                temp = temp.slice(0, i - 1) + temp.slice(i, temp.length);
                // console.log("temp: " + temp);
                break;
            }
        }
        
        num = temp;
        // Number(num2);
        // switch statement look for operators
        // convert string to int with that Number()

        var num2 = eval(num.replace('x', '*'));
        document.getElementById('ans').value = num2;
    } catch {
        //Error if not numbers
        document.getElementById('ans').value = 'Error';
    }

    //log answer in history
    var buttons = document.getElementById("contain");
    var ansB = document.createElement("button");

    //get the answer and attach it to the button
    var node = document.createTextNode(document.getElementById('ans').value);
    ansB.appendChild(node);

    //attach button to the contain div
    ansB.onclick = onbuttonclicked;
    buttons.appendChild(ansB);

    //attach to screen 
    function onbuttonclicked() {
        console.log("Num " + num);
        if (onbuttonclicked ) {
            attach(ansB.innerHTML);
        }
    }

    var clearH = document.getElementById("clr");
    clearH.onclick = clearHistory;
    
    function clearHistory() {
        while (buttons.firstChild) {
            buttons.removeChild(buttons.firstChild);
        }
    }

}

var clear = document.getElementById("clear");
clear.onclick = clear;

// clear calc screen to account for clicking C
function clear() {
    var num = document.getElementById('ans');
    // console.log("num " + num.value);
    num.value = '';
}

//account for using keyboard for entering input
document.addEventListener('keydown', function (event) {
    const key = event.key;
    
    if (key === 'Enter') {
        answer();
    } else if (key.toUpperCase() === 'C') {
        clear();
    } 
});
