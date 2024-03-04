export default class Menu extends Phaser.Scene {

    constructor () {
        super ({key: 'Menu'});
    };

    preload () {
        this.load.image('bg', 'assets/menu/background.png')
        this.load.image('button', 'assets/menu/button.png')
    };
    create () {
        this.add.image(640, 360, 'bg')

        this.playButton = this.add.image(640, 360, 'button');
        this.playButton.setInteractive();
        this.playButton.on('pointerup', this.play, this);
    };
    update () {

    };

    play () {
        this.playButton.disableInteractive();
        this.scene.start('Cena1')
    };
}