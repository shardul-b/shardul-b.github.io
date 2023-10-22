//Number of fruits
const FRUIT_COUNT = 10;

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');
const coverScreen = document.querySelector('.cover-screen');
const result = document.getElementById('result');
const overText = document.getElementById('over-text');

const base = './images/';
let fruits = [];
let points = 0;
const fruitsList = ['apple', 'banana', 'grapes'];
//events object
let events = {
  mouse: {
    down: 'mousedown',
  },
  touch: {
    down: 'touchstart',
  },
};
let deviceType = '';
let interval, randomCreationTime;
//Detect touch device
const isTouchDevice = () => {
  try {
    //We try to create TouchEvent (it would fail for desktops and throw error)
    document.createEvent('TouchEvent');
    deviceType = 'touch';
    return true;
  } catch (e) {
    deviceType = 'mouse';
    return false;
  }
};
//random number generator
const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

//Fruit
function Fruit(image, x, y, width) {
  this.image = new Image();
  this.image.src = image;
  this.x = x;
  this.y = y;
  this.speed = generateRandomNumber(1, 5);
  this.width = width;
  this.clicked = false;
  this.complete = false;
  //move fruit
  this.update = () => {
    this.y += this.speed;
    if (!this.complete && this.y + this.width > canvas.height) {
      this.complete = true;
    }
  };
  //draw fruit
  this.draw = () => {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.width);
  };
  this.compare = (mouseX, mouseY) => {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.width
    );
  };
}
//Create a new fruit
function createRandomFruit() {
  //set random time for next fruit
  randomCreationTime = generateRandomNumber(3, 9);
  //only 10 fruits
  if (fruits.length < FRUIT_COUNT) {
    //random index from fruitsList
    let randomFruit =
      fruitsList[generateRandomNumber(0, fruitsList.length - 1)];
    //random image from images (based on names in fruitsList array)
    const randomImage = `${base}${randomFruit}.png`;
    //random x position
    const randomX = generateRandomNumber(0, canvas.width - 50);
    //random image width
    const fruitWidth = generateRandomNumber(100, 200);
    //create fruit and push in fruits array
    let fruit = new Fruit(randomImage, randomX, 0, fruitWidth);
    fruits.push(fruit);
  }
  if (fruits.length == FRUIT_COUNT) {
    //check if all fruits have crossed screen
    let checker = fruits.every((fruit) => {
      return fruit.complete == true;
    });
    if (checker) {
      //display game over and clear interval
      clearInterval(interval);
      coverScreen.classList.remove('hide');
      canvas.classList.add('hide');
      overText.classList.remove('hide');
      result.innerText = `Final score: ${points}`;
      startButton.innerText = 'Restart Game';
    }
  }
}
//animation
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const fruit of fruits) {
    fruit.update();
    fruit.draw();
  }
  requestAnimationFrame(animate);
}

isTouchDevice();

canvas.addEventListener(events[deviceType].down, function (e) {
  let clickX =
    (isTouchDevice() ? e.touches[0].pageX : e.pageX) - canvas.offsetLeft;
  let clickY =
    (isTouchDevice() ? e.touches[0].pageY : e.pageY) - canvas.offsetTop;
  fruits.forEach(function (fruit) {
    let check = fruit.compare(clickX, clickY);
    console.log(check);
    if (check && !fruit.clicked) {
      fruit.clicked = true;
      points += 1;
      fruit.complete = true;
      fruit.y = canvas.height;
    }
  });
});

canvas.addEventListener('touchend', (e) => {
  e.preventDefault();
});

startButton.addEventListener('click', () => {
  fruits = [];
  points = 0;
  canvas.classList.remove('hide');
  coverScreen.classList.add('hide');
  createRandomFruit();
  animate();
  // Set interval to create fruits
  randomCreationTime = generateRandomNumber(3, 9);
  interval = setInterval(createRandomFruit, randomCreationTime * 1000);
});
