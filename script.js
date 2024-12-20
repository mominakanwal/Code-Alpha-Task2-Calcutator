let currentNumber = '';
let previousNumber = '';
let operation = null;
let isDarkMode = false;

// Appends numbers or a decimal to the current input
function appendNumber(number) {
    if (number === '.' && currentNumber.includes('.')) return; // Prevent multiple decimals
    currentNumber += number;
    updateDisplay();
}

// Sets the operation (e.g., +, -, *, /, %)
function setOperation(op) {
    if (currentNumber === '') return;
    if (previousNumber !== '') calculate();
    operation = op;
    previousNumber = currentNumber;
    currentNumber = '';
}

// Clears the display and resets all variables
function clearDisplay() {
    currentNumber = '';
    previousNumber = '';
    operation = null;
    updateDisplay();
}

// Deletes the last entered digit
function deleteDigit() {
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay();
}

// Calculates the result of the operation
function calculate() {
    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    if (isNaN(prev) || isNaN(current)) {
        displayError("Invalid Input");
        return;
    }

    try {
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) throw "Division by Zero";
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }

        currentNumber = result.toString();
        operation = null;
        previousNumber = '';
        updateDisplay();
    } catch (error) {
        displayError(error);
    }
}

// Updates the calculator display
function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = currentNumber || '0';
}

// Displays error messages
function displayError(message) {
    const display = document.getElementById('display');
    display.textContent = `Error: ${message}`;
    setTimeout(() => updateDisplay(), 2000); // Clear error after 2 seconds
}

// Toggles dark mode
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
}

// Add event listener for dark mode toggle
document.getElementById('toggle-theme').addEventListener('click', toggleDarkMode);
