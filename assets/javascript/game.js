$(document).ready(function(){

    var strangeQuestions = [
        questionOne = {
            question: "What is my name?",
            aOne: "Robert",
            aTwo: "Lester",
            aThree: "Sean",
            aFour: "Nobody",
        }
    ]

    $("#title").fadeIn(8000);
    $("#play").fadeIn(8000);

    var stranger_audio = new Audio("../assets/audio/stranger-audio.mp3");
    stranger_audio.play();

    $("#play").on("click", function(){
        displayQuestion();
    });

    var question = $("game");
    var questionTitle = $("h1");

    function displayQuestion(){
        $("#play").fadeOut(3000);
        questionTitle.html("Hello").addClass("style");
        question.append(questionTitle);
    }

})

//ITC Benguit