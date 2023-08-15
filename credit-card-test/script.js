let cardNumber = document.getElementById('card-number');
let creditcard = document.querySelector('.credit-card');
let cardName = document.getElementById('card-name');
let validDate = document.getElementById('valid-date');
let cardCvc = document.getElementById('card-cvc');
const flipContainer = document.querySelector('#credit-card-container');
let displayExpiryDate = document.getElementById('display-card-date');
let cvcHolder = document.getElementById('display-cvc-holder');
const errorMessage = document.getElementById('error-message');
const spanElements = document.querySelectorAll('#span-container span');
let currentSpanIndex = 0;

//card number
cardNumber.addEventListener('input', () => {
  const inputNumber = cardNumber.value.replace(/\D/g, '');

  cardNumber.value = cardNumber.value.slice(0, 16).replace(/\D/g, '');

  for (let i = 0; i < spanElements.length; i++) {
    if (i < inputNumber.length) {
      spanElements[i].textContent = inputNumber[i];
    } else {
      spanElements[i].textContent = '.'; // Reset to original format
    }
  }

  if (inputNumber.length <= spanElements.length) {
    currentSpanIndex = inputNumber.length;
  } else {
    currentSpanIndex = spanElements.length;
  }

  if (inputNumber.length > 0) {
    flipContainer.classList.add('bg-color');
  } else {
    flipContainer.classList.remove('bg-color');
  }
});

//name
cardName.addEventListener('input', () => {
  document.getElementById('dispaly-card-name').value = cardName.value;
});
//date
validDate.addEventListener('input', () => {
  const inputString = validDate.value;
  const parts = inputString.split('-');
  // Extract year and month values
  const year = parts[0].slice(2);
  const month = parts[1];

  // Final formatted string
  const formattedString = `${month} /${year}`;
  displayExpiryDate.value = formattedString;
});
//cvv
cardCvc.addEventListener('input', () => {
  const userInput = cardCvc.value;
  const sanitizedInput = userInput.slice(0, 3);
  const numericInput = sanitizedInput.replace(/\D/g, ''); // Remove non-numeric characters
  cardCvc.value = numericInput;
  cvcHolder.value = numericInput;
});
