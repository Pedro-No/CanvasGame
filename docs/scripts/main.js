console.log("hello vi and p");

const canvas = document.getElementById("canvas"); //canvas
const ctx = canvas.getContext("2d"); //2d

const buttonL = document.querySelector(".left-bttn"); //buttons Left
const buttonR = document.querySelector(".right-bttn"); //buttons
const buttonU = document.querySelector(".up-bttn"); //buttons
const buttonD = document.querySelector(".down-bttn"); //buttons
const water = new Sprite(0, 0, waterImg);
const background = new Sprite(-1200, -980, backgroundImg); // creates new object for the backgroundimg
const mapShadows = new Sprite(-1200, -980, backgroundShadows); // creates new object for the backgroundShadows
const hudUi = new Sprite(0, 0, hudImg); // creates new object for the Hud Img

const spikePlanted = new Audio("docs/assets/audio/spike-planted.mp3");
const spikeMain = new Audio("docs/assets/audio/spike-main.mp3");
const sageClutch = new Audio("docs/assets/audio/sage-clutch.mp3");
const sageLost = new Audio("docs/assets/audio/sage-lost.mp3");
const footsteps = new Audio("docs/assets/audio/footsteps.mp3");
const bgMusic = new Audio("docs/assets/audio/val-instrumental.mp3");

const bomb = new Sprite(-1120, -465, bombImg); // creates new object for the bomnimg

const player = new Sprite(360, 210, characterImg); // creates new object for the characterimg

const win = new Sprite(0, 0, winImg); // creates new object for the win condition
const loss = new Sprite(0, 0, lossImg); // creates new object for the loss condition

const enemy1 = new Sprite(-520, -380, enemy1Img); // creates new object for the enemy1
const enemy2 = new Sprite(-1040, -265, enemy2Img); // creates new object for the enemy2
const enemy3 = new Sprite(-120, -870, enemy3Img); // creates new object for the enemy3

// ' '  = wall
// 2    = chao
// 3    = bomba
// 4    = enemy

/*
x = -480 e agr x = -1200 === 720
y = 130 e agr y = -980 === -1110

200 + 720
730 - 1110

*/

const game = new Game(
  background,
  player,
  bomb,
  mapShadows,
  hudUi,
  win,
  loss,
  enemy1,
  enemy2,
  enemy3,
  water
); // Creates an instance of the Game

window.onload = () => {
  document.addEventListener("keydown", (e) => {
    // when Enter Key is clicked run startGame() function.
    if (e.code === "Enter") {
      game.start(); // starts running the game
    }
  });

  document.addEventListener("keydown", (e) => {
    // creates event listener for key press to move the car
    switch (e.key) {
      case "ArrowUp":
        game.moveUp();
        buttonPress(buttonU);
        break;
      case "ArrowLeft":
        game.moveLeft();
        buttonPress(buttonL);
        break;
      case "ArrowRight":
        game.moveRight();
        buttonPress(buttonR);
        break;
      case "ArrowDown":
        game.moveDown();
        buttonPress(buttonD);
        break;
    }
  });

  document.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "ArrowUp":
        buttonDepress(buttonU);
        break;
      case "ArrowLeft":
        buttonDepress(buttonL);
        break;
      case "ArrowRight":
        buttonDepress(buttonR);
        break;
      case "ArrowDown":
        buttonDepress(buttonD);
        break;
    }
  });
};

function buttonPress(button) {
  button.classList.remove("button-style-Depressed");
  button.classList.add("button-style-Pressed");
}

function buttonDepress(button) {
  button.classList.remove("button-style-Pressed");
  button.classList.add("button-style-Depressed");
}
