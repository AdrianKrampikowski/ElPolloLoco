class Statusbar extends DrawableObject {
    percentageHealth = 100;
    x = 10;
    y = -25;
    height = 100;
    width = 300;

    imagesHealthbar = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.imagesHealthbar);
        this.setPercentagesHealth(100);
    }

    setPercentagesHealth(percentage) {
        this.percentageHealth = percentage;
        let path = this.imagesHealthbar[this.resolveImagesHealthIndex()];
        this.img = this.imageCache[path];
    }

    resolveImagesHealthIndex() {
        if (this.percentageHealth == 100) {
            return 5;
        } else if (this.percentageHealth == 80) {
            return 4;
        } else if (this.percentageHealth == 60) {
            return 3;
        } else if (this.percentageHealth == 40) {
            return 2;
        } else if (this.percentageHealth == 20) {
            return 1;
        } else {
            return 0;
        }
    }
}