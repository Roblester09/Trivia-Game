$(document).ready(function(){

    var strangeQuestions = [{
        question: "What is the name of the fictional town in which Stranger Things is set?",
        choices: ["Elkton", "Berryville", "Hawkins", "Midletown"],
        correct: "Hawkins",
        image: "hallway.gif"
    },
	{
        question: "Who said - I've told you a million times, my teeth are coming in. It's called Cleidocranial Dysplasia.",
        choices: ["Dustin Henderson", "Joyce Byers", "Mike Wheeler", "Eleven"],
        correct: "Dustin Henderson",
        image: ""
    },
	{
        question: "Which of the below is NOT the name of a member of the Hawkins police department?",
        choices: ["Florence", "Powell", "Callahan", "Brenner"],
        correct: "Brenner",
        image: ""
    },
	{
        question: "The mysterious research facility responsible for kidnapping Eleven and unleashing the monster poses as:",
        choices: ["The Department of Health and Human Services", "The Department of Homeland Security", "The Department of Energy", "The Department of Defense"],
        correct: "The Department of Energy",
        image: ""
    },
	{
        question: "Joyce Byers is played by...",
        choices: ["Winona Ryder", "Rachel Weisz", "Naomi Watts", "Jennifer Connelly"],
        correct: "Winona Ryder",
        image: ""
    },
	{
        question: "What is the name of Police Chief Jim Hopper's daughter?",
        choices: ["Jane", "Mary", "Eleven", "Sarah"],
        correct: "Sarah",
        image: ""
    },
	{
        question: "What day does Will Byers vanish?",
        choices: ["September 8th", "December 25th", "November 6th", "November 3rd"],
        correct: "November 6th",
        image: ""
    },{
        question: "What is the name of the restaurant that Eleven walks in to on November 7th?",
        choices: ["McDonalds", "Benny's Burgers", "Wendys", "Bob's Burgers"],
        correct: "Benny's Burgers",
        image: ""
    },{
        question: "What is Eleven's birth name?",
        choices: ["Sandra", "Emma", "Jane", "Heather"],
        correct: "Jane",
        image: ""
    },{
        question: "Who raised Eleven and treated her as test subject?",
        choices: ["Martin Brenner", "Charles Xavier", "Bruce Banner", "Lex Luthor"],
        correct: "Martin Brenner",
        image: ""
    },{
        question: "Where does the Demogorgon originate from?",
        choices: ["Mount Everest", "Earth 2", "The Upside Down", "Asgard"],
        correct: "The Upside Down",
        image: ""
    },{
        question: "Jonathan Byers' hobby is....",
        choices: ["Sketching", "Writing", "Hunting", "Photography"],
        correct: "Photography",
        image: ""
    },{
        question: "What is the Tolkien-themed nickname for where Will disappeared?",
        choices: ["Minas Terith", "Mirkwood", "Rivendell", "Lothlorien"],
        correct: "Mirkwood",
        image: ""
    },{
        question: "What is the nickname the kids have for the monster?",
        choices: ["Basilisk", "Demogorgon", "Orthros", "Cockatrice"],
        correct: "Demogorgon",
        image: ""
    },{
        question: "What did Nancy dress up as for the boys' Elder Tree campaign four years ago?",
        choices: ["a mage", "a gnome", "a bard", "an elf"],
        correct: "an elf",
        image: ""
    },
	{
        question: "Which of these Star Wars characters did Dustin repeatedly reference in episode seven on the series (and again in eight?)",
        choices: ["C3PO", "Han Solo", "Yoda", "Lando"],
        correct: "Lando",
        image: ""
    },
	{
        question: "What is the college Jonathan wanted to go to since he was 6? (Joyce will be very mad if you don't get it right).",
        choices: ["Columbia University", "University of Chicago", "New York University", "Duke University"],
        correct: "New York University",
        image: ""
    },
	{
        question: "How did Barb cut her hand shortly before she was taken by the monster?",
        choices: ["Opening a beer can", "Falling near the pool", "Breaking a wine bottle", "Cutting food with a knife"],
        correct: "Opening a beer can",
        image: ""
    },
	{
        question: "What comic does Will demand from Dustin when he wins the bike race in the first episode?",
        choices: ["Superman #176", "Batman #298", "X-Men #134", "Spider-Man #109"],
        correct: "X-Men #134",
        image: ""
    },
	{
        question: "What year do the events of the first season take place in?",
        choices: ["1979", "1983", "1976", "1986"],
        correct: "1983",
        image: ""
    },
	{
        question: "What did Joyce ask to see to confirm the dead body was really Will's?",
        choices: ["a birthmark", "a scar", "a missing toe", "a missing tooth"],
        correct: "a birthmark",
        image: ""
    },
	{
        question: "What club are the four boys a part of?",
        choices: ["The Science Club", "The Chess Club", "The AV Club", "The Literature club"],
        correct: "The AV Club",
        image: ""
    },
	{
        question: "What did Chief Hopper read to his daughter in the hospital?",
        choices: ["A Wrinkle in Time", "Anne of Green Gables", "James and the Giant Peach", "Where the Red Fern Grows"],
        correct: "Anne of Green Gables",
        image: ""
    },
	{
        question: "At the end of the season, the boys are playing a Dungeon and Dragons game once more. They complain about there being loose ends when the game finishes. Which of the below is NOT one of the loose ends?",
        choices: ["The lost knight", "The proud princess", "The weird flowers in the cave", "The injured monster"],
        correct: "The injured monster",
        image: ""
    },
	{
        question: "Which of the below is Eleven's favorite food (that Chief Hopper leaves in the forest for her at the end of the show)?",
        choices: ["Snack Pack", "Hot Pockets", "Pop Tarts", "Eggo Waffles"],
        correct: "Eggo Waffles",
        image: ""
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

	$("#title").fadeIn(8000);
	$("#play").fadeIn(8000);

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
			for (var i = 0; i < 10; i++) {
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
                $("#question").html("The correct answer was " + i.correct);
				$("#answer").empty();
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
			$("#answer").html("Correct answers: " + correct + "<br>Incorrect answers: " + incorrect).addClass("overFormat");
			var reset = $("<button>")
				.addClass("btn btn-danger choice")
				.html("Play Again")
				.on("click", game.reset);
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
