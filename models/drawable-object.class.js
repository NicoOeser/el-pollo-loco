class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 310;
    height = 150;
    width = 100;


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '0';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

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