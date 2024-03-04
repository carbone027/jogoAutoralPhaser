export default class Cena1 extends Phaser.Scene {

    constructor () {
        super ({key: 'Cena1'});
    };

    preload () {
        this.load.image('bg1', 'assets/map/background.png');
        this.load.image('objects', 'assets/map/objetos.png');
        this.load.image('border', 'assets/Sprites/14-TileSets/Terrain (32x32).png');
        this.load.image('platform', 'assets/Sprites/14-TileSets/Decorations (32x32).png');
        this.load.tilemapTiledJSON('map', 'assets/map/map.json');
        this.load.spritesheet('falling', 'assets/Sprites/01-King Human/Fall (78x58).png', {frameWidth: 78, frameHeight: 58});
        this.load.spritesheet('idle', 'assets/Sprites/01-King Human/Idle (78x58).png', {frameWidth: 78, frameHeight: 58});
        this.load.spritesheet('jumping', 'assets/Sprites/01-King Human/Jump (78x58).png', {frameWidth: 78, frameHeight: 58});
        this.load.spritesheet('chr', 'assets/Sprites/01-King Human/Ground (78x58).png', {frameWidth: 78, frameHeight: 58});
        this.load.spritesheet('running', 'assets/Sprites/01-King Human/Run (78x58).png', {frameWidth: 78, frameHeight: 58});
        this.load.image('diamond', 'assets/Sprites/12-Live and Coins/diamond.png');
    };
    create () {
        this.add.image(640, 360, 'bg1');
        this.add.image(640, 360, 'objects');

        this.map = this.make.tilemap({key: 'map'});
        var tilesetBorder = this.map.addTilesetImage ('border', 'border');
        var tilesetPlatform = this.map.addTilesetImage ('platform', 'platform');
        this.border = this.map.createLayer('border', [tilesetBorder, tilesetPlatform], 0, 40);

        this.chr = this.physics.add.sprite(200, 550, 'chr')
        .setScale(1.6)
        .setSize(22, 30)
        this.chr.setCollideWorldBounds(true);
        this.map.setCollisionByProperty({collider: true});
        this.physics.add.collider(this.chr, this.border);
        this.chr.setBounce(0.2);

        this.keys = this.input.keyboard.addKeys("A, W, S, D, Left, Up, Down, Right");

        this.anims.create({
            key: 'running',
            frameRate: 4,
            frames: this.anims.generateFrameNumbers('running', {start: 0, end: 7}),
            repeat: -1,
        });
        this.anims.create({
            key: 'jumping',
            frameRate: 4,
            frames: this.anims.generateFrameNumbers('jumping'),
            repeat: -1,
        });
        this.anims.create({
            key: 'idle',
            frameRate: 6,
            frames: this.anims.generateFrameNumbers('idle', {start: 0, end: 10}),
            repeat: -1,
        });

        /* this.diamond = this.physics.add.sprite(400, 500, "diamond");
        this.diamond.setCollideWorldBounds(true);
        this.diamond.setBounce(0.7);
        this.physics.add.collider(this.diamond, this.border);

        this.diamonds = 0;

        this.score = this.add.text("Diamantes: " + this.diamonds, {fontSize: "45px", fill: "#d0d3d9"});

        this.physics.add.overlap(this.chr, this.diamond, function() {
            this.diamond.setVisible(false);
            this.newDiamond = Phaser.Math.RND.between(300, 980);
            this.diamond.setPosition(this.newDiamond, 500);
            this.score.setText("Diamantes: " + this.diamonds);
            this.diamond.setVisible(true);
        }); */
    };
    update () {
        if (this.keys.D.isDown || this.keys.Right.isDown) {
            this.chr.anims.play('running');
            this.chr.setVelocityX(200).setFlip(false, false).setOffset(20, 15);
        } else if (this.keys.A.isDown || this.keys.Left.isDown) {
            this.chr.anims.play('running');
            this.chr.setVelocityX(-200).setFlip(true, false).setOffset(35, 15);
        } else {
            this.chr.anims.play('idle');
            this.chr.setVelocityX(0);
        };
        if ((this.keys.W.isDown || this.keys.Up.isDown) && this.chr.body.onFloor()) {
            this.chr.anims.play('jumping')
            this.chr.setVelocityY(-200);
        }
    };
}