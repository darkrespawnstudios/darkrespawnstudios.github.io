var currenthash = "#home";
var virtualClick = false;

$(document).ready(function () {
    hideContent();
    //Subscribe to click events in menu
    $(".navigation ul li a[href^='#']").click(function (e) {

        e.preventDefault();
        $(".navigation ul li a").removeClass("active");

        // store hash
        var hash = this.hash;
        var parent = this;

        if (hash == "#AvoidTheWalls" && currenthash != "#AvoidTheWalls") {
            hideContent();
            $("main").load('scripts/html/avoidthewalls.html', function () {
                $("main").removeClass("fill");
                finishChangePage(hash, parent);
                showContent();
            });
        }
        else if (hash == "#Blog" && currenthash != "#Blog") {
            hideContent();
            $("main").load('scripts/html/blog.html', function () {
                finishChangePage(hash, parent);
                showContent();
            });
        }
        else {
            if (currenthash == "#AvoidTheWalls" || currenthash == "#Blog") {
                hideContent();
                //Si estamos fuera de la home, la recargamos.
                $("main").load('scripts/html/main.html', function () {
                    animationAnchor(hash, parent);
                    $("main").addClass("fill");
                    showContent(processUrl);
                });
            }
            else {
                animationAnchor(hash, parent);
            }
        }
    });

    //hide the mobile menu when click in option:
    $("#mobile-bar a").click(function () {
        if (!virtualClick)
            $("#navbarBtnToggle").click();

        virtualClick = false;
    });

    //Load the main page.
    $("main").load('scripts/html/main.html', function () {
        showContent(processUrl);
    });
});

function showContent(callback) {
    $.when($("main").fadeIn(400)).done(function () { if (typeof callback === "function") { callback(); } });
}

function hideContent() {
    $("main").hide();
}

function animationAnchor(hash, parent) {
    // animate
    $('html, body').animate({
        scrollTop: $(hash).offset().top
    }, 300, function () {
        finishChangePage(hash, parent);
    });
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
                break;
            case "#about":
                virtualClick = true;
                $(".linkabout").click();
                break;
            case "#AvoidTheWalls":
                virtualClick = true;
                $(".linkatw").click();
                break;
            case "#Blog":
                virtualClick = true;
                $(".linkBlog").click();
                break;
        }
    }
}