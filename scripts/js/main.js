$(document).ready(function () {
  
    setStickyFooter();

    $(window).on("orientationchange", function (event) {
        setStickyFooter();
    });

});

function setStickyFooter()
{
    if ($(window).height() > 1000)
        $("footer").addClass("sticky-footer");
    else
        $("footer").removeClass("sticky-footer");
}