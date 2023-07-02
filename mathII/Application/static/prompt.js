// #<-----------------------------QUESTION----------------------------->

let selector;

const addition = document.querySelector('#addition');
addition.addEventListener('click', () => {
  selector = 1;
  var encodedSelector = encodeURIComponent(selector);
  window.location.href = "/question?selector=" + encodedSelector;
});

const subtraction = document.querySelector('#subtraction');
subtraction.addEventListener('click', () => {
  selector = 2;
  var encodedSelector = encodeURIComponent(selector);
  window.location.href = "/question?selector=" + encodedSelector;
});

const multiplication = document.querySelector('#multiplication');
multiplication.addEventListener('click', () => {
  selector = 3;
  var encodedSelector = encodeURIComponent(selector);
  window.location.href = "/question?selector=" + encodedSelector;
});

const everything = document.querySelector('#everything');
everything.addEventListener('click', () => {
  selector = 4;
  var encodedSelector = encodeURIComponent(selector);
  window.location.href = "/question?selector=" + encodedSelector;
});



