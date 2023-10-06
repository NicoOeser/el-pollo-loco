let canvas;
let world;
let keyboard = new Keyboard();
let fullscreenMode = false;


function init() {
    hideStartscreen();
    showVolumeBtn();
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
}

function hideStartscreen() {
    document.getElementById('startscreen').classList.add('d-none');
}

function showVolumeBtn() {
    document.getElementById('volume').classList.remove('d-none');
}

function volumeMute() {
    world.audio = false;
    let volume = document.getElementById('volume');
    volume.src = 'assets/img/sound-off.png';
    volume.setAttribute('onclick', 'volumeUp()');
}

function volumeUp() {
    world.audio = true;
    let volume = document.getElementById('volume');
    volume.src = 'assets/img/sound.png';
    volume.setAttribute('onclick', 'volumeMute()');
}

function fullscreen() {
    let fullscreen = document.getElementById('content');
    if (!fullscreenMode) {
        fullscreen.requestFullscreen();
        fullscreenMode = true;
    } else {
        document.exitFullscreen();
        fullscreenMode = false;
    }
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