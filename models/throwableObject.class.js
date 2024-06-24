class ThrowableObject extends MovableObject {
    offset = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }
    inverval11;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = x;
        this.y = y;
        this.height = 100;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.acceleration = 2;
        this.applyGravityOnBottle();
        this.inverval11 = setStoppableInterval(() => {
            if (!pause) {
            this.x += 40;
            }
        }, 1000 / 15);
    }
}