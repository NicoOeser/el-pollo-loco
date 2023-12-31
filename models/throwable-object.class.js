class ThrowableObject extends MovableObject {
    speedX = 7;
    speedXLeft = -7;
    offset = {
        top: 25,
        left: 25,
        bottom: 25,
        right: 25
    };

    IMAGES_BOTTLE_ROTATION = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_BOTTLE_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 75;
        this.throw();
        this.throwBackwards();
        this.animate();
    }


    /**
     * play animations of throwable (bottles) objects  
     */
    animate() {
        setInterval(() => {
            this.flyingBottle();
        }, 100);
        setInterval(() => {
            this.splashingBottle();
        }, 200);
    }


    /**
     * plays animation of flying bottles
     */
    flyingBottle() {
        if (!this.isHurt() && this.isAboveGround()) {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        }
    }


    /**
     * plays animation of destroyed bottles
     */
    splashingBottle() {
        if (this.energy <= 0 || !this.isAboveGround()) {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        }
    }


    /**
     * throw bottle and sets the parameter of flying bottle curve
     */
    throw() {
        if (!world.character.otherDirection) {
            this.speedY = 30;
            this.applyGravity();
            setInterval(() => {
                this.x += this.speedX;
            }, 25);
        }
    }


    /**
     * throw bottle left and sets the parameter of flying bottle curve
     */
    throwBackwards() {
        if (world.character.otherDirection) {
            this.speedY = 30;
            this.applyGravity();
            setInterval(() => {
                this.x += this.speedXLeft;
            }, 25);
        }
    }
}