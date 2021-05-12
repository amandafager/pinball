import Phaser from 'phaser';
import config  from '../../main';

export default class GameScene extends Phaser.Scene {

    constructor()
    {
        super('GameScene');
        this.gameWidth = config.scale.width;
        this.gameHeight = config.scale.height;
    }

    preload()
    {
        this.matter.world.update60Hz();
    }

    create()
    {
        this.matter.world.setBounds(0, 0, this.gameWidth, this.gameHeight);
    }
    
    update()
    {

    }

}