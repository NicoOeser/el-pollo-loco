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
    chicken_sound = new Audio('audio/chicken.mp3');
    crushed_sound = new Audio('audio/crushed.mp3');
    coin_sound = new Audio('audio/collect_coin.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    collectBottle_sound = new Audio('audio/collect_bottle.mp3');
    throw_sound = new Audio('audio/throw.mp3');
    game_sound = new Audio('audio/game.mp3');
    win_sound = new Audio('audio/win.mp3');
    lost_sound = new Audio('audio/lose.mp3');
    audio = true;


    constructor(canvas) {
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
            this.checkCollisions();
            this.deleteThrowObject();
            this.chickenAttack();
            this.activateEndboss();
            this.playIngameBackgroundMusic();
            this.checkWinGame();
            this.checkLostGame();
        }, 50);
    }

    checkWinGame() {
        let gameOver = document.getElementById('game-over');
        if (this.playerBeatGame()) {
            gameOver.classList.remove('d-none');
            hideControls();
            setTimeout(() => {
                this.playWinSound();
                this.clearAllIntervals();
            }, 800);
        }
    }

    playerBeatGame() {
        return this.character.energy > 0 && this.endBossBar.percentage == 0
    }

    playWinSound() {
        if (this.audio) {
            this.win_sound.volume = 0.3;
            this.win_sound.play();
        }
        this.game_sound.pause();
    }

    checkLostGame() {
        let lostGame = document.getElementById('lost-game');
        if (this.gameBeatPlayer() || this.surpassEndboss()) {
            lostGame.classList.remove('d-none');
            hideControls();
            setTimeout(() => {
                this.playLoseSound();
                this.clearAllIntervals();
            }, 600);
        }
    }

    gameBeatPlayer() {
        return this.character.energy <= 0 && this.character.collectableCoin <= 100 && this.endBossBar.percentage > 0
    }

    surpassEndboss() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.x - this.character.x < 0 && enemy instanceof Endboss) {
                this.character.energy = 0;
                this.statusBar.setPercentageHealthBar(this.character.energy);
            }
        })
    }

    playLoseSound() {
        if (this.audio) {
            this.lost_sound.play();
        }
        this.game_sound.pause();
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
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
        if (this.bottleHitsNormalEnemy(enemy, bottle)) {
            enemy.energy -= 100;
            bottle.energy -= 100;
            setTimeout(() => {
                this.deadEnemyDisappear(enemy);
            }, 500);

        }
        if (this.bottleHitsBossEnemy(enemy, bottle)) {
            this.bottleHitsEndboss(enemy, bottle);
            enemy.hit();
            bottle.energy -= 100;
            enemy.isHurt();
            this.playBottleSplashSound();
        }
    };

    bottleHitsNormalEnemy(enemy, bottle) {
        return enemy.isColliding(bottle) && bottle.energy > 0 && bottle.isAboveGround() && (enemy instanceof Chicken || enemy instanceof SmallChicken)
    }

    bottleHitsBossEnemy(enemy, bottle) {
        return enemy.isColliding(bottle) && bottle.energy > 0 && bottle.isAboveGround() && enemy instanceof Endboss
    }

    playBottleSplashSound() {
        if (this.audio) {
            this.splash_sound.play();
        }
    }

    bottleHitsGround(bottle) {
        if (!bottle.isAboveGround()) {
            bottle.energy -= 100;
            bottle.speedX = 0;
            bottle.speedXLeft = 0;
            this.playBottleSplashSound();
        }
    }

    bottleHitsEndboss(enemy, bottle) {
        this.endBossBar.percentage -= 20;
        this.endBossBar.setPercentageEndbossBar(this.endBossBar.percentage);
        bottle.speedY = enemy;
        this.playEndbossHurtSound();
    }

    playEndbossHurtSound() {
        if (this.audio) {
            this.chicken_sound.volume = 0.3;
            this.chicken_sound.play();
        }
    }

    checkEnemyCollision(enemy) {
        if (this.playerGetHitByEnemy(enemy)) {
            this.playerGotHitByEnemy();
        }
        if (this.playerKillEnemy(enemy)) {
            enemy.energy -= 100;
            this.enemyDeadSound();
            this.character.lowJump();
            setTimeout(() => {
                this.deadEnemyDisappear(enemy);
            }, 500);
        }
    }

    playerKillEnemy(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGround() && (enemy instanceof Chicken || enemy instanceof SmallChicken) && enemy.energy > 0
    }

    enemyDeadSound() {
        if (this.audio) {
            this.crushed_sound.volume = 0.3;
            this.crushed_sound.play();
        }
    }

    playerGetHitByEnemy(enemy) {
        return this.character.isColliding(enemy) && !this.character.isAboveGround() && (enemy instanceof Chicken || enemy instanceof SmallChicken || enemy instanceof Endboss) && enemy.energy > 0
    }

    playerGotHitByEnemy() {
        if (!this.invincible) {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && (enemy instanceof Chicken || enemy instanceof SmallChicken)) {
                    this.character.hit();
                    this.statusBar.setPercentageHealthBar(this.character.energy);
                    this.playPlayerGotHurtSound();
                    this.invincible = true; 
                    setTimeout(() => {
                        this.invincible = false; 
                    }, 500);
                } else if (this.character.isColliding(enemy) && enemy instanceof Endboss) {
                    this.character.energy = 0;
                    this.statusBar.setPercentageHealthBar(this.character.energy);
                }
            });
        }
    }

    playPlayerGotHurtSound() {
        if (this.audio) {
            this.hurt_sound.play();
        }
    }

    deadEnemyDisappear() {
        let deadEnemies = [];
        for (let i = 0; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i];
            if (this.enemyIsDead(enemy)) {
                deadEnemies.push(i);
            }
        }
        for (let i = deadEnemies.length - 1; i >= 0; i--) {
            let j = deadEnemies[i];
            this.level.enemies.splice(j, 1);
        }
    }

    enemyIsDead(enemy) {
        return enemy.energy <= 0 && (enemy instanceof Chicken || enemy instanceof SmallChicken)
    }

    deleteThrowObject() {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            if (this.throwableObjectSplashed(i)) {
                this.throwableObjects[i].deleted = true;
                setTimeout(() => {
                    if (this.throwableObjects[i].deleted = true) {
                        this.throwableObjects.splice(i, 1)
                    }
                }, 200);
            }
        }
    }

    throwableObjectSplashed(i) {
        return this.throwableObjects[i].energy == 0 && !this.throwableObjects[i].deleted || !this.throwableObjects[i].isAboveGround() && !this.throwableObjects[i].deleted
    }

    checkBottleCollision() {
        for (let i = 0; i < this.level.bottles.length; i++) {
            let bottle = this.level.bottles[i];
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(i, 1);
                this.character.collectBottle();
                this.bottleBar.setPercentageBottleBar(this.character.collectableBottle);
                this.playPickUpBottleSound();
            }
        }
    }

    playPickUpBottleSound() {
        if (this.audio) {
            this.collectBottle_sound.volume = 0.2;
            this.collectBottle_sound.play();
        }
    }

    checkCoinCollision() {
        for (let i = 0; i < this.level.coins.length; i++) {
            let coin = this.level.coins[i];
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                this.character.collectCoin();
                this.coinBar.setPercentageCoinBar(this.character.collectableCoin);
                this.playPickUpCoinSound();
            }
        }
    }

    playPickUpCoinSound() {
        if (this.audio) {
            this.coin_sound.volume = 0.2;
            this.coin_sound.play();
        }
    }

    checkThrowObjects() {
        if (this.playerGotThrowableObjects()) {
            if (!this.throttled) {
                let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.character.collectableBottle -= 10;
                this.bottleBar.setPercentageBottleBar(this.character.collectableBottle);
                this.playThrowSound();
                this.throttled = true;

                setTimeout(() => {
                    this.throttled = false; 
                }, 500);
            }
        }
    }

    playerGotThrowableObjects() {
        return this.keyboard.D && this.character.collectableBottle > 0
    }

    playThrowSound() {
        if (this.audio) {
            this.throw_sound.play();
        }
    }

    activateEndboss() {
        this.level.enemies.forEach((enemy) => {
            if (this.playerIsNearEndboss(enemy)) {
                enemy.speed = 4;
            }
        })
    }

    playerIsNearEndboss(enemy) {
        return enemy.x - this.character.x < 700 && enemy.energy > 0 && enemy instanceof Endboss && !enemy.isHurt()
    }

    chickenAttack() {
        this.level.enemies.forEach((enemy) => {
            if (this.playerIsNearNormalChicken(enemy)) {
                enemy.rushAttack();
            }
        })
    }

    playerIsNearNormalChicken(enemy) {
        return enemy.x - this.character.x < 350 && enemy.energy > 0 && enemy instanceof Chicken
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.ctx.translate(-this.camera_x, 0); 
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.level.enemies.forEach((enemy) => {
            if (enemy.x - this.character.x < 600 && enemy.energy > 0 && enemy instanceof Endboss) {
                this.addToMap(this.endBossBar);
            }
        });
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
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
            this.mirrorImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.mirrorImageBack(mo);
        };
    }

    mirrorImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    mirrorImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    playIngameBackgroundMusic() {
        if (this.audio) {
            this.game_sound.volume = 0.03;
            this.game_sound.play();
        } else if (!this.audio) {
            this.game_sound.pause();
        }
    }
}
