const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "pen";
const DEFAULT_SIZE = 50;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

////function setCurrentSize(newSize) {
//  currentSize = newSize;
//}

const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");
const resetBtn = document.getElementById("resetBtn");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const container = document.getElementById("container");

colorPicker.onchange = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode("pen");
rainbowBtn.onclick = () => setCurrentMode("rainbow");
eraserBtn.onclick = () => setCurrentMode("eraser");
resetBtn.onclick = () => reset();
//sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
//sizeSlider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
container.onmousedown = function (e) {
  if (e.button != 0) return;
  mouseDown = true;
};
document.onmouseup = () => (mouseDown = false);
container.addEventListener("contextmenu", (event) => event.preventDefault());

document.getElementById("resetBtn").addEventListener("click", reset);

function createPixel(size) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const div = document.createElement("div");
      div.className = "box";
      div.addEventListener("mouseover", changeColor);
      div.addEventListener("mousedown", changeColor);
      container.appendChild(div);
    }
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (e.button === 2 || e.button === 1) return;
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "pen") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#fefefe";
  }
}

function reset() {
  container.innerHTML = "";
  createPixel(currentSize);
}

function activateButton(newMode) {
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "pen") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }

  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (newMode === "pen") {
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
}

createPixel(currentSize);
