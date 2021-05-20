import Phaser from 'phaser';
import config from '../main.js';

export default class Ball extends Phaser.Physics.Matter.Image {
  gameWidth = config.scale.width;
  gameHeight = config.scale.height;

  constructor(scene, x, y, texture, launcher, CG) {
    super(scene.matter.world, x, y, texture, CG);

    scene.add.existing(this);
    this.setTexture(texture);
    this.scale = 1.5;
    this.setBody({
      type: 'circle',
      radius: 18,
    });
    this.setCollisionGroup(CG);
    this.setAngularVelocity(0.01);
    this.setBounce(0 /* 0.6 */);
    this.setFrictionAir(0.0001 /* 1 */);
    this.setDensity(0.001);
    this.setFriction(0 /* 0, 0, 0 */);
    this.setData('onStart', true);
    this.setCollisionGroup(4);
    this.preUpdate();
    this.ballCollsion();
    this.launcher = launcher;
    this.launcher.attachBallOnLaunch(this);
  }

  updateVelocity(vx, vy) {
    if (this.getData('onStart')) {
      this.setVelocityX(vx);
      this.setVelocityY(vy);
      this.setData('onStart', false);
    }
  }

  ballCollsion() {
    const ball = this;
    this.scene.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
      if (bodyA.label === 'launcher') {
        if (!this.getData('onStart')) this.setData('onStart', true);
      }
      if (bodyA.label === 'launchPaddleLockSensor') {
        console.log('launchPaddleLockSensor');
      }
    });
  }

  preUpdate() {
    if (this.y > this.gameHeight - 20) {
      console.log('Reset');
      this.destroy();
    }
  }
}
