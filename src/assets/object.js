import Phaser from 'phaser';

export default class Object extends Phaser.Scene {
  constructor(scene, x, y, sheet, texture, shapes) {
    super(scene);

    scene.add.existing(this);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.texture = texture;
    this.sheet = sheet;
    this.shapes = shapes;
    const obj = this.scene.matter.add.sprite(0, 0, this.sheet, this.texture, {
      shape: this.shapes,
    });

    switch (this.shapes.label) {
      case 'leftBumper':
      case 'rightBumper':
        obj.body.restitution = 1;

        break;

      case 'leftRamp':
      case 'rightRamp':
      case 'topHalfMoon':
        obj.body.restitution = 0;
        break;

      default:
        obj.body.restitution = 1;
        break;
    }

    obj.setPosition(this.x + obj.centerOfMass.x, this.y + obj.centerOfMass.y);
  }
}
