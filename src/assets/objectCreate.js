export default class objectCreator {
  constructor(scene, typeOfObject, x, y, width, height, color) {
    this.scene = scene;
    this.typeOfObject = typeOfObject;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.createObject();
  }

  gameConfig() {
    const width = 800;
    const height = 1200;
    return { width, height };
  }

  createObject() {
    if (this.typeOfObject == 'rectangle') {
      let object = this.scene.add.rectangle(
        this.x,
        this.y,
        this.width,
        this.height,
        this.color
      );
      this.scene.matter.add.gameObject(object, {
        isStatic: true,
      });
    }
    return objectCreator;
  }
}
