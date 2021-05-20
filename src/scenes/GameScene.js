import Phaser from 'phaser';
import config from '../main';
import Launcher from '../assets/launcher';
import background from '../images/background.png';
import backgroundStripes from '../images/backgroundStripes.png';
import Ball from '../assets/ball';
import ballImage from '../images/ball.png';
import shapes from '../assets/physics.json';
import sheetJson from '../assets/pinball-sprites.json';
import sheetPng from '../images/pinball-sprites.png';
import Object from '../assets/object';
import Flipper from '../assets/flippers';
import LeftTrigger from '../images/leftTrigger.png';
import RightTrigger from '../images/rightTrigger.png';
import spring from '../images/spring.png';
import closingPinRight from '../images/closingPinRight.png';
import closingPinLeft from '../images/closingPinLeft.png';
import leftSmallBumper from '../images/leftSmallBumper.png';
import rightSmallBumper from '../images/rightSmallBumper.png';
import star from '../images/star.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.gameWidth = config.scale.width;
    this.gameHeight = config.scale.height;
    this.gameBalls = 0;
    this.score = 0;
    this.currentBall = 0;
  }

  preload() {
    this.matter.world.update60Hz();
    this.load.image('ball', ballImage);
    this.load.image('background', background);
    //this.load.image('LeftTrigger', LeftTrigger);
    //this.load.image('RightTrigger', RightTrigger);
    this.load.image('backgroundStripes', backgroundStripes);
    this.load.image('spring', spring);
    this.load.image('closingPinRight', closingPinRight);
    this.load.image('closingPinLeft', closingPinLeft);
    this.load.image('leftSmallBumper', leftSmallBumper);
    this.load.image('rightSmallBumper', rightSmallBumper);
    this.load.atlas('sheet', sheetPng, sheetJson);
    this.load.json('shapes', shapes);
    this.load.image('star', star);
  }

  create() {
    const shapes = this.cache.json.get('shapes');
    this.matter.world.setBounds(0, 0, this.gameWidth, this.gameHeight);
    this.back = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.back.scale = 1.15;
    this.backStrips = this.add.image(0, 0, 'backgroundStripes').setOrigin(0, 0);
    this.twoTimes = this.add.image(3, this.gameHeight - 150, 'sheet', '2x.png').setOrigin(0);
    this.blackHole = this.add.image(3, this.gameHeight - 50, 'sheet', 'blackHole.png').setOrigin(0); 
   
    const aPushed = this.input.keyboard.addKey('A');
    const dPushed = this.input.keyboard.addKey('D');

    aPushed.on(
      'down',
      function () {
        leftFlipper.flip();
      },
      this
    );

    aPushed.on(
      'up',
      function () {
       leftFlipper.release();
      },
      this
    );

    dPushed.on(
      'down',
      function () {
        rightFlipper.flip();
      },
      this
    );

    dPushed.on(
      'up',
      function () {
       rightFlipper.release();
      },
      this
    );

    const rightSmallBumper = new Object(this, this.gameWidth - this.gameWidth * 0.25, this.gameHeight * 0.45, "sheet", "rightSmallBumper.png", shapes.rightSmallBumper);
    const leftSmallBumper = new Object(this, this.gameWidth * 0.25, this.gameHeight * 0.45, "sheet", "leftSmallBumper.png", shapes.leftSmallBumper);
    const blackDividerRight = new Object(this, this.gameWidth - 70, this.gameHeight - 70, "sheet", "black_divider.png", shapes.black_divider);
    const blackDividerLeft = new Object(this, 70, this.gameHeight - 70, "sheet", "black_divider.png", shapes.black_divider);
    const topHalfMoon = new Object(this, 400, 68, "sheet", "topHalfMoon.png", shapes.topHalfMoon);
    const topBumperOne = new Object(this, this.gameWidth * 0.3, 250, "sheet", "topBumper.png", shapes.topBumper);
    const topBumperTwo = new Object(this, this.gameWidth * 0.5, 360, "sheet", "topBumper.png", shapes.topBumper);
    const topBumperThree = new Object(this, this.gameWidth * 0.7, 250, "sheet", "topBumper.png", shapes.topBumper);
    const leftBumper = new Object(this, this.gameWidth * 0.25, this.gameHeight * 0.7, "sheet", "leftBumper.png", shapes.leftBumper);
    const rightBumper = new Object(this, this.gameWidth - this.gameWidth * 0.25, this.gameHeight * 0.7, "sheet", "rightBumper.png", shapes.rightBumper);
    const leftRamp = new Object(this, this.gameWidth * 0.14, this.gameHeight * 0.744, "sheet", "leftRamp.png", shapes.leftRamp);
    const rightRamp = new Object(this, this.gameWidth - this.gameWidth * 0.14, this.gameHeight * 0.744, "sheet", "rightRamp.png", shapes.rightRamp);
    const leftFlipper = new Flipper(this, this.gameWidth * 0.31, this.gameHeight * 0.87, 'left', shapes.leftTrigger);
    const rightFlipper = new Flipper(this, this.gameWidth * 0.68, this.gameHeight * 0.87, 'right', shapes.rightTrigger);

    this.launcher = new Launcher(
      this,
      this.gameWidth - 25,
      this.gameHeight - 40,
      50,
      this.ball,
      'spring',
      'closingPinRight',
    );

    this.scoreText = this.add.text(this.gameWidth * 0.05, 0 , 'Score: ' + this.score, { fontSize: 18 }).setOrigin(0).setDepth(1);
    this.ballsLeftText = this.add.text(this.gameWidth  * 0.78 , 0, 'Balls left: ' + this.gameBalls, { fontSize: 18}).setOrigin(0).setDepth(1);
    this.newGame(); 
    this.collisions();
}

  newGame() {
    this.currentBall = 0 
    this.gameBalls = 3;
    this.score = 0;
    console.log('NEW GAME');
    this.getNewBall(); 
    this.updateBallsLeftText();
    this.updateScoreText();
  }

  getNewBall() {
    this.ball = new Ball(
      this,
      this.gameWidth - 30,
      this.gameHeight - 200,
      'ball',
      this.launcher, 
    );
    this.currentBall++; 
      }

  resetBall() {
      if (this.gameBalls >= 1 && this.ball.y > this.gameHeight - 20 ) {
          this.gameBalls--;
          this.getNewBall();
          this.updateBallsLeftText();
      }

      if(this.ball.getData('dead')) {
        this.ball.destroy(); 
        this.gameBalls--;
        this.getNewBall();
        this.updateBallsLeftText();
        this.launcher.resetValves();
      }
  } 

  endGame(){
    this.ball.destroy(); 
    console.log("Game end")
  }

  collisions() {
    this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {

      console.log(bodyA.label);
    
      if (bodyA.label === 'sideBumper') {
       bodyA.gameObject.setTint(0xffff00);  
      }
      if (bodyA.label === 'topBumper') {
        this.star = this.add.image(bodyA.gameObject.x,  bodyA.gameObject.y - 2, "star").setScale(1.1);
        this.star.setVisible(true);
      }
    });

    this.matter.world.on('collisionend', (event, bodyA, bodyB) => {
     
      if (bodyA.label === 'sideBumper') {
        this.score = this.score + 500;
        this.updateScoreText();
        bodyA.gameObject.clearTint(); 
      }
      if (bodyA.label === 'topBumper') {
        this.score = this.score + 1000;
        this.updateScoreText();
        this.star.setVisible(false);
      }
    });
  }

  updateScoreText() {
    this.scoreText.text = 'Score: ' + this.score; 
  }

  updateBallsLeftText() {
    this.ballsLeftText.text = 'Balls left: ' + this.gameBalls;  
  }

  update() {
  
    this.resetBall();

    if(this.gameBalls === 0){
      this.endGame();
      this.newGame();
    }  
  }
}
