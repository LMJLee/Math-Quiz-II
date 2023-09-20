
Math Quiz

This is a web application that consists of a math quiz that produces generated questions with the option of selecting different arithmetic problems such as,
addition, subtraction, multiplication as well as a random combination of all three. This application requires users to create an account which then allows users to save their scores in a public leaderboard.
A search function allows users to search for other users, follow them, and view their profiles.

HOW IT WORKS

This application was written in Python (flask), javascript, and html. Each webpage is linked to a specific flask route which can be called when prompted. The first page
the user sees by default is the login page, a login is required in order to access the rest of the application features. If a user does not possess a login, they can create one by clicking on the sign up
tab of the navigation bar. Once logged in you are automatically directed
to the prompt page, this page gives you the option of selecting exclusively addition, subtraction, multiplcation, or "everything"; a randomized combination of all three. Once a button is clicked
an event listener in the prompt.js file is triggered and a numerical value called the selector is then encoded and passed down to the "/question" flask route.

the question.js file is by far the most complex js file in the application. It consists of separate javascript as well two individual functions that are called repeatedly.
First:
The selector URI is decoded. Inside the gen() function, an if loop checks the selector variable which then subsequently determines which arithmatic problems + solutions
it will generate e.g. if selector == 1, then a variable called "index" is then set to 1 which generates addition problems, if the selector == 2, then the index is set
to 2 and subtraction problems are generated, if selector == 4, then the index is set to a random number and each subsequent question will have a random arithmetic operator.
Once ten questions have been answered, you are automatically redirected to an end page. The end page gives you the option of saving the score to an SQL table (using SQLAlchemy), or
playing again which redirects you back to the "prompt" page.



QUESTION GENERATION LOGIC

In the question.js file, after an index has been determined the arithmetic operator is set and displayed on the html page, two subject variables num1, and num2 are randomly generated, and a "solution"
variable is declared.
Three dummy variables are also declared. The question page consists of four options, three of them are randomly generated incorrect answers, and one correct solution.
A variable set named "answers" is declared, the set is created through an if loop that is programmed to prevent any of the three dummy variables from coincidentally being
the correct solution. This set is vital as without it you would encounter questions which have more than one button with the same answer.
The three dummy variables, and solution variable are then put into an array that is randomized each time a question is generated. This randomizer array
is vital as it allows the solution variable to be put it into a different button each time. Without this, the correct answer would have to be put into the same
button each time. It also allows for added security as the html source does not indicate which button contains the correct answer as the innerHTML elements
are named "options 1, 2, 3 and 4".
A time-dependent point display function progress() is also visible and reset each time a question is answered. The longer it takes to answer a question, the less points rewarded.
An event listener is triggered each time one of the four buttons are selected. It accesses the variables through flashes redthe span id's and calculates the correct solution.
If the solution is equal to the option that you selected. The score indicator flashes green, if it is incorrect it . Each time a question is answered.
A "count" variable is increased by one, for each correct answer selected a "correct" variable is also increased by one. The score variable is also added up each time too.

HOW TO OPERATE
Open the main.py button and press the run python button. The program will run on a local port and the terminal will give you an IP address which can be opened on your default web browser.

Special thanks to Jerome Lezard for reviewing my code and occassionally providing insight into other ways of approaching/solving issues!!
