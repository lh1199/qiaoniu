$(function(){
    $(".liebiao").click(function(){
        $(".liebiao").removeClass("liebiao-active");
        $(this).addClass("liebiao-active");
    })

    $(".c-r-header").find("li").click(function(){
        $(".c-r-header").find("li").removeClass("c-r-h-active");
        $(this).addClass("c-r-h-active");
    })
})