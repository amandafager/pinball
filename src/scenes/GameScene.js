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
import soundTrigger from '../sounds/trigger.mp3';


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.gameWidth = config.scale.width;
    this.gameHeight = config.scale.height;
    this.gameBalls = 0;
    this.score = 0;
    this.currentBall = 0;
    this.gameStarted = false;
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
    this.load.audio('triggerHit', soundTrigger);
  }

  create() {
    this.soundTriggers = this.sound.add('triggerHit');
    
    const shapes = this.cache.json.get('shapes');
    this.matter.world.setBounds(0, 0, this.gameWidth, this.gameHeight);
    this.back = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.back.scale = 1.15;
    this.backStrips = this.add.image(0, 0, 'backgroundStripes').setOrigin(0, 0);
    this.twoTimes = this.add.image(3, this.gameHeight - 150, 'sheet', '2x.png').setOrigin(0);
    
   
    const aPushed = this.input.keyboard.addKey('A');
    const dPushed = this.input.keyboard.addKey('D');


    aPushed.on(
      'down',
      function () {
        leftFlipper.flip(this.soundTriggers);
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
        rightFlipper.flip(this.soundTriggers);
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

    const rightSmallBumper = new Object(this, this.gameWidth - this.gameWidth * 0.17, this.gameHeight * 0.40, "sheet", "rightSmallBumper.png", shapes.rightSmallBumper);
    const leftSmallBumper = new Object(this, this.gameWidth * 0.17, this.gameHeight * 0.40, "sheet", "leftSmallBumper.png", shapes.leftSmallBumper);
    const blackDividerRight = new Object(this, this.gameWidth - 70, this.gameHeight - 70, "sheet", "black_divider.png", shapes.black_divider);
    const blackDividerLeft = new Object(this, 70, this.gameHeight - 70, "sheet", "black_divider.png", shapes.black_divider);
    const topHalfMoon = new Object(this, 400, 68, "sheet", "topHalfMoon.png", shapes.topHalfMoon);
    const topBumperOne = new Object(this, this.gameWidth * 0.35, 200, "sheet", "topBumper.png", shapes.topBumper);
    const topBumperTwo = new Object(this, this.gameWidth * 0.5, 350, "sheet", "topBumper.png", shapes.topBumper);
    const topBumperThree = new Object(this, this.gameWidth * 0.65, 200, "sheet", "topBumper.png", shapes.topBumper);
    const leftBumper = new Object(this, this.gameWidth * 0.25, this.gameHeight * 0.7, "sheet", "leftBumper.png", shapes.leftBumper);
    const rightBumper = new Object(this, this.gameWidth - this.gameWidth * 0.25, this.gameHeight * 0.7, "sheet", "rightBumper.png", shapes.rightBumper);
    const leftRamp = new Object(this, this.gameWidth * 0.14, this.gameHeight * 0.744, "sheet", "leftRamp.png", shapes.leftRamp);
    const rightRamp = new Object(this, this.gameWidth - this.gameWidth * 0.14, this.gameHeight * 0.744, "sheet", "rightRamp.png", shapes.rightRamp);
    const leftFlipper = new Flipper(this, this.gameWidth * 0.31, this.gameHeight * 0.87, 'left', shapes.leftTrigger, this.soundTriggers);
    const rightFlipper = new Flipper(this, this.gameWidth * 0.68, this.gameHeight * 0.87, 'right', shapes.rightTrigger, this.soundTriggers);


    let leftSpringSensor = this.add.rectangle(25, this.gameHeight - 130, 60, 10);
    this.matter.add.gameObject(leftSpringSensor, { isSensor: true, isStatic: true, label: 'leftSpringSensor'});
    this.leftSpring = this.add.image(25, this.gameHeight - 30, 'spring');
    this.matter.add.gameObject(this.leftSpring, {
      isStatic: true,
      friction: 0,
    });

    this.launcher = new Launcher(
      this,
      this.gameWidth - 25,
      this.gameHeight - 40,
      50,
      this.ball,
      'spring',
      'sheet',
      'closingPinRight.png',
      shapes.closingPinRight
    );

    this.scoreText = this.add.text(this.gameWidth * 0.05, 0 , 'Score: ' + this.score, { fontSize: 18 }).setOrigin(0).setDepth(1);
    this.ballsLeftText = this.add.text(this.gameWidth  * 0.78 , 0, 'Balls left: ' + this.gameBalls, { fontSize: 18}).setOrigin(0).setDepth(1);

    let startGame = document.querySelector("button");
    startGame.addEventListener("click", () => {
      document.querySelector(".welcomeScreen").remove();
      this.newGame(); 
      this.gameStarted = true;
    });
    
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
      30,
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
          this.launcher.resetValves();
      }

      if(this.ball.getData('dead')) {
        this.ball.destroy(); 
        this.gameBalls--;
        this.getNewBall();
        this.updateBallsLeftText();
      }
  } 

  endGame(){
    this.ball.destroy(); 
    
    document.querySelector(".finalScore").textContent = `finalScore: ${this.score}`;
    document.querySelector(".gameOver").classList.remove('hidden');
    
  }

  collisions() {
    this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {

      console.log(bodyA.label, bodyB.label);

      if(bodyA.label == 'leftSpringSensor'){
        console.log(this.leftSpring.y);
        this.launchLeftTimer = setInterval(() => {
          if (this.leftSpring.y <= 1230) {
            this.leftSpring.setPosition(
              this.leftSpring.x,
              this.leftSpring.y + 2,
              null
            );
          }
          if(this.leftSpring.y >= 1230){
           //this.ball.setVelocityY(-20);
            let velocity = this.launcher.setBallVelocity(80);
            this.ball.updateVelocity(velocity.vx, velocity.vy);
            clearInterval(this.launchLeftTimer);
          }
        }, 50);
      }
    
      if (bodyA.label === 'sideBumper') {
       bodyA.gameObject.setTint(0xffff00);  
      }
      if (bodyA.label === 'topBumper') {
        this.star = this.add.image(bodyA.gameObject.x,  bodyA.gameObject.y - 2, "star").setScale(1.1);
        this.star.setVisible(true);
      }
      if (bodyA.label === 'sideSmallBumper') {
        bodyA.gameObject.setTint(0xffff00);  
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
      if (bodyA.label === 'sideSmallBumper') {
        this.score = this.score + 700;
        this.updateScoreText();
        bodyA.gameObject.clearTint(); 
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
    if(this.gameStarted){
      this.resetBall();

      if(this.gameBalls === 0){
        this.endGame();
        this.newGame();
      }  
    }
  }
}
