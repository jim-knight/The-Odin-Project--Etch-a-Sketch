const sketchContainer = document.getElementById('sketch-container');
let pixelCount = 16;

// Create the grid based on either initial pixel count or provided by user.
function createGrid(pixelCount) {
	sketchContainer.style.setProperty('--grid-rows', pixelCount);
	sketchContainer.style.setProperty('--grid-cols', pixelCount);

	for (let i = 0; i < pixelCount * pixelCount; i++) {
		let pixel = document.createElement('div');

		sketchContainer.appendChild(pixel).className = 'pixel';
	}
}
createGrid(32);
