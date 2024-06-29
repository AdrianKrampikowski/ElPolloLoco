let level1;

function initLevel() {
    level1 = new Level([
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),

        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),

        new Finalboss()
    ],
        [
            new Cloud(),
            new Cloud()
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -999, 0),
            new BackgroundObject('img/5_background/layers/air.png', 0, 0),
            new BackgroundObject('img/5_background/layers/air.png', 999, 0),
            new BackgroundObject('img/5_background/layers/air.png', 1998, 0),
            new BackgroundObject('img/5_background/layers/air.png', 2997, 0),
            new BackgroundObject('img/5_background/layers/air.png', 3996, 0),
            new BackgroundObject('img/5_background/layers/air.png', 4995, 0),

            new BackgroundObject('img/5_background/layers/3_third_layer/full.png', -1000, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 0, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 1000, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 2000, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 3000, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 4000, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 5000, 0),

            new BackgroundObject('img/5_background/layers/2_second_layer/full.png', -1000, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 0, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 1000, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 2000, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 3000, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 4000, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 5000, 0),

            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', -1000, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 0, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 1000, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 2000, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 3000, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 4000, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 5000, 0),


            // new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -999, 0),
            // new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0),
            // new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 1000, 0),
            // new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2000, 0),

            // new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -999, 0),
            // new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 0),
            // new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 1000, 0),
            // new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2000, 0),
            // new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -999, 0),
            // new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0),
            // new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 1000, 0),
            // new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2000, 0)
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ]
    )
};