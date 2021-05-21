
export default class Flipper extends Phaser.Scene  {
  constructor(scene, x, y, orientation, shapes, soundTrigger) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.shapes = shapes;
    this.blockOffsetX = 45;
    this.blockOffsetY = 70;
    this.flipperOffsetX = 25;
    this.flipperOffsetY = 20;
    this.flipperLength = 126;
    this.flipperWidth = 40;
    this.speed = 60;
    this.startPosition = 108;
    this.endPosition = 141;
    this.isFlipping = false;
    this.soundTrigger = soundTrigger;

    if(this.orientation === 'right'){
        this.blockOffsetX = -this.flipperOffsetY * 2;
        this.flipperOffsetX = -this.flipperOffsetX;
    }

    this.block = this.scene.matter.add.image(this.x + this.blockOffsetX,this.y + this.blockOffsetY, 'rectA', this.scene, {
        isStatic: true
    })

    this.block.scaleX = .02;
    this.block.scaleY = .1;
    this.block.originX = 1;
    this.block.originY = 0;
    this.block.visible = false;

    //Pivot point
    this.pivot = this.scene.matter.add.image(this.x, this.y, null, this.scene);
    this.pivot.setScale(.2);
    this.pivot.setCircle(1);
    this.pivot.setStatic(true);
    
    
    let rectA = Phaser.Physics.Matter.Matter.Bodies.rectangle(this.x + this.flipperOffsetX , this.y + this.flipperOffsetY, this.flipperLength, this.flipperWidth, {
        chamfer: 0,
    })

    this.flipperBody = this.scene.matter.body.create({
        parts: [ rectA ]
    })

    if (this.orientation === 'left') {
        this.flipper = this.scene.matter.add.sprite(this.x, this.y, "sheet", "LeftTrigger.png", {
            shape: this.shapes,
          });
        this.flipper.setExistingBody(this.flipperBody);

    } else if (this.orientation === 'right') {
        this.flipper = this.scene.matter.add.sprite(this.x, this.y, "sheet", "RightTrigger.png", {
            shape: this.shapes,
          }).setExistingBody(this.flipperBody);
    } else {
       
    }

    this.flipper.setDepth(2);
    this.flipper.displayOriginY = this.flipperWidth / 2 + 5;


    this.pin = this.scene.matter.add.constraint(this.pivot, this.flipper);
    this.pin.stiffness = 0.9;
    this.pin.length = 0;

    this.pistonPin = this.scene.matter.add.constraint(this.flipper, this.block);
    this.pistonPin.length = this.startPosition;
    this.flipper.body.parts[1].label = 'flipper';


    if (this.orientation === 'left') {
        this.flipper.displayOriginX = 93;
        this.positionPin();
    }
    if (this.orientation === 'right') {
        this.flipper.displayOriginX = 70;
        this.positionPin();
    }
    
  }

    positionPin(){
        if(this.orientation === 'left'){
            this.pin.pointA = {
                x: 5,  
                y: 5
            }
            this.pin.pointB = {
                x: -this.flipperLength/2, 
                y: -this.flipperWidth/2 + 20
            }
            this.pistonPin.pointA = {
                x: this.flipperLength/2.5, 
                y: -60
            }
        }
        if (this.orientation === 'right') {
            this.pin.pointA = {
                x: 5,  
                y: 5
            }
            this.pin.pointB = {
                x: this.flipperLength/2, 
                y: -this.flipperWidth/2 + 20
            }
            this.pistonPin.pointA = {
                x: -this.flipperLength/2.5, 
                y: -65
            }
        }

    };
    

    flip(soundTriggers){
        
        soundTriggers.play();
        this.isFlipping = true
        this.scene.tweens.add({
            targets: this.pistonPin,
            length: this.endPosition+30,
            duration: this.speed
        })
    }

    release(){
        setTimeout(()=>{
            this.isFlipping = false
        }, 100)
        this.scene.tweens.add({
            targets: this.pistonPin,
            length: this.startPosition,
            duration: this.speed
        })
    }
}
