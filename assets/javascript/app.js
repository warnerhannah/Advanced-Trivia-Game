// ARRAY
var questionsArray = [
    { // index 0 question1
        question: "How long is New Zealand's Ninety Mile Beach?", 
        answers: {
            a: "55 Miles",
            b: "90 Miles",
            c: "92 Miles",
            d: "75 Miles",
        },
        correctAnswer: "a"
    },
    { // index 1 question2
        question: "What was Walt Disney afraid of?", 
        answers: {
            a: "Driving",
            b: "Clowns",
            c: "Mice",
            d: "Death",
        },
        correctAnswer: "c"
    },
    { // index 2 question 3
        question: "How many states border the Gulf of Mexico?", 
        answers: {
            a: "2",
            b: "6",
            c: "3",
            d: "5",
        },
        correctAnswer: "d"
    },
    { // index 3 question4
        question: "Who averaged one patent every 3 weeks of their life?", 
        answers: {
            a: "Thomas Edison",
            b: "Benjamin Franklin",
            c: "Sir Isaac Newton",
            d: "Nikola Tesla",
        },
        correctAnswer: "a"
    },
    { // index 4 question5
        question: "What is the most common atmospheric gas?", 
        answers: {
            a: "Carbon",
            b: "Nitrogen",
            c: "Hydrogen",
            d: "Oxygen",
        },
        correctAnswer: "b"
    }
];

// DEFINE VARIABLES 
var timeLeft = 31;
var correctAnswers = 0;
var incorrectAnswers = 0;
var timeInterval ;
var questionIndex = 0;


// INTERVAL COUNTDOWN 
function countDown() {
    timeLeft=31;

    clearInterval(timeInterval);
    timeInterval= setInterval(function() {
        timeLeft--;
        $("#countdown").html(timeLeft);

        // IF TIMER RUNS OUT, SHOW ANSWER SCREEN 
        if (timeLeft === 0 ) {
            giveAnswer();
            clearInterval(timeInterval);
        }
    }, 1000);
};

// CREATE STARTUP SCREEN 
// HIDE EVERYTHING
$("#next, #timeleft, #countdown, #correctanswers, #incorrectanswers, #mainsection, #restartbutton, #submitbutton").hide();

// CLICK START 
$("#startbutton").on("click", startGame);

function startGame() {
    // HIDE START BUTTON
    $("#next, #correctanswers, #incorrectanswers, #restartbutton").hide();
    $("#startbutton").hide();
    // DISPLAY OTHER FEATURES
    $("#timeleft, #countdown, #mainsection").show();
    // START COUNTDOWN 
    displayQuestion();
};

function displayQuestion() {
    // SHOW QUESTION 
    countDown();

    $("#timeleft, #countdown").show();
    $("#next").hide();
    $("#a, #b, #c, #d").show();
    $(".question").html(questionsArray[questionIndex].question);
    // SHOW ANSWERS
    $("#answer1").html(questionsArray[questionIndex].answers.a);
    $("#answer2").html(questionsArray[questionIndex].answers.b);
    $("#answer3").html(questionsArray[questionIndex].answers.c);
    $("#answer4").html(questionsArray[questionIndex].answers.d);
}

$(".answers").click(function() {
    giveAnswer();
    var answerTag = questionsArray[questionIndex].correctAnswer 
    var userChoice = $(this).attr("id");
    if (userChoice === answerTag) {
        correctAnswers++;
    }
    else {
        incorrectAnswers++;
    }
});

// ANSWER SCREEN 
function giveAnswer() {
    // HIDE COUNTDOWN AND TIME REMAINING
    $("#timeleft, #countdown").hide();
    $("#next").show();
    var answerTag = questionsArray[questionIndex].correctAnswer;
    // HIDE ALL INCORRECT ANSWERS
    // SHOW QUESTION AND CORRECT ANSWER ONLY 
    if (answerTag === "a") {
        $("#a, #b, #c, #d").hide();
        $("#a").show();
    }
    else if (answerTag === "b") {
        $("#a, #c, #d").hide();
    }
    else if (answerTag === "c") {
        $("#a, #b, #d").hide();
    }
    else {
        $("#a, #b, #c").hide();
    };
    // questions 1-4 IN FIVE SECONDS, GO TO SECOND QUESTION 
    if (questionIndex<4) {
        setTimeout(displayQuestion, 5000);
        questionIndex++;
    }
    // question 5 IN FIVE SECONDS, GO TO FINAL SCORE PAGE 
    else {
        $("#next").html("Final Score Shown in 5 seconds...")
        setTimeout(scoreGame, 5000);
    };
}

// FINAL SCORE PAGE
function scoreGame() {
    // HIDE EVERYTHING EXCEPT NUMBER OF IN/CORRECT ANSWERS 
    $("#mainsection, #timeleft, #countdown").hide();
    $("#correctanswers, #incorrectanswers").show();
    $("#correctanswers").html("You got " + correctAnswers + " right!");
    $("#incorrectanswers").html("You got " + incorrectAnswers + " wrong!");
    $("#restartbutton").show();
}

// RESTART BUTTON 
$("#restartbutton").click(restart);

// RESTART GAME 
function restart() {
    // RESETS ALL GLOBAL VARIABLES 
    timeLeft = 31;
    incorrectAnswers = 0;
    correctAnswers = 0;
    timeInterval ;
    questionIndex = 0;

    startGame();
}
