class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    levelStartX = -500;
    levelEndX = 5000;

    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}