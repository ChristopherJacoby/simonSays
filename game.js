const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStart = false;
let level = 0;

$(document).keypress(function () {
  if (!gameStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});

$(".btn").click(e => {
  const userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor)
  const playerAudio = new Audio("sounds/" + userChosenColor + ".mp3");
  playerAudio.play();
  $("#" + userChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  checkAnswer(userClickedPattern.length - 1)
})

const animatePress = currentColor => {
  setTimeout(function () {
    $("#" + userChosenColor).addClass('pressed');
  }, 1000);
}

const nextSequence = () => {
  userClickedPattern = [];
  level++
  $("#level-title").text("Level " + level)
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  const audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}

const checkAnswer = currentLevel => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence()
      }, 1000);
    }
  } else {
    const failAudio = new Audio("sounds/wrong.mp3")
    failAudio.play();
    $(document).addClass("game-over");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}