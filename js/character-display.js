$(document).ready(function() {
    // Initialize with Spot as selected character
    $("#btn-spot").addClass("blue-active");

    // Changes button highlighting when user clicks on buttons
    $(".btn").click(function () {
        var buttonID = $(this).attr("id");
        $("#btn-spot").removeClass("blue-active");
        $("#btn-pink").removeClass("red-active");
        $("#btn-miao").removeClass("green-active");
        $("#btn-horn-girl").removeClass("purple-active");
        $("#btn-princess").removeClass("orange-active");
        switch (buttonID) {
            case "btn-spot":
                $(this).addClass("blue-active");
                break;
            case "btn-pink":
                $(this).addClass("red-active");
                break;
            case "btn-miao":
                $(this).addClass("green-active");
                break;
            case "btn-horn-girl":
                $(this).addClass("purple-active");
                break;
            case "btn-princess":
                $(this).addClass("orange-active");
                break;
            default:
        }
    });
});