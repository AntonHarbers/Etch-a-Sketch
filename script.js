// Variable Declarations

const container = document.querySelector("#container");
const resetBtn = document.querySelector("#resetBtn");
const errorText = document.querySelector(".errorText");
const resetInkBtn = document.querySelector("#resetInkBtn");
const gridSizeSlider = document.querySelector("#gridSizeSlider");
const gridSizeText = document.querySelector("#gridSizeText");
const rainbowModeCheckbox = document.querySelector("#rainbowMode");
const inkModeCheckbox = document.querySelector("#inkMode");
const hoverModeCheckbox = document.querySelector("#hoverMode");
const colorSelectInput = document.querySelector('#colorSelect');

let colorSelect = colorSelectInput.value;
let gridSize = 16;
let boxes = null;
let darkStage = 0;
let rainbowMode = false;
let inkMode = false;
let hoverMode = false;

colorSelectInput.addEventListener('change', () => {
  colorSelect = colorSelectInput.value;
});

rainbowModeCheckbox.addEventListener("change", () => {
  rainbowMode = rainbowModeCheckbox.checked;
});

inkModeCheckbox.addEventListener("change", () => {
  inkMode = inkModeCheckbox.checked;
  if(inkMode){
    darkStage = 0;
  }
});

hoverModeCheckbox.addEventListener("change", () => {
  hoverMode = hoverModeCheckbox.checked;
  setNewGridSize(gridSize)
});

// Helper Functions

const mouseOverHandler = (item) => {
  if (darkStage == 100) return;

  if (rainbowMode) {
  const R = Math.floor(Math.random() * 256);
  const G = Math.floor(Math.random() * 256);
  const B = Math.floor(Math.random() * 256);
  item.style.backgroundColor = `rgb(${R},${G},${B})`;
  }else{
    item.style.backgroundColor = colorSelect;
  }

  if (inkMode) return;
  item.style.opacity = `${100 - darkStage}%`;
  item.style.borderColor = "white";
  darkStage += 1/gridSize * 100;
  if (darkStage > 100) {
    darkStage = 100;
  }
};

const resetGrid = () => {
  for (i = 0; i < boxes.length; ++i) {
    boxes[i].style.backgroundColor = "black";
  }
};

const createGrid = () => {
  for (var x = 0; x < gridSize; x++) {
    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);
    for (var y = 0; y < gridSize; y++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.style.width = `${(1/gridSize)*35}rem`;
      box.style.height = `${(1/gridSize)*35}rem`;
      box.addEventListener(hoverMode ? "mouseover" : "click", () => {
        mouseOverHandler(box);
      });
      row.appendChild(box);
    }
  }
  boxes = Array.from(document.querySelectorAll(".box"));
};

const setNewGridSize = (newGridSize) => {
  gridSize = newGridSize;
  for (i = 0; i < boxes.length; ++i) {
    boxes[i].remove();
  }
  createGrid();
};

resetInkBtn.addEventListener("click", () => (darkStage = 0));
gridSizeSlider.addEventListener("mouseup", (i) => {
  setNewGridSize(i.target.value);
});

gridSizeSlider.addEventListener("input", (i) => {
  gridSizeText.textContent = `${i.target.value} x ${i.target.value}`;
});

// Hotkeys

document.addEventListener("keydown", function (event) {
  if (event.key === "r" || event.key === "R") {
    darkStage = 0;
  }
  if (event.key === "g" || event.key === "G") {
    resetGrid();
  }
});

createGrid();

resetBtn.addEventListener("click", () => resetGrid());
