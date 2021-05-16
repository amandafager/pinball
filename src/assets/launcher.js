import Phaser from 'phaser';

export default class Launcher {
  constructor(scene, x, y, width, ball) {
    scene.add.existing(this);
    this.scene = scene;
    this.width = width;
    this.height = 150;
    this.x = x;
    this.y = y;
    this.ball = ball;

    this.drawShape();
    this.releaseBall(this.ball);

    this.fill = 0;
    this.debug = this.scene.add.graphics();
    this.spacePushed = this.scene.input.keyboard.addKey('space');
  }

  drawShape() {
    let startLaunchPaddle = this.scene.add.rectangle(
      this.x,
      this.y,
      this.width,
      this.height,
      0x0000ff
    );

    this.scene.matter.add.gameObject(startLaunchPaddle, {
      isStatic: true,
      friction: 0,
      label: 'launcher',
    });
  }

  attachBallOnLaunch(ball) {
    this.ball = ball;
    this.ball.x = this.x;
    this.ball.y = this.y - this.height / 2 - this.ball.height / 2;
    this.ball.setVelocity(0);
    this.ball.setData('onStart', true);
  }

  setBallVelocity(pushLevel) {
    let vx;
    let vy;

    if (pushLevel <= 3) (vx = 0), (vy = -10);

    if (pushLevel >= 4 && pushLevel <= 6) (vx = 0), (vy = -20);

    if (pushLevel >= 7 && pushLevel <= 10) (vx = 0), (vy = -30);

    if (pushLevel >= 11) (vx = 0), (vy = -40);

    return { vx, vy };
  }

  releaseBall(ball) {
    const spacePushed = this.scene.input.keyboard.addKey('space');
    this.ball = ball;

    spacePushed.on(
      'down',
      function () {
        this.pushLevel = 0;
        this.startTimer = setInterval(() => {
          this.pushLevel = this.pushLevel + 1;
        }, 50);
      },
      this
    );

    spacePushed.on(
      'up',
      function () {
        clearInterval(this.startTimer);
        console.log(this.pushLevel);
        let velocity = this.setBallVelocity(this.pushLevel);
        console.log(velocity.vy);
        this.ball.updateVelocity(velocity.vx, velocity.vy);
      },
      this
    );
  }

  preUpdate(ball) {
    this.ball = ball;
    let a = this.ball.getData('onStart');

    if (a) {
      console.log(a);

      setInterval(() => {
        const size = 120;

        var isUp = this.spacePushed.isUp;
        if (isUp) {
          this.debug.clear();
          this.fill = 0;
        }

        var isDown = this.spacePushed.isDown;
        if (isDown) {
          if (this.fill < size) this.fill = this.fill + 3;
        }

        this.debug.fillStyle(0x2d2d2d);
        this.debug.fillRect(64, 64, 30, size);

        this.debug.fillStyle(0x2dff2d);
        this.debug.fillRect(64, 64, 30, this.fill);

        this.debug.setPosition(800 - 20, 1200 + 40);
        this.debug.setAngle(180);
        this.onStart = false;
      }, 10);
    }
  }
}
