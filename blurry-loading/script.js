//JS
const imageElement = document.getElementById('image');
const numberElement = document.getElementById('number');
let count = 0;
const maxCount = 100;

const incrementLoader = () => {
  // Check if 'count' is less than 'maxCount'
  if (count < maxCount) {
    count++;
    // Update the text content of 'numberElement' with the current count
    numberElement.textContent = count + '%';
    // Calculate the opacity as a ratio of 'count' to 'maxCount'
    const opacity = count / maxCount;
    imageElement.style.opacity = opacity;
    // Set a blur filter on 'imageElement' with an amount that decreases as 'opacity' increases
    imageElement.style.filter = `blur(${10 - 10 * opacity}px)`;
  } else if (count === maxCount) {
    clearInterval(loaderInterval);
    numberElement.textContent = '';
  }
};

const loaderInterval = setInterval(incrementLoader, 60);
