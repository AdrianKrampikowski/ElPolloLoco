class BackgroundObject extends MovableObject {
    height = 500;
    width = 1000;

    constructor(imagePath, x, y) {
        super().loadImage(imagePath)
        this.x = x;
        this.y = y;
    }
}