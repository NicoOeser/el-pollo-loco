let level1;

function initLevel() {
    level1 = new Level (
        createNewLevel1Enemies(),
        createNewLevel1Coins(),
        createNewLevel1Bottles(),
        createNewLevel1Clouds(),
        createNewLevel1BackgroundObjects()
    )
}


/**
* This function creates and returns an array of enemies.
* @returns An array of different enemy objects
*/
function createNewLevel1Enemies(){
    return [
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
        new Endboss()
    ]
}


/**
* This function creates and returns an array of coins.
* @returns An array of coin objects
*/
function createNewLevel1Coins(){
    return [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ]
}


/**
* This function creates and returns an array of bottles.
* @returns An array of bottle objects
*/
function createNewLevel1Bottles(){
    return [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ]
}


/**
* This function creates and returns an array of clouds.
* @returns An array of cloud objects on position(...)
*/
function createNewLevel1Clouds(){
    return [
        new Cloud(100),
        new Cloud(600),
        new Cloud(1100),
        new Cloud(1600),
        new Cloud(2000),
        new Cloud(2500),
    ]
}


/**
* This function generates an array of background objects.These objects represent different layers of the game's background scenery.
* @returns An array containing instances of background objects for creating a multi-layered background effect.
*/
function createNewLevel1BackgroundObjects(){
    return [
        new BackgroundObject('assets/img/5_background/layers/air.png', -719),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('assets/img/5_background/layers/air.png', 0),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('assets/img/5_background/layers/air.png', 719),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('assets/img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 719 * 2),

        new BackgroundObject('assets/img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719 * 3)
    ]
}