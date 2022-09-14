const btnSetGrid = document.getElementById('set-grid');
const sketchContainer = document.getElementById('sketch-container');
const pixels = document.querySelectorAll('.pixel');

const DEFAULT_PIXEL_COUNT = 16;
let currentPixelCount = DEFAULT_PIXEL_COUNT;

function updateSize(newPixelCount) {
	if (newPixelCount > 64) {
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
function changePixelColor(e) {
	e.target.classList.add('pressed');
	setTimeout(() => {
		e.target.classList.remove('pressed');
	}, 1000);
}
btnSetGrid.addEventListener('click', () => {
	pixelCount = prompt('Set your new grid size, no higher than 64 please.');
	changeSize(pixelCount);
});
