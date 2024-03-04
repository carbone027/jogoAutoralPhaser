import Cena1 from './cenas/cena1.js';
import Menu from './cenas/menu.js';

var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scale: {
        mode: Phaser.Scale.FIT,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 300},
            debug: true,
        },
    },
    pixelArt: false,
    scene: [Menu, Cena1]
};

var game = new Phaser.Game(config);