class ThrowableObject extends MovableObject {
    offset = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }
    inverval11;

    imagesBottleRotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = x;
        this.y = y;
        this.height = 100;
        this.loadImages(this.imagesBottleRotation);
        this.throw();
    }

    throw(characterDirection) {
        this.speedY = 30;
        this.acceleration = 2;
        this.applyGravityOnBottle();
        this.inverval11 = setStoppableInterval(() => {
            if (!pause) {
                    this.x += 40;
                this.playAnimation(this.imagesBottleRotation);
            }
        }, 1000 / 12);
    }
}