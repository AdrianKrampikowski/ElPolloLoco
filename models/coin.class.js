class Coin extends MovableObject {
    height = 250;
    width = 250;
    offset = {
        top: 75,
        bottom: 75,
        right: 75,
        left: 75,
    };

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 150 + Math.random() * 1000;
        this.y = 200 - Math.random() * 150;
    }
}