// Variable Declarations

const container = document.querySelector("#container");
const resetBtn = document.querySelector("#resetBtn");
const gridSizeBtn = document.querySelector("#gridSizeBtn");
const errorText = document.querySelector(".errorText");
const resetInkBtn = document.querySelector("#resetInkBtn");
let gridSize = 16;
let boxes = null;
let darkStage = 0;

// Helper Functions

const mouseOverHandler = (item) => {
  if (darkStage == 100) return;
  const R = Math.floor(Math.random() * 256);
  const G = Math.floor(Math.random() * 256);
  const B = Math.floor(Math.random() * 256);
  item.style.backgroundColor = `rgb(${R},${G},${B})`;
  item.style.opacity = `${100 - darkStage}%`;
  item.style.borderColor = "white";
  darkStage += 5;
  if (darkStage > 100) {
    darkStage = 100;
  }
};

const resetGrid = () => {
  for (i = 0; i < boxes.length; ++i) {
    boxes[i].style.backgroundColor = "black";
  }
};

const isWrongInput = (input) => {
  if (input > 100 || input < 0 || isNaN(input) || input === "") {
    return true;
  }
  return false;
};

const createGrid = () => {
  for (var x = 0; x < gridSize; x++) {
    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);
    for (var y = 0; y < gridSize; y++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.addEventListener("mouseover", () => {
        mouseOverHandler(box);
      });
      row.appendChild(box);
    }
  }
  boxes = Array.from(document.querySelectorAll(".box"));
};

const setNewGridSize = () => {
  const newGridSize = prompt("Input a number between 0 and 100");

  if (isWrongInput(newGridSize)) {
    errorText.classList.remove("hidden");
    errorText.textContent = "Please input a number between 0 and 100";
    return;
  }

  errorText.classList.add("hidden");
  gridSize = newGridSize;
  for (i = 0; i < boxes.length; ++i) {
    boxes[i].remove();
  }
  createGrid();
};

gridSizeBtn.addEventListener("click", () => {
  setNewGridSize();
});

resetInkBtn.addEventListener("click", () => (darkStage = 0));

document.addEventListener("keydown", function (event) {
  if (event.key === "r" || event.key === "R") {
    darkStage = 0;
  }
  if (event.key === "g" || event.key === "G") {
    resetGrid();
  }
  if (event.key === "s" || event.key === "S") {
    setNewGridSize();
  }
});

createGrid();

resetBtn.addEventListener("click", () => resetGrid());
