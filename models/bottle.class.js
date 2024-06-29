class Bottle extends MovableObject {
    height = 100;
    width = 100;
    y = 350;
    offset = {
        top: 25,
        bottom: 25,
        right: 25,
        left: 25
    }
    
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 2000 + Math.random() * 2000;
    }
}