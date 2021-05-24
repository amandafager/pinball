import Phaser from 'phaser';
import config from '../main.js';

export default class Ball extends Phaser.Physics.Matter.Image {
  gameWidth = config.scale.width;
  gameHeight = config.scale.height;

  constructor(scene, x, y, texture, launcher) {
    super(scene.matter.world, x, y, texture);

    scene.add.existing(this);
    this.setTexture(texture);
    this.scale = 1.5;
    this.setBody({
      type: 'circle',
      radius: 18,
    });

    this.setAngularVelocity(0.01);
    this.setBounce(0.2);
    this.setFrictionAir(0.0001);
    this.setDensity(0.001);
    this.setFriction(0);
    this.setData('onStart', true);
    this.preUpdate();
    this.ballCollision();
    this.launcher = launcher;
    this.launcher.attachBallOnLaunch(this);
  }

  updateVelocity(vx, vy) {
    this.setVelocityX(vx);
    this.setVelocityY(vy);
  }

  ballCollision() {
    this.scene.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
      if (bodyA.label === 'launcher') {
        // this.setBounce(0);
        if (!this.getData('onStart'))
          this.setData('onStart', true) && this.setData('dead', true);
      } else if (bodyA.label == 'leftSpring') {
        if (!this.getData('onLeftSpring')) this.setData('onLeftSpring', true);
      } else {
        // this.setBounce(1);
      }
    });
  }

  preUpdate() {
    if (this.y > this.gameHeight - 20) {
      this.destroy();
    }
  }
}
