import Phaser from 'phaser';
import config from '../main';
import objectCreator from '../assets/objectCreate';
import background from '../images/BackgroundPinball.png';
import ballImage from '../images/ellipse.png';
import Ball from '../assets/ball';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.gameWidth = config.scale.width;
    this.gameHeight = config.scale.height;
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

    this.ball = new Ball(
      this,
      this.gameWidth - 30,
      this.gameHeight - 200,
      'ball'
    );
    console.log(this.ball);
    this.resetBall();
  }

  resetBall() {
    if (this.ball.y > this.gameHeight - 20) {
      console.log('Reset');
      this.ball.destroy();
      this.ball = new Ball(
        this,
        this.gameWidth - 30,
        this.gameHeight - 200,
        'ball'
      );
      //this.launcher.attachBallOnLaunch(this.ball);
    }
  }

  update() {
    //this.resetBall();
  }
}
