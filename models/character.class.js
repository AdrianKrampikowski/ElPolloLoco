class Character extends MovableObject {
    height = 300;
    width = 150;
    speed = 7;
    bottles = 0;
    lastSound = 0;
    intervalTest;
    lastWalk;
    characterDirection;
    world;
    offset = {
        top: 150,
        bottom: 0,
        right: 50,
        left: 50,
    };
    inverval1;
    inverval2;

    imagesWalking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    imagesJumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    imagesHurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    imagesDead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    imagesIdle = [
        // 'img/2_character_pepe/1_idle/idle/I-1.png',
        // 'img/2_character_pepe/1_idle/idle/I-2.png',
        // 'img/2_character_pepe/1_idle/idle/I-3.png',
        // 'img/2_character_pepe/1_idle/idle/I-4.png',
        // 'img/2_character_pepe/1_idle/idle/I-5.png',
        // 'img/2_character_pepe/1_idle/idle/I-6.png',
        // 'img/2_character_pepe/1_idle/idle/I-7.png',
        // 'img/2_character_pepe/1_idle/idle/I-8.png',
        // 'img/2_character_pepe/1_idle/idle/I-9.png',
        // 'img/2_character_pepe/1_idle/idle/I-10.png'

        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'

    ];
    imagesGameEnd = [
        'img/9_intro_outro_screens/game_over/example.png'
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.loadImages(this.imagesIdle);
        this.applyGravity();
        this.animateCharacter();
    }

    animateCharacter() {
        this.inverval1 = setStoppableInterval(() => {
            if (this.noPauseAndFinalBossAlive()) {
                this.allIfStatementsForMovingCharacter();
                super.getCharacterPosition(this.x, "Character");
            }
        }, 1000 / 60);
        this.inverval2 = setStoppableInterval(() => {
            if (!pause) {
                this.playCharacterAnimation();
            }
        }, 100);
    }

    noPauseAndFinalBossAlive() {
        return !pause &&
            this.world.finalBossLife != 0
    }

    allIfStatementsForMovingCharacter() {
        if (this.characterCanMoveRight()) this.moveRight();
        if (this.characterCanMoveLeft()) this.moveLeft();
        if (this.characterCanJump()) this.jump();
        if (this.keypressForWalking()) this.playWalkingSound();
        if (this.stopWalkingSound()) this.world.playWalkAudio.pause();
        this.world.cameraX = -this.x + 100;
    }

    characterCanMoveRight() {
        return this.world.keyboard.RIGHT &&
            this.x < this.world.level.levelEndX &&
            !this.isDead()
    }

    characterCanMoveLeft() {
        return this.world.keyboard.LEFT &&
            this.x > this.world.level.levelStartX &&
            !this.isDead()
    }

    characterCanJump() {
        return this.world.keyboard.SPACE &&
            !this.isAboveGround() &&
            !this.isDead()
    }
    keypressForWalking() {
        if (this.world.keyboard.RIGHT) {
            this.characterDirection = 'right'
        } else if (this.world.keyboard.LEFT) {
            this.characterDirection = 'left'
        }
        return this.world.keyboard.RIGHT ||
            this.world.keyboard.LEFT
    }

    stopWalkingSound() {
        return !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT
    }

    endingScreenStopIntervallsStopWalkingSound() {
        setTimeout(() => {
            document.getElementById("endingScreen").style.display = "flex";
            this.clearAllIntervals();
            this.world.playWalkAudio.pause();
        }, 1000);
    }

    playCharacterAnimation() {
        if (this.isDead() == true) {
            this.playAnimation(this.imagesDead);
            this.endingScreenStopIntervallsStopWalkingSound();
        } else if (this.isHurt()) {
            this.playAnimation(this.imagesHurt);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.imagesJumping);
        } else if (this.world.finalBossLife != 0) {
            this.playCharacterWalkingAnimation();
        }
    }

    playCharacterWalkingAnimation() {
        const now = Date.now();
        if (this.keypressForWalking()) {
            if (this.intervalTest) {
                clearInterval(this.intervalTest);
                this.intervalTest = null;
            }
            this.playAnimation(this.imagesWalking);
            this.lastWalk = now;
        } else if (now - this.lastWalk >= 1000) {
            if (!this.intervalTest) {
                this.intervalTest = setInterval(() => {
                    this.playAnimation(this.imagesIdle);
                }, 500);
            }
        }
    }

    playWalkingSound() {
        let timepassed = new Date().getTime() - this.lastSound;
        this.lastSound = new Date().getTime();
        if (timepassed > 250) {
            this.world.playWalkAudio.loop = true;
            this.world.playWalkAudio.play();
        }
    }

    jump() {
        clearInterval(this.intervalTest);
        this.intervalTest = null;
        this.speedY = 20;
        this.world.playJumpAudio.play();
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}