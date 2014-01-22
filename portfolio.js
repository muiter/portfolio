$(document).ready(function () {
    $('#work').click({
        param: "showcasing"
    }, viola);
    $('#about').click({
        param: "me"
    }, viola);
    $('#contact').click({
        param: "connection"
    }, viola);
    $('#resume').click({
        param: "resumeView"
    }, viola);
    $("#work, #about, #contact, #resume").click(navColours);
});
    
function viola(event) {
    var page = event.data.param;
    if (!$("#" + page).hasClass("show")) {
        $('body div').each(function () {
            if ($(this).hasClass("show")) {
                $(this).fadeOut("fast", function () {
                    $(this).addClass('hide').removeClass("show");
                    $("#" + page).fadeIn("fast", function () {
                        $("#" + page).removeClass("hide").addClass("show");
                    });
                });
            }
        });
    }
}

function navColours() {
    $("#pages>p>span").each(function () {
        if ($(this).hasClass("currentWindow")) {
            $(this).fadeOut().remove().removeClass("currentWindow");
        }
    });
    $(this).prepend("<span class='currentWindow'> - </span>").append("<span class='currentWindow'> - </span>");
}
