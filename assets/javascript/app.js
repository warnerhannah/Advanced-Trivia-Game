//global variables
var intervalId;
var correctAnswers = 0;
var incorrectAnswers = 0;
var questionCounter = 1;
var countdown = 31;

$("#countdown, #timeleft, #mainsection, #submitButton").hide();

//when start is clicked begin quiz
$("#startgame").on("click", function () {
    startGame();
    questionCounter =1;
});

function startGame() {
    setTime();
    $("#startgame").hide();
    $("#correctanswers, #incorrectanswers").hide();
    $("#countdown, #timeleft, #mainsection, #submitButton").show();

    if (questionCounter===1) {
        $("#q2, #q3, #q4, #q5").hide();
    }
    else if (questionCounter===2) {
        $("#q2").show();
        $("#q1, #q3, #q4, #q5").hide();
    }
    else if (questionCounter===3) {
        $("#q3").show();
        $("#q2, #q1, #q4, #q5").hide();
    }
    else if (questionCounter===4) {
        $("#q4").show();
        $("#q2, #q3, #q1, #q5").hide();
    }
    else if (questionCounter===5) {
        $("#q5").show();
        $("#q2, #q3, #q4, #q1").hide();
        $("#submitbutton").html("Submit");
    }
}

//count down function and interval function
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

function setTime() {
    clearInterval(intervalId);
    intervalId = setInterval(countDown, 1000);
}

//if submit or next is clicked
$("#submitButton").on("click", function () {
    clearInterval(intervalId);
    if (questionCounter===5) {
        giveAnswer();
        scoreGame();
    }
    else {
        giveAnswer();
        startGame();
    }
});

function giveAnswer() {
    var userChoice = $('input[name=answer' + questionCounter + ']:checked').val();
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

//tally and display final score
function scoreGame() {
    clearInterval(intervalId);
    alert("Thanks for playing!")

    //print scores
    $("#correctanswers, #incorrectanswers").show();
    $("#correctanswers").html("You got " + correctAnswers + " answers right.")
    $("#incorrectanswers").html("And " + incorrectAnswers + " answers wrong.")

    //clear questions and stuff off page
    $("#countdown, #timeleft, #mainsection, button").hide();
    $("#startgame").show().html("Restart");

    for (i = 0; i < 5; i++) {
        $('input[name=answer' + i + ']:checked').attr('checked',false);
    }
};