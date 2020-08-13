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