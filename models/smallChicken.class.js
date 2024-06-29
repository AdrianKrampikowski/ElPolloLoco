class SmallChicken extends MovableObject {
    height = 80;
    y = 380;
    offset = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }
    inverval15;
    inverval16;

    imagesWalking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    ];
    imagesDead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 750 + Math.random() * 4000;
        this.loadImages(this.imagesWalking);
        this.animateChicken();
        this.speed = 0.25 + Math.random() * 5;
    }
    animateChicken() {
        this.inverval15 = setStoppableInterval(() => {
            if (!pause) {
                if (this.startMovingChicken == true) {
                    this.moveLeft();
                    this.otherDirection = false;
                } else if (this.startMovingChicken == false) {
                    this.speed = 0;
                }
            }
        }, 1000 / 60);
        this.inverval16 = setStoppableInterval(() => {
            if (!pause) {
                if (this.startMovingChicken == true) {
                    this.playAnimation(this.imagesWalking);
                }
            }
        }, 1000 / 4);
    }
}