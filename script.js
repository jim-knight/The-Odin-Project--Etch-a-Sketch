const sketchContainer = document.getElementById('sketch-container');
const pixels = document.querySelectorAll('.pixel');
const btnSetGrid = document.getElementById('set-grid');
const btnGrayscale = document.getElementById('grayscale');
const btnRainbow = document.getElementById('rainbow');

const DEFAULT_PIXEL_COUNT = 16;
const DEFAULT_COLOR_MODE = 'grayscale';
const rainbow = ['FF0000', 'FF7F00', 'FFFF00', '00FF00', '0000FF', '4B0082', '9400D3'];

let currentPixelCount = DEFAULT_PIXEL_COUNT;
let currentColorMode = DEFAULT_COLOR_MODE;

function updateSize(newPixelCount) {
	if (!newPixelCount) {
		currentPixelCount = currentPixelCount;
		return;
	} else if (newPixelCount > 64) {
		return alert(`Your selected value of ${newPixelCount} is too high!`);
	}
	currentPixelCount = newPixelCount;
}

// Create the grid based on either initial pixel count or provided by user.
function createGrid(pixelCount) {
	// Reset
	pixels.forEach((el) => el.remove());

	// Set pixel count for rows and columns
	sketchContainer.style.gridTemplateRows = `repeat(${pixelCount}, 1fr)`;
	sketchContainer.style.gridTemplateColumns = `repeat(${pixelCount}, 1fr)`;

	// Rebuild the pixels within our sketch container
	for (let i = 0; i < pixelCount * pixelCount; i++) {
		let pixel = document.createElement('div');
		pixel.classList.add('pixel');
		pixel.addEventListener('mouseover', changePixelColor);
		sketchContainer.appendChild(pixel);
	}
}
createGrid(DEFAULT_PIXEL_COUNT);

// Change grid size
function changeSize(newPixelCount) {
	updateSize(newPixelCount);
	// Used to display current grid size on the front end
	// updateSizeValue(newPixelCount)
	reloadSketch();
}

// Clears the sketch container and rebuilds the grid
function reloadSketch() {
	clearSketch();
	createGrid(currentPixelCount);
}
function clearSketch() {
	sketchContainer.innerHTML = '';
}

// Event listeners

// Mark pixel with color where hovered
function changePixelColor(e) {
	if (currentColorMode === 'rainbow') {
		// Create random color
		const randRainbow = rainbow[Math.floor(Math.random() * rainbow.length)];
		e.target.style.backgroundColor = `#${randRainbow}`;
	} else {
		e.target.style.backgroundColor = `rgba(0,0,0,0.5)`;
	}
	setTimeout(() => {
		e.target.classList.remove('pressed-rainbow' || 'pressed-');
	}, 1000);
}
btnSetGrid.addEventListener('click', () => {
	pixelCount = prompt('Set your new grid size, no higher than 64 please.');
	changeSize(pixelCount);
});

// Change color mode on click
btnGrayscale.addEventListener('click', (e) => {
	currentColorMode = 'grayscale';
	e.target.classList.add('active');
	btnRainbow.classList.remove('active');
});
btnRainbow.addEventListener('click', (e) => {
	currentColorMode = 'rainbow';
	e.target.classList.add('active');
	btnGrayscale.classList.remove('active');
});
