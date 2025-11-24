const display = document.getElementById('display');

function displayUserInput(value) {
    // Prevent multiple operators in a row (basic safety)
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/'].includes(value.trim()) && ['+', '-', '*', '/', '.'].includes(lastChar)) {
        return;
    }
    display.value += value;
}

function clearScreen() {
    display.value = '';
}

function calculate() {
    try {
        // Using Function constructor instead of eval for slightly better security
        display.value = Function('"use strict"; return (' + display.value.replace(/×/g, '*').replace(/÷/g, '/') + ')')();
    } catch (e) {
        display.value = 'Error';
        setTimeout(() => { display.value = ''; }, 1500);
    }
}

// Allow keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) displayUserInput(e.key);
    if (e.key === '.') displayUserInput('.');
    if (e.key === '+') displayUserInput(' + ');
    if (e.key === '-') displayUserInput(' - ');
    if (e.key === '*') displayUserInput(' * ');
    if (e.key === '/') { e.preventDefault(); displayUserInput(' / '); }
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Escape' || e.key === 'Delete') clearScreen();
    if (e.key === 'Backspace') display.value = display.value.slice(0, -1);
});