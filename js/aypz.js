$(function() {
    var flag = true;
    var type = true;
    var $cpzj = 2000;
    var $bzj = 200;
    var $totalMoney = 2200;
    var $totalMoney_zfc = 0;
    var $glf = 6;
    var $allpay = 206;
    var $data = 2;
    var $glfeveryday = 3;

    $.ajax({
        type: "POST",
        url: "productsDay_ay.json",
        dataType: 'json',
        error: function() {
            alert("网络异常...");
        },
        success: function(result) {
            product = eval(result.product);
            bzj_time = eval(result.bzj);
            if(product == null || product == ""){
                alert("产品为空");
            }else{
                for (var i = 0; i < product.length; i++) {
                    var index1 = i;
                    $(".c-xzcp-c strong").each(function(index2, item) {
                        $this = $(this);
                        if (index2 == index1) {
                            $this.text(moneyFormat(product[index1].data_borrowmoney));
                            if($this.hasClass("c-xzcp-c-active")) {
                                $cpzj = parseInt(product[index1].data_borrowmoney);
                            }
                        }
                    })
                };
                $("#moneymin").val(product[0].moneyMin);
                $("#moneymax").val(product[0].moneyMax);
                checkmoney();
            }
        }
    })

    $(".c-h-1").each(function() {
        $(this).click(function() {
            $(".c-h-1").removeClass("c-h-active");
            $(this).addClass("c-h-active");
        })
    });

    $("#sdsr").click(function() {
        if (flag) {
            $(this).html("请输入<span>1000</span>的整数倍,最少<span>2000</span>,最多<span>20</span>万");
            $(this).css("color","#888888");
            $(".c-xzcp-content1").css("display", "none");
            $("#sdsr-input").css("display", "block");
            flag = false;
        } else {
            $(this).html("手动输入操盘资金&gt;&gt;");
            $(this).css("color","#366fcd");
            $(".c-xzcp-content1").css("display", "block");
            $("#sdsr-input").css("display", "none");
            flag = true;
        }
    })

    $(".c-xzcp-c").each(function() {
        $this = $(this);
        $this.bind("click", function() {
            if (!$(this).hasClass("c-xzcp-c-active")) {
                $(this).addClass("c-xzcp-c-active");
                $(this).siblings("div").removeClass("c-xzcp-c-active");
            }
            $cpzj = parseInt($(this).attr("data_borrowmoney"));
            $("#cpzj_hidden").val($cpzj);
            
            checkmoney();
        });
    });

    function checkmoney(){
        for(var j = 0; j < bzj_time.length; j ++) {
            var index3 = j;
            $(".c-xzbz-c strong").each(function(index4,item) {
                $this = $(this);
                if(index3 == index4) {
                    $this.text(moneyFormat(bzj_time[index3].moneyTimes * $cpzj));
                    if($this.hasClass("c-xzbz-c-active")) {
                        $bzj = parseInt(bzj_time[index3].moneyTimes * $cpzj)
                    }
                }
            })
        }

        $(".c-xzbz-c").each(function(){
            $this = $(this);
            if($(this).hasClass("c-xzbz-c-active")) {
                $bzj = parseInt(bzj_time[$this.index()].moneyTimes * $cpzj);
                $jjx = bzj_time[$this.index()].rateWarn;
                return;
            }
        })

        var $totalMoney = $cpzj + $bzj;
        var $totalMoney_zfc = addCommas($totalMoney);
        $("#totalMoney strong").text($totalMoney_zfc);

        var $jjx = $bzj + $cpzj * $jjx;
        $("#jjx").text(Math.round($jjx));

        $pcx = product[0].rateOpenLine;
        var $pcx = $bzj + $cpzj * $pcx;
        $("#pcx").text(Math.round($pcx));

        var $bzj_zfc = addCommas($cpzj);
        $("#bzj").text($bzj_zfc);

        var $allpay = $cpzj + $glf;
        var $allpay_zfc = addCommas($allpay);
        $("#allpay").text($allpay_zfc);
    }

    $(".c-xzbz-c").each(function() {
        $this = $(this);
        $this.bind("click", function() {
            if (!$(this).hasClass("c-xzbz-c-active")) {
                $(this).addClass("c-xzbz-c-active");
                $(this).siblings("div").removeClass("c-xzbz-c-active");
            }
            
            checkmoney();
        });
    });

    $("#tianshu").change(function() {
        $("#glf").text("￥" + parseInt($(this).children('option:selected').val() * $glfeveryday));
        $glf = $(this).children('option:selected').val() * $glfeveryday;
        checkmoney();
    });

    $("#srk").keyup(function() {
        var value = $("#srk").val();
        var moneymin = $("#moneymin").val();
        var moneymax = $("#moneymax").val();
        if (value == "") {
            return;
        }
        if (parseInt(value) % parseInt(100) != 0 || parseInt(value) < parseInt(moneymin) || parseInt(value) > parseInt(moneymax)) {
            $("#errow_title").css("display","block");
            $("#xzbzj").css("display","none");
            $("#totalMoney").find("strong").text("0");
            $("#jjx").text("0");
            $("#pcx").text("0");
            $("#bzj").text("0");
            $("#glf").text("0");
            $("#allpay").text("0");
            $("#tianshu").attr("disabled","true");
            $(".tjsq").attr("disabled","true").css("background-color","#EEEEEE");
        } else {
            $("#errow_title").css("display","none");
            $("#xzbzj").css("display","block");
            $cpzj = parseInt(value);
            $("#cpzj_hidden").val($cpzj);
            $("#tianshu").removeAttr("disabled");
            $(".tjsq").removeAttr("disabled").css("background-color","#d73c3a");

            checkmoney();
            
        }
    })

    function addCommas(nStr){
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x[1];
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1,$2');
        }
        return x1 + (x2 ? x2.replace(/(\d{3})(?=[^$])/g,'$1,') : '');
    }

    function moneyFormat(money) {
        var result = "";
        if (parseInt(money) >= 10000) {
            result = parseInt(money) / 10000 + "万";
        } else {
            result = money;
        }
        return result;
    }

})