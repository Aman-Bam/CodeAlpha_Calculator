let currentInput = "0";
let previousInput = "";
let operator = "";
let waitingForNewInput = false;
let calculationHistory = [];
let soundEnabled = true;

const display = document.getElementById("display");
const historyDisplay = document.getElementById("history");
const historyPanel = document.getElementById("historyPanel");

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency = 800, duration = 100, type = "sine") {
  if (!soundEnabled) return;

  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + duration / 1000
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  } catch (e) {}
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const soundToggle = document.querySelector(".sound-toggle");
  soundToggle.textContent = soundEnabled ? "🔊" : "🔇";
  playSound(soundEnabled ? 900 : 400, 150);
}

function updateDisplay() {
  const formattedNumber = formatNumber(currentInput);
  display.textContent = formattedNumber;

  if (formattedNumber.length > 10) {
    display.style.fontSize = "32px";
  } else if (formattedNumber.length > 8) {
    display.style.fontSize = "40px";
  } else {
    display.style.fontSize = "48px";
  }
}

function formatNumber(num) {
  if (num === "Error") return num;

  const number = parseFloat(num);
  if (isNaN(number)) return "0";

  if (Math.abs(number) >= 1e10 || (Math.abs(number) < 1e-6 && number !== 0)) {
    return number.toExponential(6);
  }

  if (number % 1 === 0 && Math.abs(number) < 1e10) {
    return number.toLocaleString();
  }

  return number.toString();
}

function inputNumber(num) {
  playSound(600, 80);
  animateButton(event?.target || document.querySelector(`[data-key="${num}"]`));

  if (waitingForNewInput) {
    currentInput = num;
    waitingForNewInput = false;
  } else {
    currentInput = currentInput === "0" ? num : currentInput + num;
  }

  updateDisplay();
}

function inputDecimal() {
  playSound(700, 80);
  animateButton(event?.target || document.querySelector('[data-key="."]'));

  if (waitingForNewInput) {
    currentInput = "0.";
    waitingForNewInput = false;
  } else if (currentInput.indexOf(".") === -1) {
    currentInput += ".";
  }

  updateDisplay();
}

function inputOperator(op) {
  playSound(800, 100);
  animateButton(event?.target || document.querySelector(`[data-key="${op}"]`));

  document
    .querySelectorAll(".operator")
    .forEach((btn) => btn.classList.remove("active"));

  if (previousInput && !waitingForNewInput) {
    calculate();
  }

  previousInput = currentInput;
  operator = op;
  waitingForNewInput = true;

  updateHistory(`${formatNumber(previousInput)} ${getOperatorSymbol(op)}`);

  const operatorBtn = document.querySelector(
    `[onclick="inputOperator('${op}')"]`
  );
  if (operatorBtn) operatorBtn.classList.add("active");
}

function getOperatorSymbol(op) {
  const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };
  return symbols[op] || op;
}

function calculate() {
  if (!operator || !previousInput) return;

  playSound(900, 150);
  animateButton(event?.target || document.querySelector('[data-key="Enter"]'));

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        currentInput = "Error";
        display.classList.add("error");
        setTimeout(() => {
          display.classList.remove("error");
          clearAll();
        }, 2000);
        updateDisplay();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  const calculation = `${formatNumber(previousInput)} ${getOperatorSymbol(
    operator
  )} ${formatNumber(currentInput)} = ${formatNumber(result.toString())}`;
  addToHistory(calculation);

  currentInput = result.toString();
  operator = "";
  previousInput = "";
  waitingForNewInput = true;

  updateDisplay();
  updateHistory("");

  document
    .querySelectorAll(".operator")
    .forEach((btn) => btn.classList.remove("active"));
}

function clearAll() {
  playSound(400, 120);
  animateButton(event?.target);

  currentInput = "0";
  previousInput = "";
  operator = "";
  waitingForNewInput = false;

  updateDisplay();
  updateHistory("");

  document
    .querySelectorAll(".operator")
    .forEach((btn) => btn.classList.remove("active"));
}

function clearEntry() {
  playSound(500, 100);
  animateButton(event?.target);

  currentInput = "0";
  updateDisplay();
}

function toggleSign() {
  playSound(650, 100);
  animateButton(event?.target);

  if (currentInput !== "0" && currentInput !== "Error") {
    currentInput = currentInput.startsWith("-")
      ? currentInput.slice(1)
      : "-" + currentInput;
    updateDisplay();
  }
}

function updateHistory(text) {
  historyDisplay.textContent = text;
}

function addToHistory(calculation) {
  calculationHistory.unshift(calculation);
  if (calculationHistory.length > 10) {
    calculationHistory.pop();
  }
  updateHistoryPanel();
}

function updateHistoryPanel() {
  historyPanel.innerHTML = calculationHistory
    .map(
      (calc) =>
        `<div class="history-item" onclick="selectHistoryItem('${calc}')">${calc}</div>`
    )
    .join("");
}

function selectHistoryItem(calculation) {
  const result = calculation.split(" = ")[1];
  if (result) {
    currentInput = result.replace(/,/g, "");
    waitingForNewInput = true;
    updateDisplay();
    hideHistory();
  }
}

function showHistory() {
  historyPanel.classList.add("show");
}

function hideHistory() {
  historyPanel.classList.remove("show");
}

function animateButton(button) {
  if (button) {
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 150);
  }
}

document.addEventListener("keydown", (e) => {
  e.preventDefault();

  const key = e.key;

  if (key >= "0" && key <= "9") {
    inputNumber(key);
  } else if (key === ".") {
    inputDecimal();
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    inputOperator(key);
  } else if (key === "Enter" || key === "=") {
    calculate();
  } else if (key === "Escape" || key === "c" || key === "C") {
    if (e.shiftKey || key === "C") {
      clearAll();
    } else {
      clearEntry();
    }
  } else if (key === "Backspace") {
    if (currentInput.length > 1) {
      currentInput = currentInput.slice(0, -1);
    } else {
      currentInput = "0";
    }
    updateDisplay();
  }
});

display.addEventListener("click", () => {
  if (calculationHistory.length > 0) {
    historyPanel.classList.toggle("show");
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".display-container")) {
    hideHistory();
  }
});

updateDisplay();
