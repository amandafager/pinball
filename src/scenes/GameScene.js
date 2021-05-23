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
import spring from '../images/spring.png';
import star from '../images/star.png';
import greenDot from '../images/greenDot.png';

import soundTrigger from '../sounds/trigger.mp3';
import soundStart from '../sounds/start.wav';
import soundBumperHit from '../sounds/bumperHit.wav';
import soundLeftSpringLaunch from '../sounds/leftSpringLaunch.wav';


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
    this.load.image('backgroundStripes', backgroundStripes);
    this.load.image('spring', spring);
    this.load.image('greenDot', greenDot);
    this.load.atlas('sheet', sheetPng, sheetJson);
    this.load.json('shapes', shapes);
    this.load.image('star', star);
    this.load.audio('triggerHit', soundTrigger);
    this.load.audio('startGame', soundStart);
    this.load.audio('bumperHit', soundBumperHit);
    this.load.audio('leftSpringLaunch', soundLeftSpringLaunch);
  }

  create() {
    this.soundTriggers = this.sound.add('triggerHit');
    this.soundStartGame = this.sound.add('startGame');
    this.bumperHit = this.sound.add('bumperHit');
    this.leftSpringLaunch = this.sound.add('leftSpringLaunch');


    
    const shapes = this.cache.json.get('shapes');
    this.matter.world.setBounds(0, 0, this.gameWidth, this.gameHeight);
    this.back = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.back.scale = 1.15;
    this.backStrips = this.add.image(0, 0, 'backgroundStripes').setOrigin(0, 0);
    this.twoTimes = this.add.image(3, this.gameHeight - 150, 'sheet', '2x.png').setOrigin(0);
    

    
    this.spacePushed = this.input.keyboard.addKey('space');
    this.spacePushed.enabled = false;
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
    const topHalfMoon = new Object(this, this.gameWidth - ((800 * 0.5) + 2), 67, "sheet", "topHalfMoon.png", shapes.topHalfMoon);
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
    this.leftSpring = this.add.image(this.gameWidth - this.gameWidth + 25, this.gameHeight - 30, 'spring');
    this.matter.add.gameObject(this.leftSpring, {
      isStatic: true,
      friction: 0,
      label: "leftSpring"
    });

    this.leftSpringLock = this.matter.add.sprite(this.leftSpring.x + 8, this.leftSpring.y - 136,"sheet","closingPinLeft.png",{shape: shapes.closingPinLeft,});

    this.launcher = new Launcher(
      this,
      this.gameWidth - 25,
      this.gameHeight - 40,
      50,
      this.ball,
      'spring',
      'sheet',
      'closingPinRight.png',
      shapes.closingPinRight,
      this.leftSpringLaunch
    );




    let startGame = document.querySelector("button");
    startGame.addEventListener("click", () => {
      document.querySelector(".welcomeScreen").remove();
      this.soundStartGame.play();
      this.newGame(); 
      this.gameStarted = true;
      this.spacePushed.enabled = true;
    }); 

    this.addTextOnScene();
    this.collisions();
  }


  addTextOnScene() {
    let scoreTextX; 
    let scoreTextY; 
    let ballsLeftTextX;
    let ballsLeftTextY;  

    const brave = window.navigator.brave;
    if(brave) {
      console.log("brave")
      scoreTextX = this.gameWidth * 0.05; 
      scoreTextY = - 95; 
      ballsLeftTextX = this.gameWidth  * 0.78;
      ballsLeftTextY= - 95; 
    }
    else {
      console.log("no brave")
      scoreTextX = this.gameWidth * 0.05; 
      scoreTextY = 15; 
      ballsLeftTextX = this.gameWidth  * 0.78;
      ballsLeftTextY= 15; 
    }

    this.scoreText = this.add.text(scoreTextX, scoreTextY, 'Score: ' + this.score, { fontSize: 18 }).setOrigin(0).setDepth(1);
    this.ballsLeftText = this.add.text(ballsLeftTextX , ballsLeftTextY, 'Balls left: ' + this.gameBalls, { fontSize: 18}).setOrigin(0).setDepth(1);
  }

  newGame() {  
    this.currentBall = 0 
    this.gameBalls = 3;
    this.score = 0;
    console.log('NEW GAME');
    this.getNewBall();
    this.updateBallsLeftText();
    this.updateScoreText();

    let loadingGreenDots = 1;
    this.greenDotsGroup = this.add.group();
    setInterval(() => {
      if(loadingGreenDots <= 4){
         if(loadingGreenDots === 4){ this.greenDotsGroup.add(this.add.image(106, 960, 'greenDot')); this.greenDotsGroup.add(this.add.image(695, 960, 'greenDot')); } 
         if(loadingGreenDots === 3){ this.greenDotsGroup.add(this.add.image(134, 978, 'greenDot')); this.greenDotsGroup.add(this.add.image(668, 978, 'greenDot')); } 
         if(loadingGreenDots === 2){ this.greenDotsGroup.add(this.add.image(161, 995, 'greenDot')); this.greenDotsGroup.add(this.add.image(642, 995, 'greenDot')); } 
         if(loadingGreenDots === 1){ this.greenDotsGroup.add(this.add.image(188, 1012, 'greenDot')); this.greenDotsGroup.add(this.add.image(615, 1012, 'greenDot')); } 
      }else{
        this.greenDotsGroup.clear(true);
        clearInterval();
      }
      loadingGreenDots++;
    }, 850);
    this.leftSpringLock.setPosition(this.leftSpring.x + 8 - this.leftSpringLock.width, this.leftSpring.y - 136);
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
    this.spacePushed.enabled = false;
    this.ball.destroy(); 
    document.querySelector(".finalScore").textContent = `finalScore: ${this.score}`;
    document.querySelector(".gameOver").classList.remove('hidden');
    let startGame = document.querySelector("button");
    startGame.addEventListener("click", () => {
      document.querySelector(".gameOver").classList.add('hidden');
      this.gameStarted = true;
      this.spacePushed.enabled = true;
    });
  }

  collisions() {
    this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {

      console.log(bodyA.label, bodyB.label);

      if(bodyA.label == 'leftSpringSensor'){
        console.log(this.leftSpring.y);
        this.launchLeftTimer = setInterval(() => {
          if (this.leftSpring.y <= 1230) {
            if(this.ball.getData('onLeftSpring')) { 
              this.ball.x = this.leftSpring.x;
              this.ball.y = this.leftSpring.y - this.leftSpring.height / 2 - this.ball.height / 2;
              this.ball.updateVelocity(0, 0);
            } 
            this.leftSpring.setPosition(
              this.leftSpring.x,
              this.leftSpring.y + 2,
              null
            );
          }
          if(this.leftSpring.y >= 1230){
            let velocity = this.launcher.setBallVelocity(80);
            this.ball.updateVelocity(velocity.vx, velocity.vy);
            this.leftSpringLaunch.play();
            this.ball.setData('onLeftSpring', false);
            setTimeout(() => {
              this.leftSpringLock.setPosition(this.leftSpringLock.x -  (this.leftSpringLock.x - (this.leftSpringLock.width / 2)) , this.leftSpringLock.y); 
            }, 300);
            clearInterval(this.launchLeftTimer);
          }
        }, 50);

        setTimeout(() => {
          this.leftSpring.setPosition(
            this.leftSpring.x,
            this.leftSpring.y = this.gameHeight - 30,
            null
          );
        }, 50);
      }
    
      if (bodyA.label === 'sideBumper') {
       bodyA.gameObject.setTint(0xffff00);  
      }
      if (bodyA.label === 'topBumper') {
        this.star = this.add.image(bodyA.gameObject.x,  bodyA.gameObject.y - 2, "star").setScale(1.1);
        this.star.setVisible(true);
        this.bumperHit.play();
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
