const canvas = document.getElementById('balloonCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const base = './images/';
const balloons = [];
//random number generator
const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

//Balloon
function Balloon(image, x, y, width) {
  this.image = new Image();
  this.image.src = image;
  this.x = x;
  this.y = y;
  this.speed = generateRandomNumber(1, 5);
  this.width = width;
  //move balloon
  this.update = () => {
    this.y -= this.speed;
    if (this.y + this.width < 0) {
      //replace the balloon which crossed the screen with a new balloon
      let index = balloons.indexOf(this);
      let randomBalloon = generateRandomNumber(1, 3);

      const randomImage = `${base}flags-0${randomBalloon}.png`;
      const randomX = generateRandomNumber(0, canvas.width);
      const balloonWidth = generateRandomNumber(100, 200);
      balloons[index] = new Balloon(
        randomImage,
        randomX,
        canvas.height,
        balloonWidth
      );
    }
  };
  //draw balloon
  this.draw = () => {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.width);
  };
}
//Create a new balloon
function createRandomBalloon() {
  //only 10 balloons
  if (balloons.length < 10) {
    //random color
    let randomBalloon = generateRandomNumber(1, 3);
    const randomImage = `${base}flags-0${randomBalloon}.png`;
    const randomX = generateRandomNumber(0, canvas.width);
    const balloonWidth = generateRandomNumber(100, 200);
    let balloon = new Balloon(
      randomImage,
      randomX,
      canvas.height,
      balloonWidth
    );
    balloons.push(balloon);
  }
}
//animation
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const balloon of balloons) {
    balloon.update();
    balloon.draw();
  }
  requestAnimationFrame(animate);
}

// Set interval to create balloons
let randomCreationTime = generateRandomNumber(3, 10);
setInterval(createRandomBalloon, randomCreationTime * 1000);

window.onload = () => {
  createRandomBalloon();
  animate();
};
