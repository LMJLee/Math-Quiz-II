
// This function takes in the username from the webpage and checks if the Current user has followed the user.
  function FollowOrUnfollow(username){
    var btn = document.getElementById(`${username}`);
    if (btn.innerHTML == "Follow") {
      // If user is following
      Follow(username);
      btn.innerHTML = "Unfollow"
    }

    else if (btn.innerHTML == "Unfollow") {
      Unfollow(username);
      btn.innerHTML = "Follow"
    }
  }



// Send score to Flask route
function Unfollow(username) {
  event.preventDefault();
  fetch('/unfollow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })

  })
  .then(response => {
    // handle response
    console.log("User successfully Unfollowed!");
  })
  .catch(error => {
    // handle error
  });
}

// Send score to Flask route
function Follow(username) {
  event.preventDefault();
  fetch('/follow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })

  })
  .then(response => {
    // handle response
    console.log("User successfully Followed!");
  })
  .catch(error => {
    // handle error
  });
}




FollowOrUnfollow();
Unfollow();
Follow();