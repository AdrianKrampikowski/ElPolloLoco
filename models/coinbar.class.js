class Coinbar extends DrawableObject {
    percentageCoin = 0;
    x = 10;
    y = 125;
    height = 100;
    width = 300;

    imagesCoinbar = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'

    ];

    constructor() {
        super();
        this.loadImages(this.imagesCoinbar);
        this.setPercentagesCoin(0);
    }

    setPercentagesCoin(percentage) {
        this.percentageCoin = percentage;
        let path = this.imagesCoinbar[this.resolveImagesCoinIndex()];
        this.img = this.imageCache[path];
    }
    resolveImagesCoinIndex() {
        if (this.percentageCoin == 0) {
            return 0;
        } else if (this.percentageCoin == 20) {
            return 1;
        } else if (this.percentageCoin == 40) {
            return 2;
        } else if (this.percentageCoin == 60) {
            return 3;
        } else if (this.percentageCoin == 80) {
            return 4;
        } else {
            return 5;
        }
    }
}