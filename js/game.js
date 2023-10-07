let canvas;
let world;
let keyboard = new Keyboard();
let fullscreenMode = false;
let hideSettings = true;


function init() {
    hideStartscreen();
    showVolumeBtn();
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
    setAudio();
}

function restartGame() {
    hideEndscreen();
    hideVolumeBtn();
    showStartscreen();
    changeVolumeImg();
    stopAudio();
}

function stopAudio() {
    world.win_sound.pause();
    world.lost_sound.pause();
}

function hideStartscreen() {
    document.getElementById('startscreen').classList.add('d-none');
}

function showStartscreen() {
    document.getElementById('startscreen').classList.remove('d-none');
}

function hideEndscreen() {
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('lost-game').classList.add('d-none');
}

function hideControls() {
    document.getElementById('settings').classList.add('d-none');
}

function hideSettingsOnX() {
    let settings = document.getElementById('settings');
    settings.classList.add('d-none');
}

function showVolumeBtn() {
    document.getElementById('volume').classList.remove('d-none');
}

function hideVolumeBtn() {
    document.getElementById('volume').classList.add('d-none');
}

function showSettings() {
    let settings = document.getElementById('settings');
    settings.classList.remove('d-none');
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

function exitFullscreenHandler() {
    if (!document.fullscreenElement) {
        fullscreenMode = false;
    }
}

document.addEventListener('fullscreenchange', exitFullscreenHandler);

function volumeMute() {
    world.audio = false;
    let volume = document.getElementById('volume');
    volume.src = 'assets/img/sound-off.png';
    volume.setAttribute('onclick', 'volumeUp()');
    localStorage.setItem('audio', false);
}

function volumeUp() {
    world.audio = true;
    let volume = document.getElementById('volume');
    volume.src = 'assets/img/sound.png';
    volume.setAttribute('onclick', 'volumeMute()');
    localStorage.setItem('audio', true);
}

function changeVolumeImg() {
    let volume = document.getElementById('volume');
    volume.src = 'assets/img/sound.png';
}

function setAudio() {
    let storage = localStorage.getItem('audio');
    if (storage) {
        if (storage == 'false') {
            volumeMute();
        }
    } else {
        world.audio = true
    }
}