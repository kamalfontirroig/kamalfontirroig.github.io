
(function() {

    var quotes = $(".fading-quotes");
    var quoteIndex = -1;

    var titulo = $(".titulo-div");
    titulo.fadeIn(5000)

    var nav = $(".navito");
    nav.fadeIn(5000)

    function showNextQuote() {
        ++quoteIndex;
        quotes.delay(4000)
        quotes.eq(quoteIndex % quotes.length)
            .fadeIn(5000)
            .delay(10000)
            .fadeOut(5000, showNextQuote);
    }

    showNextQuote();

})()

$(document).ready( function(){   
    myVideo = document.getElementById("videobg");
    myVideo.play()
    audio = document.getElementById("audio");
    audio.volume = 0.5;
    changePlayIcon();
    changeAudioIcon();
})

function togglePlay() {
    var myVideo = document.getElementById("videobg");
    if (myVideo.paused) {
        myVideo.play();
        changePlayIcon();
    }
    else {
        myVideo.pause();
        changePlayIcon();
    }
    
}

function toggleAudio() {
    var audio = document.getElementById("audio");
    audio.muted = !audio.muted;
    changeAudioIcon();
}



function changePlayIcon() {
    var ppbutton = document.getElementById("vidbuttonPlay");
    var myVideo = document.getElementById("videobg");
    if (myVideo.paused) {    
        ppbutton.innerHTML = `<i class="fa fa-play" class="z-front"></i>`;
    }
    else {
        ppbutton.innerHTML = `<i class="fa fa-pause" class="z-front"></i>`;
    }
}


function changeAudioIcon() {
    var mubutton = document.getElementById("vidbuttonMute");
    audio = document.getElementById("audio");
    if (!audio.muted) {
        mubutton.innerHTML = `<i class="fa fa-volume-up" class="z-front"></i>`;
    }
    else {
        mubutton.innerHTML = `<i class="fa fa-volume-off" class="z-front"></i>`;
    }
}













/* function muteUnmute() {
    var mubutton = document.getElementById("vidbuttonMute");
    myVideo = document.getElementById("videobg");
    if (myVideo.muted) {
        mubutton.innerHTML = `<i class="fa fa-volume-up" class="z-front"></i>`;
    }
    else {
        mubutton.innerHTML = `<i class="fa fa-volume-off" class="z-front"></i>`;
    }
}

function toggleMute() {
    var myVideo = document.getElementById("videobg");
    myVideo.muted = !myVideo.muted;
    muteUnmute();
} */
