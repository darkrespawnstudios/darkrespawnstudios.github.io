var currenthash = "#home";
var virtualClick = false;

$(document).ready(function () {
    //Subscribe to click events in menu
    $(".navigation ul li a[href^='#']").click(function (e) {

        e.preventDefault();
        $(".navigation ul li a").removeClass("active");

        // store hash
        var hash = this.hash;
        var parent = this;

        if (hash == "#AvoidTheWalls" && currenthash != "#AvoidTheWalls") {
            $("main").load('scripts/html/avoidthewalls.html', function () {
                $("main").removeClass("fill");
                finishChangePage(hash, parent);
                showContent();
            });
        }
        else {
            if (currenthash == "#AvoidTheWalls" ) {
                //Si estamos fuera de la home, la recargamos.
                $("main").load('scripts/html/main.html', function () {
                    $("main").addClass("fill");
                    showContent(processUrl);
                });
            }
        }
    });

    $(".linkhome").addClass("active");
    
    //Load the main page.
    $("main").load('scripts/html/main.html', function () {
        showContent(processUrl);
    });

});

function showContent(callback) {
    $.when($("main").fadeIn(400)).done(function () { if (typeof callback === "function") { callback(); } });
}

function finishChangePage(hash, parent) {
    //When finish modify the url.
    window.location.hash = hash;
    $(parent).addClass("active");
    currenthash = hash;
}

function processUrl() {
    //Si hay hash le procesamos:
    if (location.hash != "" && location.hash != "#") {
        switch (location.hash) {
            case "#home":
                virtualClick = true;
                $(".linkhome").click();
                break;
            case "#news":
                virtualClick = true;
                $(".linknews").click();
                $(".linknews").addClass("active");
                break;
            case "#about":
                virtualClick = true;
                $(".linkabout").click();
                $(".linkabout").addClass("active");
                break;
            case "#AvoidTheWalls":
                virtualClick = true;
                $(".linkatw").click();
                $(".linkatw").addClass("active");
                break;
        }
    }
}