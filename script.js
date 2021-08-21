// ---Calculator App---

let screen = document.querySelector("#number");

// Main variables
let current_value = "";
let value_1 = null;
let value_2 = null;
let operation_type = null;
let answer = null;

// Check if it is a number
function isNumber(value) 
{
   return typeof value === 'number' && isFinite(value);
}

// Clear the screen
function clear() {
    screen.innerHTML = "";
}

// Reset
function reset() {
    clear();
    current_value = "";
    value_1 = null;
    value_2 = null;
    operation_type = null;
    answer = null;
}

// Display Error 
function errorDisplay(err) {
    reset();
    switch (err) {
        case 1:
            screen.innerHTML = "Value is not a number";
            break;
        case 2:
            screen.innerHTML = "Invalid Operation";
            break;
        case 3:
            screen.innerHTML = "Type Expression";
            break;
        default:
            screen.innerHTML = "Invalid";
    }
}

// Check if a float number was typed
function isFloatNum(value) {
    if (typeof(value) !== "string") value = String(value);

    if (value.includes(".")) return true;
    return false;
}

// Display current value on the screen
function displayValue(value) {
    if (isNumber(value) && String(value).length > 14) value = value.toExponential(6);

    value = String(value);

    let sign = "";
    // If there is a sign ignore adding commas
    if (value[0] === "-" || value[0] === "+") {
        sign = value[0];
        value = value.slice(1);
    }

    // If it is a float number ignore commas after the dot
    let after_dot = "";
    if (isFloatNum(value)) {
        let dot_id = value.indexOf(".");
        after_dot = value.slice(dot_id);
        value = value.slice(0, dot_id);
    }

    let displayed_value = value;

    // Add commas every 3 characters
    if (value.length >= 4) {
        for (let i = value.length - 1; i >= 0; i--) {
            if (i % 3 === 0 && i != 0) displayed_value = displayed_value.slice(0, -i) + "," + displayed_value.slice(-i);
        }
    }
    // Display 
    screen.innerHTML = sign + displayed_value + after_dot;
}

// Delete the last typed symbol
document.querySelector(".del").addEventListener("click", () => {
    if (screen.innerHTML.length < 1 && operation_type === null || answer !== null) reset();

    if (current_value === "0.") current_value = "";
    else current_value = current_value.slice(0, -1);
    
    displayValue(current_value);
});

// Convert into number
function toNum(value) {
    let parsed;
    if (isFloatNum(value)) {
        parsed = parseFloat(value);
        if (!isNumber(parsed)) errorDisplay(1);
    }
    else {
        parsed = parseInt(value, 10);
        if (!isNumber(parsed)) errorDisplay(1);
    }
    return parsed;
}

// Type a dot only once
document.querySelector("#dot").addEventListener("click", () => {
    if (screen.innerHTML.length < 1 || answer !== null || screen.innerHTML === operation_type){
        if (answer !== null) reset();
        current_value = "0.";
    }
    else if (!isFloatNum(current_value) && current_value.length < 15) current_value += ".";
    else return;

    displayValue(current_value);
});


function press(event) {
    let trigger = event.srcElement;

    // Automatically reset for the next operation when typed number after answer 
    if (answer !== null) reset();

    // Do not type more than 15 characters 
    if ((current_value.length === 15 && !isFloatNum(current_value)) || (current_value.length === 16 && isFloatNum(current_value))) {
        return;
    }
    // Automaticaally add ".", when 0 pressed first
    if (current_value.length < 1 && trigger.innerHTML.trim() === "0") current_value += "0.";
    else current_value += trigger.innerHTML.trim();

    // Display current value
    displayValue(current_value);
}

// Operation event
function operation(event) {
    // If value_1 is already set, run equals first (in case there are more than one operations)
    if (value_1 !== null) {
        equals();
    }

    let trigger = event.srcElement;
    // Set operation type
    operation_type = trigger.innerHTML.trim();
    // Show it
    screen.innerHTML = trigger.innerHTML;

    // If there was previous answer, set it as value 1 for the next operation
    if (answer !== null) {
        value_1 = answer;
        answer = null;
    }
    // Otherwise set value 1 to current value
    else if (current_value.length >= 1) {
        value_1 = toNum(current_value);
    }
    // If current value is not set, when sign pressed add it as sign for the current value
    else if (trigger.innerHTML === "-" || trigger.innerHTML === "+") {
       if (trigger.innerHTML === "-") current_value += "-";
       else current_value += "+";
       return;
    }

    // Update current value
    current_value = "";
}

// = Equals sign =
function equals() {
    // If value 1 is not set display error
    if (value_1 === null) {
        errorDisplay(3);
        return;
    }

    // When equals pressed when answer displayed, display answer
    if (answer !== null) {
        displayValue(answer);
        return;
    }

    // Set second value
    value_2 = toNum(current_value);
    console.log(value_1);
    console.log(value_2);

    // Check if there are float numbers
    if (isFloatNum(value_1) || isFloatNum(value_2)) {
        // Using big.js library to avoid problems with decimal math in JS 
        // BIG.JS library by Michael Mclaughlin
        // https://github.com/MikeMcl/big.js/LICENCE.md
        var x = Big(value_1);
    }


    // Calculate
    switch (operation_type) {
        case "+":
            if (isFloatNum(value_1) || isFloatNum(value_2)) answer = Number(x.plus(value_2).valueOf());
            else answer = value_1 + value_2;

            displayValue(answer);
            break;
        case "-":
            if (isFloatNum(value_1) || isFloatNum(value_2)) answer = Number(x.minus(value_2).valueOf());
            else answer = value_1 - value_2;

            displayValue(answer);
            break;
        case "/":
            if (value_2 === 0) {
                errorDisplay(2);
                return;
            }
            if (isFloatNum(value_1) || isFloatNum(value_2)) answer = Number(x.div(value_2).valueOf());
            else answer = value_1 / value_2;

            displayValue(answer);
            break;
        case "x":
            if (isFloatNum(value_1) || isFloatNum(value_2)) answer = Number(x.times(value_2).valueOf());
            else answer = value_1 * value_2;

            displayValue(answer);
            break;
        default:
            errorDisplay(3);
    }
    // Update current value
    current_value = "";
}
