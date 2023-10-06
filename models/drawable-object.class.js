class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280; 
    height = 150;
    width = 100;




    // loadImage('img/test.png);
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="iamge" src>
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
    
    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...] 
     */
     loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }

        /**
     * 
     * @returns return value which image shows on which % of status bar
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