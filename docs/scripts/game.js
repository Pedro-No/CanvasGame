class Game {
  // game logic
  constructor(
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
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.bomb = bomb;
    this.water = water;
    this.background = background;
    this.mapShadows = mapShadows;
    this.loss = loss;
    this.win = win;
    this.hudUi = hudUi;
    this.player = player;
    this.playerPos = [30, 39];
    this.enemy1 = enemy1;
    this.enemy1Pos = [15, 17];
    this.enemy2 = enemy2;
    this.enemy2Pos = [18, 4];
    this.enemy3 = enemy3;
    this.enemy3Pos = [3, 27];
    this.intervalId = null;
    this.enemiesAnimation = null;
    this.frames = 0;
    this.timer = 6000;
  }

  start() {
    this.intervalId = setInterval(this.update, 10); // sets the clock speed of the game running at 100fps (1000ms / 10ms)
    this.enemiesAnimation = setInterval(this.enemiesUpdate, 200);
    spikePlanted.play();
    spikeMain.play();
    bgMusic.play();
  }

  update = () => {
    this.frames++; // Counts the frames since the game started
    this.clear(); // Clears previous Frame

    this.water.draw();
    this.background.draw(); // draws the background
    this.player.draw();
    this.bomb.draw();

    this.enemy1.draw();
    this.enemy2.draw();
    this.enemy3.draw();

    this.mapShadows.draw();

    this.hudUi.draw();
    this.countdown();

    this.checkWinCondition();
    this.loseCondition();
  };

  enemiesUpdate = () => {
    this.enemiesMove();
  };

  stop() {
    clearInterval(this.intervalId); // clears Interval aka: stops game
    clearInterval(this.enemiesAnimation);
    bgMusic.pause();
  }

  countdown() {
    this.timer--;
    let seconds = Math.floor(this.timer / 100);

    if (this.timer >= 0) {
      if (seconds < 10) {
        ctx.fillStyle = "white";
        ctx.font = "25px Arial";
        ctx.fillText(`0:0${seconds}`, 377, 40);
      } else {
        ctx.fillStyle = "white";
        ctx.font = "25px Arial";
        ctx.fillText(`0:${seconds}`, 377, 40);
      }
    }
  }

  clear() {
    ctx.clearRect(0, 0, this.width, this.height); // clears previous Frame
  }

  // player movement
  moveUp() {
    let a = this.playerPos[0];
    let b = this.playerPos[1];

    if (collisionMap[a - 1][b] === 2) {
      this.bomb.y += 40;
      this.background.y += 40;
      this.mapShadows.y += 40;
      this.enemy1.y += 40;
      this.enemy2.y += 40;
      this.enemy3.y += 40;
      this.playerPos[0] -= 1;

      footsteps.play();
    }
  }

  moveDown() {
    let a = this.playerPos[0];
    let b = this.playerPos[1];

    if (collisionMap[a + 1][b] === 2) {
      this.bomb.y -= 40;
      this.background.y -= 40;
      this.mapShadows.y -= 40;
      this.enemy1.y -= 40;
      this.enemy2.y -= 40;
      this.enemy3.y -= 40;
      this.playerPos[0] += 1;

      footsteps.play();
    }
  }

  moveLeft() {
    let a = this.playerPos[0];
    let b = this.playerPos[1];

    if (collisionMap[a][b - 1] === 2) {
      this.bomb.x += 40;
      this.background.x += 40;
      this.mapShadows.x += 40;
      this.enemy1.x += 40;
      this.enemy2.x += 40;
      this.enemy3.x += 40;
      this.playerPos[1] -= 1;

      footsteps.play();
    }
  }

  moveRight() {
    let a = this.playerPos[0];
    let b = this.playerPos[1];

    if (collisionMap[a][b + 1] === 2) {
      this.bomb.x -= 40;
      this.background.x -= 40;
      this.mapShadows.x -= 40;
      this.enemy1.x -= 40;
      this.enemy2.x -= 40;
      this.enemy3.x -= 40;
      this.playerPos[1] += 1;

      footsteps.play();
    }
  }

  // enemy movement
  enemiesMove() {
    let random = Math.floor(Math.random() * (4 - 1 + 1) + 1);

    if (random === 1) {
      this.enemy1Move("down");
      this.enemy2Move("left");
      this.enemy3Move("right");
      footsteps.pause();
    } else if (random === 2) {
      this.enemy1Move("left");
      this.enemy2Move("up");
      this.enemy3Move("down");
      footsteps.pause();
    } else if (random === 3) {
      this.enemy1Move("right");
      this.enemy2Move("down");
      this.enemy3Move("left");
      footsteps.pause();
    } else {
      this.enemy1Move("up");
      this.enemy2Move("right");
      this.enemy3Move("up");
      footsteps.pause();
    }
  }

  enemy1Move(direction) {
    let a = this.enemy1Pos[0];
    let b = this.enemy1Pos[1];

    if (direction === "up") {
      if (collisionMap[a - 1][b] === 2) {
        this.enemy1.y -= 40;
        this.enemy1Pos[0] -= 1;
      }
    } else if (direction === "down") {
      if (collisionMap[a + 1][b] === 2) {
        this.enemy1.y += 40;
        this.enemy1Pos[0] += 1;
      }
    } else if (direction === "left") {
      if (collisionMap[a][b + 1] === 2) {
        this.enemy1.x += 40;
        this.enemy1Pos[1] += 1;
      }
    } else {
      if (collisionMap[a][b - 1] === 2) {
        this.enemy1.x -= 40;
        this.enemy1Pos[1] -= 1;
      }
    }
  }

  enemy2Move(direction) {
    let a = this.enemy2Pos[0];
    let b = this.enemy2Pos[1];

    if (direction === "up") {
      if (collisionMap[a - 1][b] === 2) {
        this.enemy2.y -= 40;
        this.enemy2Pos[0] -= 1;
      }
    } else if (direction === "down") {
      if (collisionMap[a + 1][b] === 2) {
        this.enemy2.y += 40;
        this.enemy2Pos[0] += 1;
      }
    } else if (direction === "left") {
      if (collisionMap[a][b + 1] === 2) {
        this.enemy2.x += 40;
        this.enemy2Pos[1] += 1;
      }
    } else {
      if (collisionMap[a][b - 1] === 2) {
        this.enemy2.x -= 40;
        this.enemy2Pos[1] -= 1;
      }
    }
  }

  enemy3Move(direction) {
    let a = this.enemy3Pos[0];
    let b = this.enemy3Pos[1];

    if (direction === "up") {
      if (collisionMap[a - 1][b] === 2) {
        this.enemy3.y -= 40;
        this.enemy3Pos[0] -= 1;
      }
    } else if (direction === "down") {
      if (collisionMap[a + 1][b] === 2) {
        this.enemy3.y += 40;
        this.enemy3Pos[0] += 1;
      }
    } else if (direction === "left") {
      if (collisionMap[a][b + 1] === 2) {
        this.enemy3.x += 40;
        this.enemy3Pos[1] += 1;
      }
    } else {
      if (collisionMap[a][b - 1] === 2) {
        this.enemy3.x -= 40;
        this.enemy3Pos[1] -= 1;
      }
    }
  }

  // game logic
  checkWinCondition() {
    let a = this.playerPos[0];
    let b = this.playerPos[1];

    if (
      collisionMap[a][b - 1] === 3 ||
      collisionMap[a][b + 1] === 3 ||
      collisionMap[a + 1][b] === 3 ||
      collisionMap[a - 1][b] === 3
    ) {
      ctx.fillStyle = "black";
      ctx.font = "30px Arial";
      this.stop();
      this.win.draw();
      sageClutch.play();
    }
  }

  loseCondition() {
    if (this.timer <= 0) {
      this.loss.draw();
    } else if (
      this.playerPos[0] === this.enemy1Pos[0] &&
      this.playerPos[1] === this.enemy1Pos[1]
    ) {
      this.stop();
      this.loss.draw();
      sageLost.play();
    } else if (
      this.playerPos[0] === this.enemy2Pos[0] &&
      this.playerPos[1] === this.enemy2Pos[1]
    ) {
      this.stop();
      this.loss.draw();
      sageLost.play();
    } else if (
      this.playerPos[0] === this.enemy3Pos[0] &&
      this.playerPos[1] === this.enemy3Pos[1]
    ) {
      this.stop();
      this.loss.draw();
      sageLost.play();
    }
  }
}
