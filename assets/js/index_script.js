(function() {

    var quotes = $(".fading-quotes");
    var quoteIndex = -1;

    function showNextQuote() {
        ++quoteIndex;
        quotes.eq(quoteIndex % quotes.length)
            .fadeIn(1000)
            .delay(4000)
            .fadeOut(3000, showNextQuote);
    }

    showNextQuote();

})()

window.onload = function () {   
    playPause();
    muteUnmute();
}



function togglePlay() {
    var myVideo = document.getElementById("header-video");
    if (myVideo.paused) {
        myVideo.play();
        playPause();
    }
    else {
        myVideo.pause();
        playPause();
    }
    
}


function playPause() {
    var ppbutton = document.getElementById("vidbuttonPlay");
    var myVideo = document.getElementById("header-video");
    if (myVideo.paused) {
        ppbutton.innerHTML = `<i class="fa fa-pause"></i>`;
    }
    else {
        ppbutton.innerHTML = `<i class="fa fa-play"></i>`;
    }
}


function muteUnmute() {
    var mubutton = document.getElementById("vidbuttonMute");
    myVideo = document.getElementById("header-video");
    if (myVideo.muted) {
        mubutton.innerHTML = `<i class="fa fa-volume-up"></i>`;
    }
    else {
        mubutton.innerHTML = `<i class="fa fa-volume-off"></i>`;
    }
}

function toggleMute() {
    var myVideo = document.getElementById("header-video");
    myVideo.muted = !myVideo.muted;
    muteUnmute();
}