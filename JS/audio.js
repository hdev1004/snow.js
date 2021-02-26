//var audio, audioBtn;
function loaded() {
    //audio = document.getElementById("audio");
    //audioBtn = document.getElementById("audioBtn");
    //console.log(audioBtn);
}

function audioPlay() {
    console.log("Play!");
    audio.volume = 0.5;
    audio.play();
}

window.addEventListener("load", loaded);