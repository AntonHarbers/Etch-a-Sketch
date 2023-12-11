# The Odin Project - Etch a Sketch

An Ecth a Sketch game built for the odin project using html, css and javascript.

[Live Link](https://antonharbers.github.io/Odin-Etch-a-Sketch/)

![Screenshot of the Etch a Sketch App](/images/repoImage.png)

## Folder Structure

```
    /.git           -> git repository
    /images         -> contains favicon and repo image
    /styles
        styles.css  -> contains all the styles
    index.html      -> contains all the html
    README.md       -> git repo README
    script.js       -> contains functionality code
```

## Key Concepts

### Dom Manipulation

This project is a great Introduction to DOM Manipulation using Javascript. A good example of this would be when creating the Etch a Sketch Grid in the following code:

JS:

```
    const createGrid = () => {
        for (var x = 0; x < gridSize; x++) {
            const row = initRow();
            container.appendChild(row);
            for (var y = 0; y < gridSize; y++) {
            const box = initBox(sizeString);
            row.appendChild(box);
            }
        }
    };

    const initRow = () => {
        const row = document.createElement('div');
        row.classList.add('row');
        return row;
    };

    const initBox = (sizeString) => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = sizeString;
        box.style.height = sizeString;
        box.style.border = '0.1rem solid white';
        box.addEventListener(hoverMode || holdMode ? 'mouseover' : 'click', (e) => {
            mouseOverHandler(e, box);
        });
        return box;
    };
```

The createGrid() method calls the initRow() and initBox() functions to create dom elements, apply classes and styles to them and then append these dom elements to the html. Programatically generating DOM elements is a great way to keep HTML code clean and combine the UI with the logic from the get go by storing and using these DOM elements as variables in your code.

### Styling Inputs

Another new concept that I tackled in this project was the concept and syntax of selecting and styling input elements in CSS.

CSS:

```
    input[type='range'] {
    appearance: none;
    -webkit-appearance: none;
    width: 15rem;
    height: 7px;
    background: rgba(255, 255, 255, 0.523);
    border-radius: 5px;
    }

    input[type='range']::-webkit-slider-thumb {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: #ffffff;
    cursor: ew-resize;
    transition: background 0.3s ease-in-out;
    }

    input[type='range']::-webkit-slider-runnable-track {
    box-shadow: none;
    border: none;
    background: transparent;
    }
```

Using the [type='range'] after the input selector allows us to classify exactly what kind of input is to be selected. The 'range' string can be replaced with the correct parameter for the given use case.

The ::-webkit- following the type brackets allows us to select individual components of a given input field (in this case the thumb and the track of a range input) and apply specific styles to these. For the correct selector for your specific use case google or chatgpt are good resources to find what you need quickly.

### Grids with Loops

One Cool idea that I cemented with this project was using 2 dimensional loops in order to create a 2D grid on the screen:

JS:

```
    const createGrid = () => {
        for (var x = 0; x < gridSize; x++) {
            const row = initRow();
            container.appendChild(row);
            for (var y = 0; y < gridSize; y++) {
            const box = initBox(sizeString);
            row.appendChild(box);
            }
        }
    };
```

The createGrid function takes the grid size and loops through it once and then again for every iteration of the first loop. This allows easy construction of a 2D grid (and potentially higher order dimension grids) where the loop counter variables can also be used to help set the on screen position of all grid objects. Really interesting.

### Helper Functions

This was the first real project in the odin project curriculum for which the code became a little unmanageable towars the end. What helped immesely was keeping things structured and breaking down repetative similar code into smaller helper functions to be called where needed. This not only saved space, increased efficiency but improves the readability and understanding of the code base:

JS:

```
    const random256 = () => {
        return Math.floor(Math.random() * 256);
    };
```

A simple example would be the random256() method which returns a random int for the RGB colors of Rainbow mode. Its easier to read:

JS:

```
    let RGB = [random256(), random256(), random256()]
```

than it is to read:

JS:

```
    let RGB = [Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256)]
```

This might be a trivial example but when compounding these simple refactorings the overall code base becomes much more pleasant to work with.

## Final Notes

Overall this was a great learning project and has lots of potential to be added onto in the future when learning newer concepts. It was the first odin project assigment where I fealt like refactoring was needed and not just a good add on. I have some good ideas for future improvements and look forward to implementing those.
