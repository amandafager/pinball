import Phaser from 'phaser';
import config from '../main';
import ballImage from '../images/ball.png';
import background from '../images/BackgroundPinball.png';
import Ball from '../assets/ball';
import Launcher from '../assets/launcher';

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
  }

  create() {
    this.matter.world.setBounds(0, 0, this.gameWidth, this.gameHeight);
    this.back = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.back.scale = 1.15;

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
