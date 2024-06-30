class Cloud extends MovableObject{
    y = 25;
    width = 800;
    height = 300;
    inverval6;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 4000;
        this.animateClouds();
    }

    animateClouds()  {
        this.inverval6 = setStoppableInterval(() => {
            if (!pause) {
            this.x -= 0.5;
            }
        }, 1000/60);
        // this.moveLeft();
    }


}