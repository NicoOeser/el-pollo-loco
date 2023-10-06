class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endBossBar = new EndbossBar();
    throwableObjects = [];
    splash_sound = new Audio('audio/glass.mp3');
    endboss_sound = new Audio ('audio/el_pollo_loco.mp3')
    chicken_sound = new Audio('audio/chicken.mp3');
    coin_sound = new Audio('audio/collect_coin.mp3');
    game_sound = new Audio('audio/music.mp3');
    hurt_sound = new Audio('audio/hurt.mp3'); 
    bottle_sound = new Audio('audio/collect_bottle.mp3'); 
    audio = true;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkThrowObjects();
            this.checkBottleCollision();
            this.checkCoinCollision();
            this.checkCollisions();
            this.deleteThrowObject();
            this.chickenAttack();
            this.activateEndboss();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.UP && this.character.collectableBottle > 0) {
            if (!this.throttled) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.character.collectableBottle -= 10;
                this.bottleBar.setPercentageBottleBar(this.character.collectableBottle);
                this.throttled = true;

                setTimeout(() => {
                    this.throttled = false;
                }, 500);
            }
        }
    }

    checkCollisions() {
        if (!this.character.isHurt()) {
            this.level.enemies.forEach((enemy) => {
                this.checkEnemyCollision(enemy);
            });
        };
        this.checkBottleCollision();
        this.checkCoinCollision();
        this.checkThrowObjects();
        this.checkThrowableObjectCollision();
    }

    checkThrowableObjectCollision() {
        this.throwableObjects.forEach(bottle => {
            this.level.enemies.forEach(enemy => {
                this.bottleHitsEnemy(enemy, bottle);
                this.bottleHitsGround(bottle);
            });
        });
    }

    bottleHitsEnemy(enemy, bottle) {
        if (enemy.isColliding(bottle) && bottle.energy > 0 && bottle.isAboveGround() && (enemy instanceof Chicken || enemy instanceof SmallChicken)) {
            setTimeout(() => {
                this.deadEnemyDisappear(enemy);
              }, 500);
              this.splash_sound.play();
        }
    if (enemy.isColliding(bottle) && bottle.energy > 0 && bottle.isAboveGround() && enemy instanceof Endboss) {
        this.bottleHitsEndboss(enemy, bottle);
        enemy.hit();
        bottle.energy -= 100;
        enemy.isHurt();
        this.splash_sound.play();
    }
};

bottleHitsGround(bottle) {
    if (!bottle.isAboveGround()) {
        bottle.energy -= 100;
        bottle.speedX = 0;
        this.splash_sound.play();
    }
}

bottleHitsEndboss(enemy, bottle) {
    this.endBossBar.percentage -= 20;
    this.endBossBar.setPercentageEndbossBar(this.endBossBar.percentage);
    bottle.speedY = enemy;
    this.endboss_sound.volume = 0.3;
    this.endboss_sound.play();
}

checkEnemyCollision(enemy) {
    if (this.character.isColliding(enemy) && !this.character.isAboveGround() && (enemy instanceof Chicken || enemy instanceof SmallChicken || enemy instanceof Endboss) && enemy.energy > 0) {
        this.playerInvincible();
    }
    if (this.character.isColliding(enemy) && this.character.isAboveGround() && (enemy instanceof Chicken || enemy instanceof SmallChicken) && enemy.energy > 0) {
        enemy.energy -= 100;
        this.chicken_sound.play();
        this.character.lowJump();
        setTimeout(() => {
            this.deadEnemyDisappear(enemy);
        }, 500);
    }
}


deadEnemyDisappear() {
    let deadEnemies = [];
    for (let i = 0; i < this.level.enemies.length; i++) {
        let enemy = this.level.enemies[i];
        if (enemy.energy <= 0 && (enemy instanceof Chicken || enemy instanceof SmallChicken)) {
            deadEnemies.push(i);
        }
    }

    for (let i = deadEnemies.length - 1; i >= 0; i--) {
        let j = deadEnemies[i];
        this.level.enemies.splice(j, 1);
    }
}

deleteThrowObject() {
    for (let i = 0; i < this.throwableObjects.length; i++) {
        if (this.throwableObjects[i].energy == 0 && !this.throwableObjects[i].deleted || !this.throwableObjects[i].isAboveGround() && !this.throwableObjects[i].deleted) {
            this.throwableObjects[i].deleted = true;
            setTimeout(() => {
                if (this.throwableObjects[i].deleted) {
                    this.throwableObjects.splice(i, 1)
                }
            }, 500);
        }
    }
}

playerInvincible() {
    if (!this.invincible) {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentageHealthBar(this.character.energy);
                this.invincible = true; // Player can't be hit for 1 s
                setTimeout(() => {
                    this.invincible = false; // Player can be hit again after 1 s
                }, 1000);
            }
        });
    }
}

    checkBottleCollision() {
        for (let i = 0; i < this.level.bottles.length; i++) {
            let bottle = this.level.bottles[i];
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(i, 1);
                this.character.collectBottle();
                this.bottleBar.setPercentageBottleBar(this.character.collectableBottle);
                this.bottle_sound.volume = 0.2;
                this.bottle_sound.play();
            }
        }
    }

        checkCoinCollision() {
            for (let i = 0; i < this.level.coins.length; i++) {
                let coin = this.level.coins[i];
                if (this.character.isColliding(coin)) {
                    this.level.coins.splice(i, 1);
                    this.character.collectCoin();
                    this.coinBar.setPercentageCoinBar(this.character.collectableCoin);   
                    this.coin_sound.volume = 0.2;
                    this.coin_sound.play();          
            }
        }
    }

    checkThrowObjects() {
        if (this.keyboard.UP && this.character.collectableBottle > 0) {
            if (!this.throttled) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.character.collectableBottle -= 10;
                this.bottleBar.setPercentageBottleBar(this.character.collectableBottle);
                this.throttled = true;
                setTimeout(() => {
                    this.throttled = false; // allows Player to throw 1 Bottle every 500ms
                }, 500);
            }
        }
    }

    chickenAttack() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.x - this.character.x < 350 && enemy.energy > 0 && enemy instanceof Chicken) {
                enemy.rushAttack();
            }
        })
    }

    activateEndboss() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.x - this.character.x < 500 && enemy.energy > 0 && enemy instanceof Endboss) {
                enemy.speed = 3;
            }
        })
    }
 
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0); 
        // ------ Space for fixed objects ------
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.level.enemies.forEach((enemy) => {
            if (enemy.x - this.character.x < 500 && enemy.energy > 0 && enemy instanceof Endboss) {
                this.addToMap(this.endBossBar);
            }
        });
        this.ctx.translate(this.camera_x, 0); 

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.ctx.translate(-this.camera_x, 0);


        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


}
