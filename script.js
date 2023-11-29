// Variable Declarations

const container = document.querySelector('#container');
const errorText = document.querySelector('.errorText');
const resetInkBtn = document.querySelector('#resetInkBtn');
const gridSizeSlider = document.querySelector('#gridSizeSlider');
const gridSizeText = document.querySelector('#gridSizeText');
const rainbowModeCheckbox = document.querySelector('#rainbowMode');
const inkModeCheckbox = document.querySelector('#inkMode');
const hoverModeCheckbox = document.querySelector('#hoverMode');
const holdModeCheckbox = document.querySelector('#holdMode');
const colorSelectInput = document.querySelector('#colorSelect');

const settingsContainer = document.querySelector('.settings');

const clearSlider = document.querySelector('#clearSlider');

const inkAmount = document.querySelector('#inkAmount');

let colorSelect = colorSelectInput.value;
let gridSize = 16;
clearSlider.max = gridSize;
let boxes = null;
let darkStage = 0;
let rainbowMode = false;
let inkMode = false;
let hoverMode = false;
let holdMode = false;

inkAmount.style.width = `${100 - darkStage}%`;
inkAmount.style.backgroundColor = colorSelect;

colorSelectInput.addEventListener('change', () => {
  colorSelect = colorSelectInput.value;
  inkAmount.style.backgroundColor = colorSelect;
});

rainbowModeCheckbox.addEventListener('change', () => {
  rainbowMode = rainbowModeCheckbox.checked;
});

inkModeCheckbox.addEventListener('change', () => {
  inkMode = inkModeCheckbox.checked;
  if (inkMode) {
    darkStage = 0;
    inkAmount.style.width = `${100 - darkStage}%`;
  }
});

hoverModeCheckbox.addEventListener('change', () => {
  hoverMode = hoverModeCheckbox.checked;
  holdModeCheckbox.disabled = hoverModeCheckbox.checked;
  setNewGridSize(gridSize);
});

holdModeCheckbox.addEventListener('change', () => {
  holdMode = holdModeCheckbox.checked;
  hoverModeCheckbox.disabled = holdModeCheckbox.checked;

  setNewGridSize(gridSize);
});

// Helper Functions

const mouseOverHandler = (e, item) => {
  if (hoverMode && e.buttons == 1) return;
  if (holdMode && e.buttons != 1) return;
  if (darkStage == 100) return;

  if (rainbowMode) {
    const R = Math.floor(Math.random() * 256);
    const G = Math.floor(Math.random() * 256);
    const B = Math.floor(Math.random() * 256);
    item.style.backgroundColor = `rgb(${R},${G},${B})`;
    inkAmount.style.backgroundColor = `rgb(${R},${G},${B})`;
  } else {
    item.style.backgroundColor = colorSelect;
    inkAmount.style.backgroundColor = colorSelect;
  }

  if (inkMode) item.style.opacity = `${100 - darkStage}%`;
  if (inkMode) return;

  inkAmount.style.width = `${100 - darkStage}%`;

  item.style.opacity = `${100 - darkStage}%`;
  item.style.borderColor = 'white';
  darkStage += (1 / gridSize) * 25;
  if (darkStage > 100) {
    darkStage = 100;
  }
};

const resetGrid = () => {
  for (i = 0; i < boxes.length; ++i) {
    boxes[i].style.backgroundColor = 'black';
  }
};

const createGrid = () => {
  const rem = (1 / gridSize) * (34.9 - 0.1 * gridSize);

  const sizeString = `${rem}rem`;
  for (var x = 0; x < gridSize; x++) {
    const row = document.createElement('div');
    row.classList.add('row');
    container.appendChild(row);
    for (var y = 0; y < gridSize; y++) {
      const box = document.createElement('div');
      box.classList.add('box');
      box.style.width = sizeString;
      box.style.height = sizeString;
      box.style.border = '0.1rem solid white';
      box.addEventListener(
        hoverMode || holdMode ? 'mouseover' : 'click',
        (e) => {
          mouseOverHandler(e, box);
        }
      );
      row.appendChild(box);
    }
  }
  boxes = Array.from(document.querySelectorAll('.box'));
};

const setNewGridSize = (newGridSize) => {
  gridSize = newGridSize;
  clearSlider.max = gridSize;
  for (i = 0; i < boxes.length; ++i) {
    boxes[i].remove();
  }
  createGrid();
};

// Do something when the clear slider is moved
clearSlider.addEventListener('input', (i) => {
  clearSlider.value = i.target.value;
  // clear the background color of all boxes on the column that the slider is on
  for (i = 0; i < boxes.length; ++i) {
    if (i % gridSize == clearSlider.value) {
      boxes[i].style.backgroundColor = 'black';
      boxes[i].style.opacity = '100%';
    }
  }
});
resetInkBtn.addEventListener('click', () => {
  darkStage = 0;
  inkAmount.style.width = `${100 - darkStage}%`;
  inkAmount.style.backgroundColor = colorSelect;
});
gridSizeSlider.addEventListener('mouseup', (i) => {
  setNewGridSize(i.target.value);
});

gridSizeSlider.addEventListener('input', (i) => {
  gridSizeText.textContent = `${i.target.value} x ${i.target.value}`;
});

// Hotkeys

document.addEventListener('keydown', function (event) {
  if (event.key === 'r' || event.key === 'R') {
    darkStage = 0;
    inkAmount.style.width = `${100 - darkStage}%`;
    inkAmount.style.backgroundColor = colorSelect;
  }
  if (event.key === 'g' || event.key === 'G') {
    resetGrid();
  }
  if (event.key === 'Escape') {
    settingsContainer.classList.toggle('hidden');
  }
});

createGrid();
