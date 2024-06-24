let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let movementDirection = true;
let startGame = "false";
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let portrait = window.matchMedia("(orientation: portrait)");
let isLandscape = false;
let leftButton = document.getElementById("onLeftButton");
let rightButton = document.getElementById("onRightButton");
let jumpButton = document.getElementById("onJumpButton");
let throwButton = document.getElementById("onThrowButton");
let mute = false;
let canvasWidth;
let canvasHeight;
let pause = false;
let intervalData = [];
let sound = [
    playCollisionChicken = new Audio("audio/dyingChicken.mp3"),
    playFinalBoss = new Audio("audio/finalBossBattle.mp3"),
    playWinGame = new Audio("audio/win.mp3"),
    playCollectBottleAudio = new Audio("audio/collectBottle.mp3"),
    playCollectCoinAudio = new Audio("audio/coin.mp3"),
    playWalkAudio = new Audio("audio/walk.mp3"),
    playJumpAudio = new Audio("audio/jump.mp3"),
    playBackgroundAudio = new Audio("audio/backgroundSound.mp3"),
    playHitAudio = new Audio("audio/ayayay.mp3")
];

function init() {
    startGame = localStorage.getItem("gameStarted");
    defaultMuteSound();
}

function playGame() {
    if (startGame == "true") {
        document.getElementById('textCanvasScreen').style.display = "none";
        document.getElementById('canvas').style.display = 'flex';
        document.getElementById('pauseButton').style.display = "inline";
        document.getElementById("startButton").style.display = "none";
        initLevel();
        canvas = document.getElementById("canvas");
        world = new World(canvas, keyboard, 800, 500, sound);
        ctx = world.ctx;
        playBackgroundAudio.play();
    }
}

function backToMainMenu() {
    let textCanvasScreen = document.getElementById('textCanvasScreen');
    textCanvasScreen.style.display = 'flex';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById("endingScreen").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById('playButton').style.display = "none";
    document.getElementById("startButton").style.display = "block";
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalData.push({ id, fn, time });
}

function pauseGame(){
    if(pause){
        pause = false;
        document.getElementById('playButton').style.display = "none";
        document.getElementById('pauseButton').style.display = "inline";
        document.getElementById('canvas').style.filter = "none";

    } else {
        pause = true;
        document.getElementById('pauseButton').style.display = "none";
        document.getElementById('playButton').style.display = "inline";
        document.getElementById('canvas').style.filter = "blur(5px)";
    }
}

function restartGame() {
    document.getElementById("endingScreen").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("startButton").style.display = "none";
    let startGame = "false";
    playGame();
    pause = false;
}

function keyboardControls() {
    document.getElementById("keyboardControlDiv").style.display = "flex";
}
function hideKeyboardControls() {
    document.getElementById("keyboardControlDiv").style.display = "none";
}

function defaultMuteSound() {
    mute = localStorage.getItem('mute');
    if (mute == 'true') {
        document.getElementById("soundon").style.display = "none";
        document.getElementById("soundoff").style.display = "initial";
        for (let i = 0; i < sound.length; i++) {
            sound[i].volume = 0;
        }
    }
}

function muteSound() {
    document.getElementById("soundon").style.display = "none";
    document.getElementById("soundoff").style.display = "initial";

    mute = localStorage.getItem('mute');
    if (mute == 'true') {
        for (let i = 0; i < sound.length; i++) {
            sound[i].volume = 0;
        }
    } else {
        localStorage.setItem('mute', true);
        for (let i = 0; i < sound.length; i++) {
            sound[i].volume = 0;
        }
    }
}

function unMuteSound() {
    document.getElementById("soundon").style.display = "initial";
    document.getElementById("soundoff").style.display = "none";

    mute = localStorage.getItem('mute');
    if (mute == 'false') {
        for (let i = 0; i < sound.length; i++) {
            sound[i].volume = 1;
        }
    } else {
        localStorage.setItem('mute', false);
        for (let i = 0; i < sound.length; i++) {
            sound[i].volume = 1;
        }
    }
}

function fullScreen() {
    document.getElementById("fullScreen").style.display = "none";
    document.getElementById("exitFullScreen").style.display = "initial";

    canvasWidth = document.getElementById("canvas").width;
    canvasHeight = document.getElementById("canvas").height;

    document.getElementById("canvas").style.width = "100vw";
    document.getElementById("canvas").style.height = "100vh";
    document.getElementById("canvas").style.borderRadius = "0";
    document.getElementById("startingScreen").style.overflow = "hidden";
}

function exitFullScreen() {
    document.getElementById("fullScreen").style.display = "initial";
    document.getElementById("exitFullScreen").style.display = "none";

    document.getElementById("canvas").style.width = canvasWidth + "px";
    document.getElementById("canvas").style.height = canvasHeight + "px";
    document.getElementById("startingScreen").style.overflow = "auto";
    document.getElementById("canvas").style.borderRadius = "10px";
}

function handleOrientationChange(e) {
    if (e.matches) {
        // Portrait mode
        isLandscape = false;
    } else {
        // Landscape
        isLandscape = true;
        document.body.style.backgroundColor = "";
        document.getElementById("testShow").style.display = "flex";
        document.getElementById("controlItems").style.display = "none";
    }
};

function startButton() {
    startGame = "true";
    localStorage.setItem("gameStarted", startGame);
    playGame();
}
function handleLeftClick() {
    keyboard.LEFT = true;
}

function handleRightClick() {
    keyboard.RIGHT = true;
}

function handleJumpClick() {
    keyboard.SPACE = true;
}

function handleThrowClick() {
    keyboard.Control = true;
}

function handleLeftBlur() {
    keyboard.LEFT = false;
}

function handleRightBlur() {
    keyboard.RIGHT = false;
}

function handleJumpBlur() {
    keyboard.SPACE = false;
}

function handleThrowBlur() {
    keyboard.Control = false;
}

leftButton.addEventListener("touchstart", handleLeftClick);
leftButton.addEventListener("touchend", handleLeftBlur);
rightButton.addEventListener("touchstart", handleRightClick);
rightButton.addEventListener("touchend", handleRightBlur);
jumpButton.addEventListener("touchstart", handleJumpClick);
jumpButton.addEventListener("touchend", handleJumpBlur);
throwButton.addEventListener("touchstart", handleThrowClick);
throwButton.addEventListener("touchend", handleThrowBlur);

document.addEventListener("keydown", (e) => {
    if (e.key == "a") {
        keyboard.LEFT = true;
    }
    if (e.key == "d") {
        keyboard.RIGHT = true;
    }
    if (e.key == "w") {
        keyboard.SPACE = true;
    }
    if (e.key == "Shift") {
        keyboard.SPACE = true;
    }
    if (e.key == "Control") {
        keyboard.Control = true;
    }
    e.preventDefault();
});

document.addEventListener("keyup", (e) => {
    if (e.key == "a") {
        keyboard.LEFT = false;
    }
    if (e.key == "d") {
        keyboard.RIGHT = false;
    }
    if (e.key == "w") {
        keyboard.SPACE = false;
    }
    if (e.key == "Shift") {
        keyboard.SPACE = false;
    }
    if (e.key == "Control") {
        keyboard.Control = false;
    }
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}