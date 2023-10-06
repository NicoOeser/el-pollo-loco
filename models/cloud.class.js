class Cloud extends MovableObject {
    IMAGES_CLOUDS = [
        'assets/img/5_background/layers/4_clouds/1.png',
        'assets/img/5_background/layers/4_clouds/2.png'
    ];
    y = 20;
    width = 500;
    height = 250;


    constructor(){
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');

        this.x = 0 + Math.random() * 500; // Zahl zwischen 200 und 700
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 50);
    }




}