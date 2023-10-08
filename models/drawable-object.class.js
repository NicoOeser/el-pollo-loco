class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 310;
    height = 150;
    width = 100;


    /**
     * help function for addToMap() in world class
     * @param {Canvas.getContext('2d')} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * load static image into the world
     * @param {path to the image} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * preload array of images into the world --> more images for animation
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * 
     * @returns return value which image shows on which % of coin and bottle bar
     */
    resolveImageIndexCollectable() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 70 && this.percentage <= 90) {
            return 4;
        } else if (this.percentage >= 50 && this.percentage <= 60) {
            return 3;
        } else if (this.percentage >= 30 && this.percentage <= 40) {
            return 2;
        } else if (this.percentage >= 10 && this.percentage <= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}