// GLOBAL VARIABLES
var intervalId;
var correctAnswers = 0;
var incorrectAnswers = 0;
var questionCounter = 1;
var countdown = 31;

// INITIAL SCREEN SET UP 
$("#countdown, #timeleft, #mainsection, #submitButton, #restartButton").hide();

// WHEN USER CLICKS START
$("#startgame").on("click", function () {
    startGame();
});

// DISPLAY QUESTIONS
function startGame() {
    setTime();
    $("#startgame").hide();
    $("#correctanswers, #incorrectanswers").hide();
    $("#countdown, #timeleft, #mainsection, #submitButton").show();

    if (questionCounter === 1) {
        $("#q2, #q3, #q4, #q5").hide();
        $("#q1").show();
    }
   else if (questionCounter === 2) {
        $("#q2").show();
        $("#q1, #q3, #q4, #q5").hide();
    }
    else if (questionCounter === 3) {
        $("#q3").show();
        $("#q2, #q1, #q4, #q5").hide();
    }
    else if (questionCounter === 4) {
        $("#q4").show();
        $("#q2, #q3, #q1, #q5").hide();
    }
    else if (questionCounter === 5) {
        $("#q5").show();
        $("#q2, #q3, #q4, #q1").hide();
        $("#submitbutton").html("Submit");
    }
}

// COUNTDOWN AND INTERVAL FUNCITONS
function countDown() {
    countdown--;
    $("#countdown").html(countdown);
    if (countdown === 0) {
        alert("Time is up!");
        clearInterval(intervalId);
        giveAnswer();
        startGame();
    }
}

// TO RESET THE TIMER
function setTime() {
    countdown = 31;
    clearInterval(intervalId);
    intervalId = setInterval(countDown, 1000);
}

// IF USER PRESSES SUBMIT OR NEXT
$("#submitButton").on("click", function () {
    setTime()
    if (questionCounter === 5) {
        giveAnswer();
        scoreGame();
    }
    else {
        giveAnswer();
        startGame();
    }
});

// CHECK ANSWERS AND ALERT IF CORRECT OR INCORRECT
function giveAnswer() {
    var userChoice = $('input[name=answer' + questionCounter + ']:checked');
    if (userChoice === "correct") {
        alert("Correct Answer!");
        correctAnswers++;
        questionCounter++;
        startGame();
    }
    else {
        alert("Incorrect Answer!");
        incorrectAnswers++;
        questionCounter++;
        startGame();
    }

}

// TALLY FINAL SCORES
function scoreGame() {
    clearInterval(intervalId);
    alert("Thanks for playing!")

    // DISPLAY FINAL SCORES
    $("#correctanswers, #incorrectanswers").show();
    $("#correctanswers").html("You got " + correctAnswers + " answers right.")
    $("#incorrectanswers").html("And " + incorrectAnswers + " answers wrong.")

    $("#countdown, #timeleft, #mainsection, button").hide();
    $("#restartButton").show();
};


// RESTART GAME
$("#restartButton").on("click", function () {
    restartGame();
});

function restartGame() {
    $("#startgame").show();
    $("#countdown, #timeleft, #mainsection, #submitButton, #restartButton").hide();
    $("#correctanswers, #incorrectanswers").hide();

    // for (i = 0; i < 5; i++) {
    //     $('input[name=answer' + i + ']:checked').attr('checked', false);
    // }

    correctAnswers= 0;
    incorrectAnswers=0;
    questionCounter = 1;
}