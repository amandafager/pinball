import Phaser from 'phaser';

export default class Object extends Phaser.Scene {
  constructor(scene, x, y, sheet, texture, shapes, CG) {
    super(scene);

    scene.add.existing(this);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.texture = texture;
    this.sheet = sheet;
    this.shapes = shapes;
    this.cg = CG;
    const obj = this.scene.matter.add.sprite(0, 0, this.sheet, this.texture, {
      shape: this.shapes,
    });
    obj.setCollisionGroup(this.cg);
    obj.setPosition(this.x + obj.centerOfMass.x, this.y + obj.centerOfMass.y);

    //obj.setFlipX(90);
    //obj.setVelocity(10, -10);
  }
}
