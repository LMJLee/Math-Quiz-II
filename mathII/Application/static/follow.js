function RemoveCheck(username){
  var btn = document.getElementById(`${username}`);
  if (btn.innerHTML == "Remove") {
    // If user is following
    Remove(username);
    btn.innerHTML = "Removed!"
  }
}


// Send score to Flask route
function Remove(username) {
    event.preventDefault();
    fetch('/remove', {
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
      console.log("User successfully removed!");
    })
    .catch(error => {
      // handle error
    });
  }