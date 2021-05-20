import Phaser from 'phaser';

export default class Launcher {
  constructor(scene, x, y, width, ball, spring, closingPinRight, CG) {
    scene.add.existing(this);
    this.scene = scene;
    this.width = width;
    this.height = 350;
    this.x = x;
    this.y = y;
    this.ball = ball;
    this.spring = spring;
    this.cg = CG;
    this.closingPinRight = closingPinRight;
    this.colliding = false;

    this.drawShape();
    this.releaseBall(this.ball);
    this.fill = 0;
    this.debug = this.scene.add.graphics();
    this.spacePushed = this.scene.input.keyboard.addKey('space');
    this.collisionTest();
  }

  drawShape() {
    let startLaunchPaddle = this.scene.add.image(
      this.x,
      this.y,
      this.spring,
      this.scene
    );

    this.scene.matter.add.gameObject(startLaunchPaddle, {
      isStatic: true,
      friction: 0,
      label: 'launcher',
    });

    startLaunchPaddle.setCollisionGroup(this.cg);

    let launchPaddleLockSensor = this.scene.add.rectangle(
      this.x + 10,
      this.y * 0.6,
      60,
      10
    );

    this.scene.matter.add.gameObject(launchPaddleLockSensor, {
      isSensor: true,
      isStatic: true,
      label: 'launchPaddleLockSensor',
    });

    this.launchPaddlePosition = startLaunchPaddle.y;
    this.startLaunchPaddle = startLaunchPaddle;

    this.launchPaddleLock = this.scene.add.image(
      this.x + 0,
      this.y * 0.88,
      'closingPinRight'
    );

    this.scene.matter.add.gameObject(this.launchPaddleLock, {
      isStatic: true,
      label: 'launchPaddleLock',
      setBody: {
        type: 'circle',
        radius: 18,
      },
    });
    this.launchPaddleLock.setPosition(
      this.launchPaddleLock.x + 100,
      this.launchPaddleLock.y
    );
  }

  resetValves() {
    this.launchPaddleLock.x += 100;
  }

  collisionTest() {
    const launchPaddleLock = this.launchPaddleLock;
    const gameWidth = this.x;
    console.log(launchPaddleLock.x, gameWidth);
    this.scene.matter.world.on('collisionend', function (event) {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;

        if (bodyA.label == 'launchPaddleLockSensor') {
          if (launchPaddleLock.x >= gameWidth) {
            setTimeout(() => {
              launchPaddleLock.setPosition(
                launchPaddleLock.x - 100,
                launchPaddleLock.y
              );
            }, 100);
          }
        }
      });
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

    if (pushLevel <= 3) (vx = 0), (vy = -5);

    if (pushLevel >= 4 && pushLevel <= 6) (vx = 0), (vy = -10);

    if (pushLevel >= 7 && pushLevel <= 10) (vx = 0), (vy = -20);

    if (pushLevel >= 11 && pushLevel <= 15) (vx = 0), (vy = -30);

    if (pushLevel >= 16) (vx = 10), (vy = -40);

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
          if (this.startLaunchPaddle.y <= 1240) {
            this.pushLevel = this.pushLevel + 1;
            this.startLaunchPaddle.setPosition(
              this.startLaunchPaddle.x,
              this.startLaunchPaddle.y + 2,
              null
            );
          }
        }, 50);
      },
      this
    );

    spacePushed.on(
      'up',
      function () {
        clearInterval(this.startTimer);
        let velocity = this.setBallVelocity(this.pushLevel);
        this.ball.updateVelocity(velocity.vx, velocity.vy);
        setTimeout(() => {
          this.startLaunchPaddle.setPosition(
            this.startLaunchPaddle.x,
            this.launchPaddlePosition,
            null
          );
        }, 50);
      },
      this
    );
  }
}
