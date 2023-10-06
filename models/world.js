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
        if (enemy.isColliding(bottle) && bottle.energy > 0 && bottle.isAboveGround()) {
            enemy.energy -= 100;
            bottle.energy -= 100;
           if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
            setTimeout(() => {
                this.deadEnemyDisappear(enemy);
            }, 500);
           }
           if (enemy instanceof Endboss) {
            this.endBossBar.percentage -= 20;
            this.endBossBar.setPercentageEndbossBar(this.endBossBar.percentage);
            console.log('Endboss HP', this.endBossBar.percentage)
        }
        };
    }

    bottleHitsGround(bottle) {
        if (!bottle.isAboveGround()) {
            bottle.energy -= 100;
            bottle.speedX = 0;
        }
    }

    bottleHitsEndboss() {

    }
    

    checkEnemyCollision(enemy) {
        if (this.character.isColliding(enemy) && !this.character.isAboveGround() && (enemy instanceof Chicken || enemy instanceof SmallChicken || enemy instanceof Endboss) && enemy.energy > 0) {
            this.playerInvincible();
        }
        if (this.character.isColliding(enemy) && !this.character.isAboveGround() && (enemy instanceof Chicken || enemy instanceof SmallChicken) && enemy.energy > 0) {
            enemy.energy -= 100;
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
          if (enemy.energy <= 0) {
            deadEnemies.push(i);
          }
        }

        for (let i = deadEnemies.length - 1; i >= 0; i--) {
          let j = deadEnemies[i];
          this.level.enemies.splice(j, 1);
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

    /**
     * check Player collision with bottle && pick it up
     */
    checkBottleCollision() {
        for (let i = 0; i < this.level.bottles.length; i++) {
            let bottle = this.level.bottles[i];
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(i, 1);
                this.character.collectBottle();
                this.bottleBar.setPercentageBottleBar(this.character.collectableBottle);
            }
        }
    }


    /**
     * check Player collision with coin && pick it up
     */
    checkCoinCollision() {
        for (let i = 0; i < this.level.coins.length; i++) {
            let coin = this.level.coins[i];
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                this.character.collectCoin();
                this.coinBar.setPercentageCoinBar(this.character.collectableCoin);               
            }
        }
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
        if (this.character.x >= 1500) {
            this.addToMap(this.endBossBar);
        }
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
        mo.drawFrame(this.ctx);

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