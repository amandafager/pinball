import Phaser from 'phaser';
import config from '../main';
import objectCreator from '../assets/objectCreate';
import background from '../images/BackgroundPinball.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.gameWidth = config.scale.width;
    this.gameHeight = config.scale.height;
  }

  preload() {
    this.matter.world.update60Hz();

    this.load.image('background', background);
  }

  create() {
    this.matter.world.setBounds(0, 0, this.gameWidth, this.gameHeight);
    this.back = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.back.scale = 1.1;

    // this.leftFlipper = new Flipper(this, 250, 1100, 'left', 'A');
    // this.rightFlipper = new Flipper(this, 475, 1100, 'right', 'D');

    // new createObjects(this, 180, 890, 'pointerBumper', this.collisionGroupB);
    // new createObjects(this, 540, 890, 'rightPointerBumper', this.collisionGroupB);
    // new createObjects(this, this.gameConfig().width * 0.5, 250, 'bumper10', this.collisionGroupB);
    // new createObjects(this, this.gameConfig().width * 0.59, 360, 'bumper20', this.collisionGroupB);
    // new createObjects(this, this.gameConfig().width * 0.7, 260, 'bumper30', this.collisionGroupB);
  }

  update() {}
}
