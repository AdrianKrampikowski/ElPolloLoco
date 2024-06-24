class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    bottleCount = 0;
    coinCount = 0;
    lastHit = 0;
    characterPosition = 0;
    moveFinalboss = false;
    isHit;
    maxImgLength = 0;
    finalBossImage = 0;
    inverval8;
    inverval9;
    inverval10;

    applyGravity() {
        this.inverval8 = setStoppableInterval(() => {
            if (!pause) {
                if (this.isAboveGround() || this.speedY > 0)
                    this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    applyGravityOnBottle() {
        this.inverval9 = setStoppableInterval(() => {
            if (!pause) {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                }
            }
        }, 1000 / 30);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 155;
        }
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationFinalBoss(images) {
        if (this.maxImgLength < 3) {
            let i = this.finalBossImage;
            let path = images[i];
            this.img = this.imageCache[path];
            this.finalBossImage++;
            this.maxImgLength++;
        }
    }

    // Bessere Formel zur Kollisionsberechnung (Genauer) von: https://developer-akademie.teachable.com/courses/928259/lectures/40384719
    isColliding(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
    }

    hit() {
        let timepassed = new Date().getTime() - this.lastHit;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        } if (timepassed > 400) {
            this.energy -= 20;
        }
    }

    collectBottle() {
        this.bottleCount += 20;
        if (this.bottleCount > 100) {
            this.bottleCount = 100;
        }
    }

    throwBottle() {
        this.bottleCount -= 20;
        if (this.bottleCount < 0) {
            this.bottleCount = 0;
        }
    }

    collectCoin() {
        this.coinCount += 20;
        if (this.coinCount > 100) {
            this.coinCount = 100;
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 1000;
    }

    isDead() {
        return this.energy == 0;
    }

    getCharacterPosition(x, name) {
        this.inverval10 = setStoppableInterval(() => {
            if (!pause) {
                this.characterPosition = x;
                if (x > 1000) {
                    this.moveFinalboss = true;
                }
            }
        }, 1000);
    }
}