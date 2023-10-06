class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    collectableBottle = 0;
    collectableCoin = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable object should always fall
            return true;
        } else {
            return this.y < 180;
        }
    }

    collectBottle() {
        this.collectableBottle += 10;
        if (this.collectableBottle > 100) {
            this.collectableBottle = 100;
        }
    }


    /**
     * if Player collides with Coin he fill the bar
     */
    collectCoin() {
        this.collectableCoin += 10;
        if (this.collectableCoin > 100) {
            this.collectableCoin = 100;
        }
    }



        // character.isColliding(chicken); 
        isColliding(mo) {
            return this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height;
        }

        
        hit() {
            this.energy -= 20;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    
        isHurt() {
            let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
            timepassed = timepassed / 1000; // Difference in s
            return timepassed < 1.5;
        }
    
        isDead() {
            return this.energy == 0;
        }

    playAnimation(images) {
         let i = this.currentImage % images.length; // let i = 7 % 6; =>  1, Rest 1 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    lowJump() {
        this.speedY = 15;
    }
}