class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    D = false;

    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.bindKeyPressEvents();
            this.bindBtnPressEvents();
        });
    }

    bindBtnPressEvents() {
        document.getElementById('btn-left').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('btn-left').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('btn-right').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('btn-right').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('btn-up').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });

        document.getElementById('btn-up').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });

        document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        });

        document.getElementById('btn-throw').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        });
    }

    bindKeyPressEvents() {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 39) {
                this.RIGHT = true;
            }

            if (e.keyCode == 37) {
                this.LEFT = true;
            }

            if (e.keyCode == 32) {
                this.SPACE = true;
            }

            if ((e.keyCode == 68)) {
                this.D = true;
            }
        });

        window.addEventListener("keyup", (e) => {
            if (e.keyCode == 39) {
                this.RIGHT = false;
            }

            if (e.keyCode == 37) {
                this.LEFT = false;
            }

            if (e.keyCode == 32) {
                this.SPACE = false;
            }

            if ((e.keyCode == 68)) {
                this.D = false;
            }
        });
    }
}