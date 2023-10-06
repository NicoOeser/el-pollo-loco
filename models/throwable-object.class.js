class ThrowableObject extends MovableObject {
    speedX = 7;
    
    constructor(x, y) {
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += this.speedX;
        }, 25);
    }
}