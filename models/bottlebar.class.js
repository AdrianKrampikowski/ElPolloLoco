class Bottlebar extends DrawableObject {
    percentageBottle = 0;
    x = 10;
    y = 50;
    height = 100;
    width = 300;

    imagesBottlebar = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.imagesBottlebar);
        this.setPercentagesBottle(0);
    }

    setPercentagesBottle(percentage) {
        this.percentageBottle = percentage;
        let path = this.imagesBottlebar[this.resolveImagesBottleIndex()];
        this.img = this.imageCache[path];
    }
    
    resolveImagesBottleIndex() {
        if (this.percentageBottle == 0) {
            return 0;
        } else if (this.percentageBottle == 20) {
            return 1;
        } else if (this.percentageBottle == 40) {
            return 2;
        } else if (this.percentageBottle == 60) {
            return 3;
        } else if (this.percentageBottle == 80) {
            return 4;
        } else {
            return 5;
        }
    }
}