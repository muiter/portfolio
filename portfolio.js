(function($){
$(document).ready(function () {
    $("button").click(underline);
    $('#menuButton').click(addIcon);
    $("#about").css({'border-top' : '4px solid #B2929D'});

    $('#about').click({
        param1: "aboutPage",
        param2: "about",
        param3: "#B2929D"
    }, viola);
    $('#projects').click({
        param1: "projectsPage",
        param2: "projects",
        param3: "#8CBEB2"
    }, viola);
    $('#resume').click({
        param1: "resumePage",
        param2: "resume",
        param3: "#F3B562"
    }, viola);
    $('#contact').click({
        param1: "contactPage",
        param2: "contact",
        param3: "#F06060"
    }, viola);
    $('contact').hover(doThis);
});

function doThis() {

}

var count = 0;
function addIcon() {
    if (count % 2 == 0) {
        $(".navbar").animate({"height":"6em"}, 300);
        $("body").animate({"padding-top" : "6em"}, 300);
        count++;
    } else {
        $(".navbar").animate({"height":"3em"}, 300);
        $("body").animate({"padding-top" : "3em"}, 300);
        count++;
    }
}

function underline() {
    if ($("#navCollapse").hasClass("collapse")) {
        $("#navCollapse").removeClass("collapse");
    } else {
        $("#navCollapse").addClass("collapse");
    }
}

function viola(event) {
    var page = event.data.param1;
    var tab = event.data.param2;
    var colour = event.data.param3;
    if (!$("#" + page).hasClass("showThis")) {
        $('body div').each(function () {
            if ($(this).hasClass("showThis")) {
                $(this).fadeOut("0.2s", function () {
                    $(this).addClass('hideThis').removeClass("showThis");
                    $("#" + page).fadeIn("0.2s", function () {
                        $("#" + page).removeClass("hideThis").addClass("showThis");
                    });
                });
            }
        });
    }
    doThis(colour, tab);
}

function doThis(colour, tab) {
    if (!$("#" + tab).hasClass("showBorder")) {
        $('li').each(function () {
            if ($(this).hasClass("showBorder")) {
                $(this).addClass('hideBorder').removeClass("showBorder");
                $(this).css("border-color", "white");
                // $("#aboutSpan").css({"border-color" : "white"}).animate({"background" : "black"}, 600);
                $("#" + tab).removeClass("hideBorder").addClass("showBorder");
                $("#" + tab).css("border-color", colour);
            }
        });
    }
}

/*
function navColours() {
    $("#pages>p>span").each(function () {
        if ($(this).hasClass("currentWindow")) {
            $(this).fadeOut().remove().removeClass("currentWindow");
        }
    });
    $(this).prepend("<span class='currentWindow'> - </span>").append("<span class='currentWindow'> - </span>");
}
*/
})(jQuery);
