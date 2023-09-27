const cardInput = document.getElementById("cardNumber");
const cardHolder = document.getElementById("cardHolder");
const cardExpiry = document.getElementById("expiryCard");
const cardCvc = document.getElementById("cvCard");
const discountCode = document.getElementById("discountCode");

// Array of the credit cards
const creditCardTypes = [
  {
    name: "Visa",
    regex: /^4[0-9]{12}(?:[0-9]{3})?$/,
    img: "visa.jpeg",
  },
  {
    name: "MasterCard",
    regex: /^[5,2][1-5][0-9]{14}$/,
    img: "mastercard.jpeg",
  },
  {
    name: "American Express",
    regex: /^3[47][0-9]{13}$/,
    img: "ams.jpeg",
  },
  {
    name: "Discover",
    regex: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    img: "discover.jpeg",
  },
  {
    name: "Diners Club",
    regex: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    img: "diners.jpeg",
  },
];

// cardholder's name validtion
const lettersRegex = /^[a-zA-Z_ ]*$/;
function onlyAlphaBetLetters(e) {
  if (e.target.value.match(lettersRegex)) {
    cardHolder.style.borderBottom = "4px solid green";
    return true;
  } else {
    cardHolder.style.borderBottom = "4px solid red";
    return false;
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// how to change the border line of the input and the logo if its the right credit card number
function creditCardInput(e) {
  cardInput.style.borderBottom = "4px solid red";
  creditCardTypes.forEach((cardType) => {
    if (e.target.value.match(cardType.regex)) {
      cardInput.style.borderBottom = "4px solid green";
      cardInput.style.backgroundImage = `url(./images-credit-card/${cardType.img})`;
      return cardType.name;
    }
  });
  cardInput.value = addHyphensToNumber(e.target.value);
}

// split the nubmers with -
function addHyphensToNumber(number) {
  return number.toString().replace(/\B(?=(\d{4})+(?!\d))/g, "-");
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Card Expiary validation
function formatString(event) {
  cardExpiry.style.borderBottom = "4px solid green";
  const inputChar = String.fromCharCode(event.keyCode);
  const code = event.keyCode;
  const allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    cardExpiry.style.borderBottom = "4px solid red";
    return;
  }

  event.target.value = event.target.value
    .replace(
      /^([1-9]\/|[2-9])$/g,
      "0$1/" // 3 > 03/
    )
    .replace(
      /^(0[1-9]|1[0-2])$/g,
      "$1/" // 11 > 11/
    )
    .replace(
      /^([0-1])([3-9])$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
      "$1/$2" // 141 > 01/41
    )
    .replace(
      /^([0]+)\/|[0]+$/g,
      "0" // 0/ > 0 and 00 > 0
    )
    .replace(
      /[^\d\/]|^[\/]*$/g,
      "" // To allow only digits and `/`
    )
    .replace(
      /\/\//g,
      "/" // Prevent entering more than 1 `/`
    );
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Card CVC validation
const cvcRegex = /^[0-9]{3,4}$/;
function onlyNumbers(e) {
  cardCvc.style.borderBottom = "4px solid red";
  if (e.target.value.match(cvcRegex)) {
    cardCvc.style.borderBottom = "4px solid green";
    return true;
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Discount Code validtaion
const discountArray = [
  {
    regex: /^[A-Z]{8,8}/,
  },
  {
    regex: /^[0-9]{2,2}/,
  },
  {
    regex: /^[A-Z]{3,3}/,
  },
];

function discountDisplay(e) {
  discountCode.style.borderBottom = "4px solid red";
  discountArray.forEach((discountArray) => {
    if (e.target.value.match(discountArray.regex)) {
      discountCode.style.borderBottom = "4px solid green";
      return discountArray.regex;
    }
  });
  discountCode.value = addHyphensToString(e.target.value);
}
// split the discount code with -
function addHyphensToString(string) {
  return string.replace(/(\d{7})(\d{2})(\d{3})/, "-");
}

cardInput.addEventListener("change", creditCardInput);
cardHolder.addEventListener("change", onlyAlphaBetLetters);
cardCvc.addEventListener("change", onlyNumbers);
discountCode.addEventListener("change", discountDisplay);
