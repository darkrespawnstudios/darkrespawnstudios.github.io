var currenthash = "#home";
var virtualClick = false;

$(document).ready(function () {
    
    var urlParts = window.location.href.split('/');
    $(".nav-link").removeClass("active");
    //Subscribe to click events in menu
    $(".navigation ul li a[href^='#']").click(function (e) {
        e.preventDefault();
        $(".navigation ul li a").removeClass("active");

        // store hash
        var hash = this.hash;
        var parent = this;
        var nextUrl ="scripts/html/main.html";

        if (hash == "#about")
            nextUrl = "scripts/html/about.html";
        
        $("main").load(nextUrl, function () {
            $("main").removeClass("fill");
            finishChangePage(hash, parent);
            showContent();
        });
        
    });

    $(window).on("orientationchange", function (event) {
        if ($(window).height() > 1000 && location.hash == "#home")
            $("footer").addClass("sticky-footer");
        else
            $("footer").removeClass("sticky-footer");
    });

    if (urlParts[urlParts.length - 2].toString() == "AvoidTheWalls")
        $(".linkatw").addClass("active");
    else {
        $(".linkhome").addClass("active");

        //Load the main page.
        $("main").load('scripts/html/main.html', function () {
            showContent(processUrl);
        });
    }
});

function showContent(callback) {
    $.when($("main").fadeIn(400)).done(function () { if (typeof callback === "function") { callback(); } });
}

function finishChangePage(hash, parent) {
    //When finish modify the url.
    window.location.hash = hash;
    $(parent).addClass("active");
    currenthash = hash;
    $('html').scrollTop(0);
}

function processUrl() {
    //Si hay hash le procesamos:
    if (location.hash != "" && location.hash != "#") {
        switch (location.hash) {
            case "#home":
                virtualClick = true;
                $(".linkhome").click();
                break;
            case "#about":
                virtualClick = true;
                $(".linkabout").click();
                $(".linkabout").addClass("active");
                break;
        }
    }

    if ($(window).height() > 1000 && location.hash == "#home")
        $("footer").addClass("sticky-footer");
    else
        $("footer").removeClass("sticky-footer");
}