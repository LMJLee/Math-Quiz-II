  // Get score variable from the URL query parameter
  var URLparameter = new URLSearchParams(window.location.search);
  var encodedScore = URLparameter.get("score");
  var URLparameter1 = new URLSearchParams(window.location.search);
  var encodedCorrect = URLparameter1.get("correct")
  var URLparameter3 = new URLSearchParams(window.location.search);
  var encodedSelector = URLparameter3.get("selector");

  // decode the score and correct values from URI Componet;
  var score = decodeURIComponent(encodedScore);
  var correct = decodeURIComponent(encodedCorrect);
  var selector = decodeURIComponent(encodedSelector);

  document.getElementById("score").innerHTML = score;
  document.getElementById("correct").innerHTML = correct;


  console.log(selector);
  console.log(score);
  console.log(JSON.stringify(score))
  console.log(correct);

  const replay = document.querySelector('#playagain');
  replay.addEventListener('click', () =>{
    window.location.href = '/prompt';
  });




// save score to database


// Send score to Flask route
  document.querySelector('#savescore').addEventListener('click', function(event) {
    event.preventDefault();
    fetch('/savescore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        score: score,
        selector: selector
      })

    })
    .then(response => {
      // handle response
      window.location.href = '/leaderboard';
    })
    .catch(error => {
      // handle error
    });
  });
