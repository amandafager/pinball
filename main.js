'use strict';
import Phaser from 'phaser';
import GameScene from './src/scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 1200,
  },
  scene: [GameScene],
  physics: {
    default: 'matter',
    matter: {
      debug: true,
    },
  },
};

export default new Phaser.Game(config);