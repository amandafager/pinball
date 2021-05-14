import { paths, collisionGroups } from './functions';
export default class createObjects extends Phaser.Scene {
  constructor(scene, positionX, positionY, name, group = null) {
    super(scene);
    this.scene = scene;
    this.positionX = positionX;
    this.positionY = positionY;
    this.name = name;
    this.group = group;
    this.drawShape();
  }

  drawShape() {
    let pathWay;
    let object = this.scene.matter.add.image(
      this.positionX,
      this.positionY,
      this.name,
      null
    );

    if (this.name == 'leftBumper') {
      pathWay = paths().pointerBumper;
    }
    if (this.name == 'rightBumper') {
      pathWay = paths().rightPointerBumper;
    }
    if (this.name == 'topBumper') {
      pathWay = paths().topBumper;
    }
    if (this.name == 'topHalfMoon') {
      pathWay = paths().topHalfMoon;
      object.setStatic(true);
    }

    if (this.name == 'sideX') {
      pathWay = paths().rails;
    }
    let objectName = this.name;

    object.setExistingBody(
      this.scene.matter.add.fromVertices(
        this.positionX,
        this.positionY,
        pathWay
      )
    );

    object.setStatic(true);
    object.setVelocity(10, -10);
    object.setCollisionCategory(4);
    if (this.name == 'sideX') {
      //   object.visible(false);
    }
  }
}
