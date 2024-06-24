class World {
    character = new Character();
    statusbar = new Statusbar();
    bottlebar = new Bottlebar();
    coinbar = new Coinbar();
    finalbosshealthbar = new Finalbosshealthbar();
    throwableObject = new ThrowableObject();
    level = level1;
    ctx;
    canvas;
    keyboard;
    cameraX = 250;
    collectedBottleCount = 0;
    finalboss = this.level.enemies[this.level.enemies.length - 1];
    screenWidth;
    screenHeight;
    hitCounter = 0;
    bottleArray = [];
    hitFinalBoss = 0;
    finalBossLife = 3;
    isFinalBossVisible = false;
    sound;
    playCollisionChicken = sound[0];
    playFinalBoss = sound[1];
    playWinGame = sound[2];
    playCollectBottleAudio = sound[3];
    playCollectCoinAudio = sound[4];
    playWalkAudio = sound[5];
    playJumpAudio = sound[6];
    playBackgroundAudio = sound[7];
    playHitAudio = sound[8];
    worldIntervalArray = [];
    inverval12;
    inverval13;
    inverval14;

    constructor(canvas, keyboard, screenWidth, screenHeight, sound) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.finalBossArrival();
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.canvas.width = this.screenWidth;
        this.canvas.height = this.screenHeight;
        this.sound = sound;
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        this.inverval12 = setStoppableInterval(() => {
            if (!pause) {
                this.checkCollisions();
            }
        }, 50);
        this.worldIntervalArray.push(this.inverval12);
        this.inverval13 = setStoppableInterval(() => {
            if (!pause) {
                this.checkThrowObject();
            }
        }, 300);
        this.worldIntervalArray.push(this.inverval13);
    }

    checkCollisions() {
        this.characterCollisionCheckAllEnemies(this.enemy);
        if (this.finalboss.isColliding(this.throwableObject)) {
            this.finalBossGetHit();
        }
        this.characterCollectingBottles();
        this.characterCollectingCoins();
    }

    characterCollisionCheckAllEnemies(enemy) {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.characterCollisionCheckFinalBoss(enemy)) {
                    this.characterCollisionCheck(enemy);
                } else if (this.hitCounter == 0) {
                    this.characterGetHit();
                }
            }
        })
    }

    characterCollisionCheckFinalBoss(enemy) {
        return this.character.speedY < 0 &&
            this.character.y < 160 &&
            enemy.x < 1150
    }

    characterCollectingBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottleCollionCheck(bottle);
            }
        })
    }

    characterCollectingCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinCollisionCheck(coin);
            }
        })
    }

    characterCollisionCheck(enemy) {
        this.hitCounter++;
        enemy.img.src = enemy.imagesDead;
        enemy.startMovingChicken = false;
        this.addToMap(enemy)
        setTimeout(() => {
            enemy.y = -300;
            enemy.x = -300;
            this.hitCounter = 0;
        }, 500);
        this.playCollisionChicken.play();
    }

    characterGetHit() {
        this.character.hit();
        this.statusbar.setPercentagesHealth(this.character.energy);
        this.playHitAudio.play();
    }

    finalBossGetHit() {
        let timepassed = new Date().getTime() - this.hitFinalBoss;
        this.hitFinalBoss = new Date().getTime();
        if (timepassed > 500) {
            this.finalBossLife--;
            this.finalbosshealthbar.setPercentagesFinalboss(this.finalBossLife);
        }
        if (this.finalBossLife == 0) {
            this.finalboss.finalBossDead = true;
            setTimeout(() => {
                document.getElementById("gameOverScreen").style.display = "flex";
            }, 1500);
        }
    }

    bottleCollionCheck(bottle) {
        let bottleNum = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(bottleNum, 1)
        if (this.character.bottles < 6) {
            this.character.bottles += 1;
        }
        this.character.collectBottle();
        this.bottlebar.setPercentagesBottle(this.character.bottleCount)
        bottle.x = -300;
        bottle.y = -300;
        this.collectedBottleCount++;
        this.playCollectBottleAudio.play();
    }

    coinCollisionCheck(coin) {
        this.character.collectCoin();
        this.character.bottles += 1;
        this.coinbar.setPercentagesCoin(this.character.coinCount);
        coin.x = -300;
        coin.y = -300;
        this.playCollectCoinAudio.play();
    }

    checkThrowObject() {
        if (this.throwBottleAndFinalBossAlive()) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
            if (this.collectedBottleCount > 0) {
                this.throwableObject = bottle;
                this.throwableObject.throw()
                this.collectedBottleCount--;
                this.character.throwBottle();
                this.bottlebar.setPercentagesBottle(this.character.bottleCount);
            }
        }
    }

    throwBottleAndFinalBossAlive() {
        return this.keyboard.Control &&
            this.finalBossLife != 0
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.statusbar);
        this.addToMap(this.bottlebar);
        this.addToMap(this.coinbar);
        this.addToMap(this.finalbosshealthbar);
        this.ctx.translate(this.cameraX, 0);
        this.addToMap(this.character);
        this.addToMap(this.throwableObject);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);

        this.ctx.translate(-this.cameraX, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawBorder(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    characterSeeFinalBossAndFinalBossAlive() {
        return this.character.x > 1000 &&
            this.finalBossLife != 0
    }
    finalBossDeadAndCharacterAlive() {
        return this.finalBossLife == 0 &&
            !this.character.isDead()
    }

    finalBossArrival() {
        this.inverval14 = setStoppableInterval(() => {
            if (!pause) {
                this.finalBossFight();
            }
        }, 100);
        this.worldIntervalArray.push(this.inverval14);
    }

    finalBossStartsMoving() {
        this.finalboss.startMoving = true;
        this.playFinalBoss.loop = true;
        this.playFinalBoss.play();
        this.finalbosshealthbar.y = 20;
        this.isFinalBossVisible = true;
    }

    finalBossFight() {
        if (this.characterSeeFinalBossAndFinalBossAlive()) {
            this.finalBossStartsMoving();
        }
        if (this.finalBossDeadAndCharacterAlive()) {
            this.finalBossDead();
        }
        if (this.character.isDead()) {
            this.characterDies();
        }
        if (this.character.x > 101) {
            this.characterStartsMoving();
        }
    }

    finalBossDead() {
        this.playFinalBoss.loop = false;
        this.playFinalBoss.pause();
        this.playBackgroundAudio.pause();
        this.playWinGame.play();
        this.finalbosshealthbar.y = -300;
        setTimeout(() => {
            this.playWinGame.pause();
            setTimeout(() => {
                startGame = "false";
            }, 1000);
        }, 5000);
    }

    characterDies() {
        this.playFinalBoss.loop = false;
        this.playFinalBoss.pause();
        this.playBackgroundAudio.pause();
    }

    characterStartsMoving() {
        this.level.enemies.forEach((x) => {
            x.startMovingChicken = true;
        })
    }
}