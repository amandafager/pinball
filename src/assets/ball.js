import Phaser from 'phaser';
import config from '../main.js';

export default class Ball extends Phaser.Physics.Matter.Image {
  gameWidth = config.scale.width;
  gameHeight = config.scale.height;

  constructor(scene, x, y, texture) {
    super(scene.matter.world, x, y, texture);

    scene.add.existing(this);
    this.setPosition(x, y);
    this.setTexture(texture);
    this.scale = 0.5;
    this.setBody({
      type: 'circle',
      radius: 16,
    });
    this.setAngularVelocity(0.01);
    this.setBounce(0.6);
    this.setFrictionAir(3);
    this.setFriction(0, 0, 0);
    this.setData('onStart', true);
  }

  updateVelocity(vx, vy) {
    if (this.getData('onStart')) {
      this.setVelocityX(vx);
      this.setVelocityY(vy);
      this.setData('onStart', false);
    }
  }

  resetBall() {
    if (this.y > this.gameHeight - 20) {
      console.log('Reset');
      this.destroy();
    }
  }
}
