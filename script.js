const container = document.querySelector("#container");
const resetBtn = document.querySelector("#resetBtn");
const gridSizeBtn = document.querySelector("#gridSizeBtn");
const errorText = document.querySelector(".errorText");

let gridSize = 16;

let boxes = null;

gridSizeBtn.addEventListener("click", () => {
    const newGridSize = prompt("Input a number between 0 and 100");

    if(newGridSize > 100 || newGridSize < 0 || isNaN(newGridSize)){
        errorText.classList.remove("hidden")
        errorText.textContent = "Please input a number between 0 and 100"
        return;
    }

    gridSize = newGridSize

    errorText.classList.add("hidden")

    for (i = 0; i < boxes.length; ++i) {
        boxes[i].remove();
    }
    createGrid();
})


const createGrid = () => {
  for (var x = 0; x < gridSize; x++) {
    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);
    for (var y = 0; y < gridSize; y++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.addEventListener("mouseover", () => box.classList.add("white"));

      if (x == 0) {
        box.classList.add("topRow");
      }
      if (x == gridSize - 1) {
        box.classList.add("bottomRow");
      }
      if (y == 0) {
        box.classList.add("leftColumn");
      }
      if (y == gridSize - 1) {
        box.classList.add("rightColumn");
      }
      row.appendChild(box);
    }
  }
  boxes = Array.from(document.querySelectorAll(".box"));
};

resetBtn.addEventListener("click", () => {
  for (i = 0; i < boxes.length; ++i) {
    boxes[i].classList.remove("white");
  }
});

createGrid();
