const cardNumber = document.getElementById('card-number');
const cardHolderName = document.getElementById('card-holder-name');
const cardNameInput = document.getElementById('card-name-input');
const displayValidity = document.getElementById('validity');
const validityInput = document.getElementById('validity-input');
const cardNumberDiplay = document.querySelectorAll('.card-number-display');
const cvvInput = document.getElementById('cvv');
const cvvDisplay = document.getElementById('cvv-display');
let currentSpanIndex = 0;
//card number
cardNumber.addEventListener('input', () => {
  const inputNumber = cardNumber.value.replace(/\D/g, '');

  cardNumber.value = cardNumber.value.slice(0, 16).replace(/\D/g, '');

  for (let i = 0; i < cardNumberDiplay.length; i++) {
    if (i < inputNumber.length) {
      cardNumberDiplay[i].textContent = inputNumber[i];
    } else {
      cardNumberDiplay[i].textContent = '_';
    }
  }

  if (inputNumber.length <= cardNumberDiplay.length) {
    currentSpanIndex = inputNumber.length;
  } else {
    currentSpanIndex = cardNumberDiplay.length;
  }
});

//name
cardNameInput.addEventListener('input', () => {
  if (cardNameInput.value.length < 1) {
    cardHolderName.innerText = 'Your Name here';
  } else if (cardNameInput.value.length > 30) {
    cardNameInput.value = cardNameInput.value.slice(0, 30);
  } else {
    cardHolderName.innerText = cardNameInput.value;
  }
});
//date
validityInput.addEventListener('input', () => {
  const inputString = validityInput.value;
  if (inputString.length < 1) {
    displayValidity.innerText = '06/28';
    return false;
  }
  const parts = inputString.split('-');
  // Extract year and month values
  const year = parts[0].slice(2);
  const month = parts[1];

  // Final formatted string
  const formattedString = `${month}/${year}`;
  displayValidity.innerText = formattedString;
});
//cvv
cvvInput.addEventListener('input', () => {
  const userInput = cvvInput.value;
  const sanitizedInput = userInput.slice(0, 3);
  const numericInput = sanitizedInput.replace(/\D/g, '');
  cvvInput.value = numericInput;
  cvvDisplay.innerText = numericInput;
});
//flip
cvvInput.addEventListener('click', () => {
  document.getElementById('card').style.transform = 'rotateY(180deg)';
});

window.onload = () => {
  cvvInput.value = '';
  validityInput.value = '';
  cardNameInput.value = '';
  cardNumber.value = '';
};
//re flip the card
document.addEventListener('click', () => {
  if (document.activeElement.id !== 'cvv') {
    document.getElementById('card').style.transform = 'rotateY(0deg)';
  }
});
