// #<-----------------------------QUESTION----------------------------->

// Get score variable from the URL query parameter
var URLparameter = new URLSearchParams(window.location.search);
var encodedSelector = URLparameter.get("selector");

// decode the score and correct values from URI
let selector = decodeURIComponent(encodedSelector);

console.log(selector)

let solution;
let count = 0;
let score = 0;
let correct = 0;

function gen(){

  let index;

  // Declare a start time at which the question is generated.

  // declare variables

  let dummy1, dummy2, dummy3;
  let number_attempts = 20;

  if (selector == 1){
    index = 1;
  }
  else if (selector == 2){
    index = 2;
  }
  else if (selector == 3){
    index = 3;
  }
  else if (selector == 4){
    //generate a random index which determines the arithmetic type.
    index = Math.floor(Math.random() * 3) + 1;
  }

  // generate two random components
  let num1 = Math.floor(Math.random() * 10) + 5;
  let num2 = Math.floor(Math.random() * 10) + 5;

  // declare a variable for the solution for each question
  let solution;

  // generating values for a subtraction problem
  if (index == 1){
    // print arithmetic type onto html page
    document.getElementById("index").innerHTML = "+";

    // generation solution
    solution = num1 + num2;

    // generate 3 incorrect answers whilst making sure they do not equal the solution by accident/ have answers that are the same

    let answers = new Set();

    for (let i = 0; i < number_attempts; i++){
      dummy1 = Math.floor(Math.random() * 20) + 10;
      dummy2 = Math.floor(Math.random() * 20) + 10;
      dummy3 = Math.floor(Math.random() * 20) + 10;

      if (dummy1 === solution || dummy2 === solution || dummy3 === solution){
        continue;
      }

      answers.clear();
      answers.add(dummy1);
      answers.add(dummy2);
      answers.add(dummy3);
      break;

      if (answers.size === 3){
        return [dummy1, dummy2, dummy3];
      }
      return [dummy1, dummy2, dummy3];
    }

  // generating values for a subtraction problem
  }
  else if (index == 2){
    // print arithmetic type onto html page
    document.getElementById("index").innerHTML = "-";

    // generation solution
    solution = num1 - num2;
    // creating a for loop to make sure that the dummy variables do not equal the solution accidentally.
    let answers = new Set();

    for (let i = 0; i < number_attempts; i++){
      dummy1 = Math.floor(Math.random() * 24) - 10;
      dummy2 = Math.floor(Math.random() * 24) - 10;
      dummy3 = Math.floor(Math.random() * 24) - 10;

      if (dummy1 === solution || dummy2 === solution || dummy3 === solution){
        continue;
      }
      // if the dummy variables satisfy this condition they will then be added to the answers Set, and then returned.

      answers.clear();
      answers.add(dummy1);
      answers.add(dummy2);
      answers.add(dummy3);
      break;

      if (answers.size === 3){
        return [dummy1, dummy2, dummy3];
      }
      return [dummy1, dummy2, dummy3];
    }

  }
  else if (index == 3){
    // print arithmetic type onto html page
    document.getElementById("index").innerHTML = "x";

     // generation solution
     solution = num1 * num2;

    let answers = new Set();

    for (let i = 0; i < number_attempts; i++){
      dummy1 = Math.floor(Math.random() * 200) + 25;
      dummy2 = Math.floor(Math.random() * 200) + 25;
      dummy3 = Math.floor(Math.random() * 200) + 25;

      if (dummy1 === solution || dummy2 === solution || dummy3 === solution){
        continue;
      }

      answers.clear();
      answers.add(dummy1);
      answers.add(dummy2);
      answers.add(dummy3);
      break;

      if (answers.size === 3){
        return [dummy1, dummy2, dummy3];
      }
      return [dummy1, dummy2, dummy3];
    }

  }
  // figure out what to do if dummy == solution /////////////////////////////////////////////////////

  let arr1 = [dummy1, dummy2, dummy3, solution];

  let randomize_arr1 = arr1.sort(() => (Math.random() > .5) ? 1 : -1);
  console.log(randomize_arr1)

  // identifying each variable to put inserted into the html page.
  document.getElementById("num1").innerHTML = num1;
  document.getElementById("num2").innerHTML = num2;

  document.getElementById("option1").innerHTML = randomize_arr1[0].toString();
  document.getElementById("option2").innerHTML = randomize_arr1[1].toString();
  document.getElementById("option3").innerHTML = randomize_arr1[2].toString();
  document.getElementById("option4").innerHTML = randomize_arr1[3].toString();

}
  // event listener for clicking one of four options.
  const optionElements = document.querySelectorAll('.choices');

  // Attach a click event listener to each option element
  optionElements.forEach((optionElement) => {
    optionElement.addEventListener('click', () => {
    //get data attributes from the webpage and then compare them to the answer clicked i.e option1 == solution?
    const number1 = parseInt(document.getElementById('num1').innerText);
    const number2 = parseInt(document.getElementById('num2').innerText);
    const operation = document.getElementById('index').innerText;

    let check_solution;
    if (operation == "+"){
      check_solution = number1 + number2;
    }
    else if (operation == "-"){
      check_solution = number1 - number2;
    }
    else if (operation == "x"){
      check_solution = number1 * number2;
    }

    const selectedOption = parseInt(optionElement.innerText);
    // query selectors for score value
    const scoreGreen = document.querySelector('.fade-text-green');
    const scoreRed = document.querySelector('.fade-text-red');



    if (selectedOption == check_solution){
        let valueContainer = document.querySelector(".value-container");
        // when the button is clicked take the displayed value and then add it to the current score.
        let points = parseInt(valueContainer.textContent);
        // score text will flash green if the answer is correct!
        scoreGreen.classList.add('animateScoreGreen');

        console.log(points);
        clearInterval(interval)
        progress()
        gen()
        count += 1;
        correct += 1;
        score += points;
        console.log(check_solution)
        console.log(correct)
        console.log(count)
        console.log("correct")
        // tried to add this but realized u had to add a timeout first before removing the animation
        setTimeout(() => {
          scoreGreen.classList.remove('animateScoreGreen');
        }, 800);
    }
    else if (selectedOption != check_solution){
      // score text will flash red if the answer is incorrect!
        scoreRed.classList.add('animateScoreRed')
        clearInterval(interval)
        progress()
        count += 1;
        console.log(check_solution)
        console.log(correct)
        console.log(count)
        console.log("incorrect")
        gen()
        setTimeout(() => {
          scoreRed.classList.remove('animateScoreRed');
        }, 800);
    }

    document.getElementById("score").innerHTML = score;

    if (count > 9) {
      // quiz completes after 10 questions have been answered.
      //The encodeURIComponent() function encodes a URI (Uniform Resource Identifier) by replacing each instance of certain
      //characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the
      //character (will only be four escape sequences for characters composed of two surrogate characters).
      var encodedScore = encodeURIComponent(score);
      var encodedCorrect = encodeURIComponent(correct);
      let selector1 = selector
      var encodedSelector = encodeURIComponent(selector);
      // Redirect to next flask route + export the score variable to end.js
      window.location.href = "/end?score=" + encodedScore + '&correct='+ encodedCorrect +'&selector=' + encodedSelector;
      document.getElementsByClassName('custom-btn')[0].style.visibility='hidden';
    }

  });
});


//  POINT COUNTDOWN //

let interval;

  function progress() {
    // Clear the existing interval and refresh
    clearInterval(interval)

    let progressBar = document.querySelector(".circular-progress");
    let valueContainer = document.querySelector(".value-container");

    let progressValue = 100;
    let progressEndValue = 0;
    let duration = 10; // countdown time in seconds
    let speed = duration * 1000 / progressValue; // calc speed based on the duration and progressValue

    interval = setInterval(() => {
      progressValue--;
      valueContainer.textContent = `${progressValue} points`;
      progressBar.style.background = `conic-gradient(
        #4d5bf9 ${progressValue * 3.6}deg,
        #cadcff ${progressValue * 3.6}deg
      )`;
      // if you run out of time it automatically counts it as an incorrect answer and a new question is generated.
      if (progressValue == progressEndValue) {
        clearInterval(interval)
        progress()
        count+= 1;
        gen();

      }
      if (count > 9) {
        var encodedScore = encodeURIComponent(score);
        var encodedCorrect = encodeURIComponent(correct);
        let selector1 = selector
        var encodedSelector = encodeURIComponent(selector);
        // Redirect to next flask route + export the score variable to end.js
        window.location.href = "/end?score=" + encodedScore + '&correct='+ encodedCorrect +'&selector=' + encodedSelector;
        document.getElementsByClassName('custom-btn')[0].style.visibility='hidden';
      }
    }, speed);
  }


gen();
progress();