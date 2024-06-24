class Finalboss extends MovableObject {
    height = 400;
    width = 300;
    y = 75;
    finalbossMoveDirection = true;
    startMoving = false;
    finalBossDead = false;
    offset = {
        top: 100,
        bottom: 100,
        right: 50,
        left: 50
    }
    inverval7;
    currentImage = 0;

    imagesWalking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    imagesFinalbossDead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesFinalbossDead);
        this.x = 1750;
        this.animateFinalboss();
    }

    animateFinalboss() {
        this.inverval7 = setStoppableInterval(() => {
            if (!pause) {
                if (this.finalBossDead == false) {
                    this.finalBossAlive();
                } else {
                    this.finalBossDied();
                }
            }
        }, 1000 / 4);
    }
    
    finalBossAlive() {
        this.playAnimation(this.imagesWalking);
        if (this.startMoving == true && this.finalbossMoveDirection == true) {
            this.otherDirection = false;
            this.x -= 50;
            if (this.x < 1300) {
                this.finalbossMoveDirection = false;
            }
        } else if (this.finalbossMoveDirection == false) {
            this.otherDirection = true;
            this.x += 50;
            if (this.x > 1750) {
                this.finalbossMoveDirection = true;
            }
        }
    }

    finalBossDied() {
        this.playAnimationFinalBoss(this.imagesFinalbossDead);
        setTimeout(() => {
            this.x = -500;
            this.y = -500;
        }, 3000);
    }
}