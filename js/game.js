let canvas;
let world;
let keyboard = new Keyboard();
game_sound = new Audio('audio/music.mp3');

function init() {
    hideStartscreen();
    playIngameBackgroundMusic();
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
}

function playIngameBackgroundMusic() {
    this.game_sound.volume = 0.03;
    this.game_sound.play();
}

function hideStartscreen() {
    document.getElementById('startscreen').classList.add('d-none');
}


window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});