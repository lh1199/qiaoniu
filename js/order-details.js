$(function(){
    $(".bottom").find("li").click(function(){
        var i = $(this).index();
        $(".bottom").find("li").removeClass("b-active");
        $(this).addClass("b-active");
        $(".xxk").removeClass("xxk-display");
        $(".xxk").each(function(j,item){
            if(i == j){
                $(this).addClass("xxk-display");
            }
        })
    })
})