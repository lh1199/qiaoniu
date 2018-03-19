$(function() {
    $(".c-h-1").each(function() {
        $(this).click(function() {
            $(".c-h-1").removeClass("c-h-active");
            $(this).addClass("c-h-active");
        })
    });
    $(".c-xzcp-c").each(function() {
        $(this).click(function() {
            $(".c-xzcp-c").removeClass("c-xzcp-c-active");
            $(this).addClass("c-xzcp-c-active");
        })
    });
    $(".c-xzbz-c").each(function() {
        $(this).click(function() {
            $(".c-xzbz-c").removeClass("c-xzbz-c-active");
            $(this).addClass("c-xzbz-c-active");
        })
    });
})