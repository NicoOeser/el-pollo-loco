class EndbossBar extends DrawableObject {
    percentage = 100;
    
    IMAGES_ENDBOSSBAR = [
        'assets/img/7_statusbars/2_statusbar_endboss/100.png',
        'assets/img/7_statusbars/2_statusbar_endboss/80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/01.png',
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSSBAR);
        this.setPercentageEndbossBar(100);
        this.x = 515;
        this.y = 30;
        this.height = 50;
        this.width = 200;
    }

    setPercentageEndbossBar(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENDBOSSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        this.position = 0;
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 0;
        } else if (this.percentage == 80) {
            return 1;
        } else if (this.percentage == 60) {
            return 2;
        } else if (this.percentage == 40) {
            return 3;
        } else if (this.percentage == 20) {
            return 4;
        } else {
            return 5;
        }
    }
}