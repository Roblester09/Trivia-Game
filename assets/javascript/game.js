$(document).ready(function(){

    var strangeQuestions = [{
        question: "What is the name of the fictional town in which Stranger Things is set?",
        choices: ["Elkton", "Berryville", "Hawkins", "Midletown"],
        correct: "Hawkins",
        image: "hallway.gif"
    },
	{
        question: "Who said - I've told you a million times, my teeth are coming in. It's called cleidocranial dysplasia.",
        choices: ["Dustin Henderson", "Joyce Byers", "Mike Wheeler", "Eleven"],
        correct: "Dustin Henderson",
        image: "hallway.gif"
    },
	{
        question: "Which of the below is NOT the name of a member of the Hawkins police department?",
        choices: ["Florence", "Powell", "Callahan", "Brenner"],
        correct: "",
        image: "hallway.gif"
    }];

    var time = 20;
    var correct = 0;
    var incorrect = 0;
    var current = 0;
    var trivia = [];
    var timer;
    var display;
    var i;
    var randomizeArray;
    var mute = false;

    var stranger_audio = new Audio("../assets/audio/stranger-audio.mp3");
    stranger_audio.play();

    $("#play").on("click", function(){
        game.newGame();
    });

    //click to reset the game
    $('#reset').click(function() {
        game.reset();
    });

    var game = {
        //pick 10 questions from array
		randomizeQuestions: function() {
			randomizeArray = strangeQuestions.sort(function(a, b) {
				return 0.5 - Math.random();
			});
			for (var i = 0; i < 3; i++) {
				trivia.push(randomizeArray.pop());
			}
		},
		//randomize order of choices
		randomizeChoices: function() {
			for (var i = 0; i < trivia.length; i++) {
				var randomChoice = trivia[i].choices.sort(function(a, b) {
					return 0.5 - Math.random()
				});
			}
		},
        newGame: function() {
            $("#play").hide();
            game.timerReset();
            timer = setInterval(game.countdown, 1000);
            game.displayQuestion();
        },
        countdown: function() {
            if (time > 0) {
                time--;
                $("#timer").html(time).addClass("timerFormat");
            } else {
                incorrect++;
                clearInterval(timer);
                $("#question").html("The correct answer is");
				display = setTimeout(game.nextQuestion, 5000);
            }
        },
        timerReset: function() {
			time = 20;
			$("#timer").html(time);
		},
        //compare click to correct answer
		check: function() {
			if ($(this).text() == i.correct) {
				game.correct();
			} else {
				game.incorrect();
			}
		},
		//correct answer
		correct: function() {
			correct++;
			clearInterval(timer);
			$("#timer").html("Correct!");
			$("#question").empty();
			game.displayAnswer();
		},
		//incorrect answer
		incorrect: function() {
			incorrect++;
			clearInterval(timer);
			$("#timer").html("incorrect");
			$("#question").html("The correct answer was " + i.correct);
			game.displayAnswer();
		},

        displayQuestion: function() {
			i = trivia[current];
			current++;
			$("#question").html(i.question);
			$.each(i.choices, function(index, value) {
				var answer = $("<button>")
					.addClass("btn choice btn-danger")
					.html(i.choices[index])
					.on("click", game.check);
				$("#answer").append(answer);
			});
		},
        //display the answer after user choice
		displayAnswer: function() {
			var picture = $("<img>")
				.addClass("img-rounded image center-block")
				.attr("src", "../assets/images/" + i.images);
			$("#answer").html(picture);
			display = setTimeout(game.nextQuestion, 5000);
		},
		//move to next question/end game
		nextQuestion: function() {
			if (current === trivia.length) {
				game.endGame();
			} else {
				time = 20;
				$("#answer").empty();
				game.newGame();
			}
		},
		//show stats on screen on game end
		endGame: function() {
			clearInterval(timer);
			$("#timer").hide();
			$("#question").html("Game Over");
			$("#answer").html("Correct answers: " + correct + "<br>Incorrect Answers: " + incorrect);
			var reset = $("<button>")
				.addClass("btn gameButton")
				.html("Play Again")
				.attr("id", "reset");
			$("#reset").html(reset);
		},
		//reset 
		reset: function() {
			time = 20;
			correct = 0;
			incorrect = 0;
			current = 0;
			i = trivia[current];
			strangeQuestions = strangeQuestions.concat(trivia);
			trivia = [];
		    $('#timer').show();
	        $('#timer').empty();
	        $('#question').empty();
	        $('#answer').empty();
	        $('#reset').empty();
	        game.randomizeQuestions();
	        game.randomizeChoices();
	        game.newGame();
		}
    }

    game.randomizeQuestions();
	game.randomizeChoices();
})
