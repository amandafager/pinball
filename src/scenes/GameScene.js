import Phaser from 'phaser';
import config from '../main';
import Launcher from '../assets/launcher';
// import objectCreator from '../assets/objectCreate';
import createObjects from '../assets/objectCreate';
import background from '../images/background.png';
import topHalfMoon from '../images/topHalfMoon.png';
import backgroundStripes from '../images/backgroundStripes.png';
import topBumper from '../images/topBumper.png';
import leftBumper from '../images/leftBumper.png';
import rightBumper from '../images/rightBumper.png';
import Ball from '../assets/ball';
import ballImage from '../images/ball.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.gameWidth = config.scale.width;
    this.gameHeight = config.scale.height;
    this.gameBalls = 3;
    this.currentBall = 0;
  }

  preload() {
    this.matter.world.update60Hz();
    this.load.image('ball', ballImage);
    this.load.image('background', background);
    this.load.image('backgroundStripes', backgroundStripes);
    this.load.image('topHalfMoon', topHalfMoon);
    this.load.image('topBumper', topBumper);
    this.load.image('leftBumper', leftBumper);
    this.load.image('rightBumper', rightBumper);
  }

  create() {
    this.matter.world.setBounds(0, 0, this.gameWidth, this.gameHeight);
    this.back = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.back.scale = 1.15;
    this.backStrips = this.add.image(0, 0, 'backgroundStripes').setOrigin(0, 0);
    // this.topHalfMoon = this.add.image(0, 0, 'topHalfMoon').setOrigin(0, 0);
    new createObjects(this, 180, 890, 'leftBumper', this.collisionGroupB);
    new createObjects(this, 540, 890, 'rightBumper', this.collisionGroupB);
    new createObjects(this, this.gameWidth * 0.5 -100, 100, 'topHalfMoon', this.collisionGroupB);
    new createObjects(this, this.gameWidth * 0.3, 250, 'topBumper', this.collisionGroupB);
    new createObjects(this, this.gameWidth * 0.5, 360, 'topBumper', this.collisionGroupB);
    new createObjects(this, this.gameWidth * 0.7, 250, 'topBumper', this.collisionGroupB);

    this.launcher = new Launcher(
      this,
      this.gameWidth - 40,
      this.gameHeight - 40,
      50,
      this.ball
    );
    this.newGame();

    console.log(this.currentBall);

    // this.launcher.preUpdate(this.ball);
  }

  newGame() {
    console.log('NEW GAME');
    this.ball = new Ball(
      this,
      this.gameWidth - 30,
      this.gameHeight - 200,
      'ball',
      this.launcher
    );
  }

  gameEnd() {}

  resetBall() {
    if (this.gameBalls > 1) {
      if (this.ball.y > this.gameHeight - 20) {
        console.log(this.gameBalls);
        this.gameBalls = this.gameBalls - 1;
        this.currentBall++;
        this.ball = new Ball(
          this,
          this.gameWidth - 30,
          this.gameHeight - 200,
          'ball',
          this.launcher
        );
      }
    }
  }

  update() {
    this.resetBall();
  }
}
