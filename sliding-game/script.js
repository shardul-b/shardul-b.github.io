const moves = document.getElementById('moves');
const container = document.querySelector('.container');
let currentElement = '';
let movesCount,
  imagesArr = [];
let initialX = 0,
  initialY = 0;
const is_touch_device = () => {
  try {
    //We try to create TouchEvent (it would fail for desktops and throw error)
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
};
//random number for image
const randomNumber = () => Math.floor(Math.random() * 8) + 1;

const getCoords = (element) => {
  const [row, col] = element.getAttribute('data-position').split('_');
  return [parseInt(row), parseInt(col)];
};
//row1,col1 are image co-ordinates while row2 and col2 are blank space co-ordinates
const checkAdjacent = (row1, row2, col1, col2) => {
  if (row1 == row2) {
    if (col2 == col1 - 1 || col2 == col1 + 1) {
      return true;
    }
  } else if (col1 == col2) {
    if (row2 == row1 - 1 || row2 == row1 + 1) {
      return true;
    }
  }
  return false;
};
//fill array with random values for images
const randomImages = () => {
  while (imagesArr.length < 8) {
    let randomVal = randomNumber();
    if (!imagesArr.includes(randomVal)) {
      imagesArr.push(randomVal);
    }
  }
  imagesArr.push(9);
};
//generate grid
const gridGenerator = () => {
  let count = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let div = document.createElement('div');
      div.setAttribute('data-position', `${i}_${j}`);
      div.addEventListener('dragstart', dragStart);
      div.addEventListener('dragover', dragOver); 
      div.addEventListener('drop', drop); 
      div.addEventListener('touchstart', dragStart, false);
      div.addEventListener('touchmove', drop, false);
      div.classList.add('image-container');
      div.innerHTML = `<img src="./images/image_part_00${imagesArr[count]}.png"  class="image" data-index="${imagesArr[count]}"/>`;
      count += 1;
      container.appendChild(div);
    }
  }
};
const dragStart = (e) => {
  initialX = is_touch_device() ? e.touches[0].clientX : e.clientX;
  initialY = is_touch_device() ? e.touches[0].clientY : e.clientY;
  //set currentElement
  currentElement = e.target;
};
const dragOver = (e) => {
  e.preventDefault();
};
//drop the image
const drop = (e) => {
  e.preventDefault();
  let newX = is_touch_device() ? e.touches[0].clientX : e.clientX;
  let newY = is_touch_device() ? e.touches[0].clientY : e.clientY;
  //set targetElement (where we drop the picked element).. It is based on mouse position
  let targetElement = document.elementFromPoint(newX, newY);
  let currentParent = currentElement.parentElement;
  let targetParent = targetElement.parentElement;

  //get row and col values for both elements
  const [row1, col1] = getCoords(currentParent);
  const [row2, col2] = getCoords(targetParent);

  //Check if the target is blank
  if (targetElement.getAttribute('src').includes('009')) {
    if (checkAdjacent(row1, row2, col1, col2)) {
      //swap
      currentElement.remove();
      targetElement.remove();
      let currentIndex = parseInt(currentElement.getAttribute('data-index'));
      let targetIndex = parseInt(targetElement.getAttribute('data-index'));
      currentElement.setAttribute('data-index', targetIndex);
      targetElement.setAttribute('data-index', currentIndex);
      currentParent.appendChild(targetElement);

      targetParent.appendChild(currentElement);
      let currentArrIndex = imagesArr.indexOf(currentIndex);
      let targetArrIndex = imagesArr.indexOf(targetIndex);
      [imagesArr[currentArrIndex], imagesArr[targetArrIndex]] = [
        imagesArr[targetArrIndex],
        imagesArr[currentArrIndex],
      ];
      if (imagesArr.join('') == '123456789') {
        alert('You Won');
      } else {
        console.log(imagesArr.join(''));
      }
      movesCount += 1;
      moves.innerText = `Moves: ${movesCount}`;
    }
    // alert('YES');
  } else {
    console.log('No');
  }

};
window.onload = () => {
  imagesArr = [];
  randomImages();
  gridGenerator();
  movesCount = 0;
  moves.innerText = `Moves: ${movesCount}`;
};