//global variables
var countdown = 120;
var intervalId;
var correctAnswers = 0;
var incorrectAnswers = 0;

$("#countdown, #timeleft, #mainsection, #submitButton").hide();

//when start is clicked begin quiz
$("#startgame").on("click", function () {
    $("#startgame").hide();
    $("#countdown, #timeleft, #mainsection, #submitButton").show();
    intervalId = setInterval(countDown, 1000);
});

//count down function and interval function
function countDown() {
    countdown--;
    $("#countdown").html(countdown);
    if (countdown === 0) {
        alert("Time is up!");
        clearInterval(intervalId);
        scoreGame();
    }
}

//if submit is clicked
$("#submitButton").on("click", function () {
    scoreGame()
});

//tally and display score
function scoreGame() {
    clearInterval(intervalId);

    //tally scores
    for (i = 0; i < 5; i++) {
        var userChoice = $('input[name=answer' + i + ']:checked').val();
        if (userChoice === "correct") {
            correctAnswers++;
        }
        else {
            incorrectAnswers++;
        }
    }
    alert("Thanks for playing!")

    //print scores
    $("#correctanswers").html("You got " + correctAnswers + " answers right.")
    $("#incorrectanswers").html("And " + incorrectAnswers + " answers wrong.")

    //clear questions and stuff off page
    $("#countdown, #timeleft, #mainsection, button").hide();
};