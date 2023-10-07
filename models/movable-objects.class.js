class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    lastHit = 0;
    collectableBottle = 0;
    collectableCoin = 0;
    offset = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    };

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    collectBottle() {
        this.collectableBottle += 10;
        if (this.collectableBottle > 100) {
            this.collectableBottle = 100;
        }
    }

    collectCoin() {
        this.collectableCoin += 10;
        if (this.collectableCoin > 100) {
            this.collectableCoin = 100;
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; 
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    applyGravityPlayer() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.y = 155;
            }
        }, 1000 / 25);
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 350;
        } else if (this instanceof Character) {
            return this.y < 155;
        }
    }

    playAnimation(images) {
        let loop = this.currentImage % images.length;
        let path = images[loop];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    jump() {
        this.speedY = 27;
    }

    lowJump() {
        this.speedY = 15;
    }

    isAboveGroundChicken() {
        if (this instanceof SmallChicken) {
            return this.y < 360;
        } else if (this instanceof Chicken) {
            return this.y < 330;
        }
    }

    applyGravityChicken() {
        setInterval(() => {
            if (this.isAboveGroundChicken() || this.speedY > 0) {
                this.y -= this.speedY;
             this.speedY -= this.acceleration;
            } else if (this instanceof SmallChicken) {
                this.y = 372;
            } else if (this instanceof Chicken) {
                this.y = 330;
            }
            
        }, 1000 / 25);
    }
}