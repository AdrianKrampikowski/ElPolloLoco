class Finalbosshealthbar extends DrawableObject {
    percentageFinalboss = 100;
    x = 500;
    y = -500;
    height = 100;
    width = 300;

    imagesFinalbossHealthbar = [
        'img/7_statusbars/2_statusbar_endboss/finalBossHealth100.png',
        'img/7_statusbars/2_statusbar_endboss/finalBossHealth80.png',
        'img/7_statusbars/2_statusbar_endboss/finalBossHealth60.png',
        'img/7_statusbars/2_statusbar_endboss/finalBossHealth40.png',
        'img/7_statusbars/2_statusbar_endboss/finalBossHealth20.png',
        'img/7_statusbars/2_statusbar_endboss/finalBossHealth0.png',
    ];

    constructor() {
        super();
        this.loadImages(this.imagesFinalbossHealthbar);
        this.setPercentagesFinalboss(3);
    }

    setPercentagesFinalboss(percentage) {
        this.percentageFinalboss = percentage;
        let path = this.imagesFinalbossHealthbar[this.resolveImagesFinalbossIndex()];
        this.img = this.imageCache[path];
    }
    
    resolveImagesFinalbossIndex() {
        if (this.percentageFinalboss == 3) {
            return 0;
        } else if (this.percentageFinalboss == 2) {
            return 1;
        } else if (this.percentageFinalboss == 1) {
            return 3;
        } else if (this.percentageFinalboss == 0) {
            return 5;
        }
    }
}