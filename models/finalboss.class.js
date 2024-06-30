class Finalboss extends MovableObject {
    height = 400;
    width = 300;
    y = 75;
    currentImage = 0;
    lastAttackTime = 0;
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
    inverval17;

    imagesWalking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    imagesHurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        // 'img/4_enemie_boss_chicken/4_hurt/G21.png',
        // 'img/4_enemie_boss_chicken/4_hurt/G22.png',
        // 'img/4_enemie_boss_chicken/4_hurt/G22.png',
        // 'img/4_enemie_boss_chicken/4_hurt/G23.png',
        // 'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    imagesAttack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
    ];
    imagesFinalbossDead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesFinalbossDead);
        this.x = 4750;
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

    animateHurt() {
        this.playAnimation(this.imagesHurt);
        let repeatCount = 0;
        const maxRepeats = 2;
        const repeatAnimation = () => {
            if (repeatCount < maxRepeats) {
                setTimeout(() => {
                    this.playAnimation(this.imagesHurt);
                    repeatCount++;
                    repeatAnimation();
                }, this.imagesHurt.length * 25);
            }
        };
        repeatAnimation();
    }

    finalBossAlive() {
        this.playAnimation(this.imagesWalking);
        if (this.startMoving == true && this.finalbossMoveDirection == true) {
            this.otherDirection = false;
            this.x -= 50;
            if (this.x < 4000) {
                this.finalbossMoveDirection = false;
            }
        } else if (this.finalbossMoveDirection == false) {
            this.otherDirection = true;
            this.x += 50;
            if (this.x > 4750) {
                this.finalbossMoveDirection = true;
            }
        }
    }

    finalBossAttack() {
        const now = Date.now();
        const cooldown = 1000;
        if (now - this.lastAttackTime >= cooldown && this.finalbossMoveDirection == true) {
            this.lastAttackTime = now;
            this.stopAnimation();
            let attackFrameIndex = 0;
            const attackFrameInterval = 100;
            this.inverval17 = setInterval(() => {
                if (attackFrameIndex < this.imagesAttack.length) {
                    this.loadImage(this.imagesAttack[attackFrameIndex]);
                    attackFrameIndex++;
                } else {
                    clearInterval(this.inverval17);
                    this.playAnimation(this.imagesWalking);
                }
            }, attackFrameInterval);
        }
    }

    stopAnimation() {
        clearInterval(this.inverval7);
    }

    finalBossDied() {
        this.playAnimationFinalBoss(this.imagesFinalbossDead);
        setTimeout(() => {
            this.x = -500;
            this.y = -500;
        }, 3000);
    }
}