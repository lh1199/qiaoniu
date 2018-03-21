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
        url: "productsDay.json",
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
                        $this.text(product[index1].data_borrowmoney)
                    }
                })
                };
                for (var j = 0; j < bzj_time.length; j++) {
                    var index3 = j;
                    $(".c-xzbz-c strong").each(function(index4, item) {
                        $this = $(this);
                        if (index3 == index4) {
                            $this.text(bzj_time[index3].data_pzamount)
                        }
                    })
                };
                $("#moneymin").val(product[0].moneyMin);
                $("#moneymax").val(product[0].moneyMax);
                $("#errow_title").text("最少" + fomatNumber(product[0].moneyMin) + ",最多" + fomatNumber(product[0].moneyMax) + ",百的整数倍");
                $("#15money").val(bzj_time[0].moneyTimes);
                $("#10money").val(bzj_time[1].moneyTimes);
                $("#5money").val(bzj_time[2].moneyTimes);
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
            $(this).html("选择操盘资金&gt;&gt;");
            $(".c-xzcp-content1").css("display", "none");
            $("#sdsr-input").css("display", "block");
            flag = false;
        } else {
            $(this).html("手动输入操盘资金&gt;&gt;");
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
        $("#bzj15").text(Math.round($("#cpzj_hidden").val() / $("#15money").val()));
        $("#bzj10").text(Math.round($("#cpzj_hidden").val() / $("#10money").val()));
        $("#bzj5").text(Math.round($("#cpzj_hidden").val() / $("#5money").val()));

        $(".c-xzbz-c").each(function(){
            $this = $(this);
            if($(this).hasClass("c-xzbz-c-active")) {
                $bzj = parseInt($(this).find("strong").text());
                $jjx = bzj_time[$this.index()].rateWarn;
                return;
            }
        })

        var $totalMoney = $cpzj + $bzj;
        var $totalMoney_zfc = addCommas($totalMoney);
        $("#totalMoney strong").text($totalMoney_zfc);

        var $jjx = $cpzj + $bzj * $jjx;
        $("#jjx").text(Math.round($jjx));

        $pcx = product[0].rateOpenLine;
        var $pcx = $cpzj + $bzj * $pcx;
        $("#pcx").text(Math.round($pcx));

        var $bzj_zfc = addCommas($bzj);
        $("#bzj").text($bzj_zfc);

        var $allpay = $bzj + $glf;
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
            // $bzj = parseInt($(this).find("strong").text());
            // $("#bzj_hidden").val($bzj);
            // var $totalMoney = $cpzj + $bzj;
            // var $totalMoney_zfc = addCommas($totalMoney);
            // $("#totalMoney strong").text($totalMoney_zfc);
            // alert(Math.round(2000 / $("#15money").val()));
            // $("#bzj15").text(Math.round(2000 / $("#15money").val()));
            // $("#bzj10").text(Math.round(2000 / $("#10money").val()));
            // $("#bzj5").text(Math.round(2000 / $("#5money").val()));
            
            checkmoney();
        });
    });

    $("#tianshu").change(function() {
        $("#glf").text("￥" + parseInt($(this).children('option:selected').val() * $glfeveryday));
        $glf = $(this).children('option:selected').val() * $glfeveryday;
        // var $allpay = $bzj + $glf;
        // var $allpay_zfc = addCommas($allpay);
        // $("#allpay").text($bzj + $glf);
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
        } else {
            $("#errow_title").css("display","none");
            $("#xzbzj").css("display","block");
            $cpzj = parseInt(value);
            $("#cpzj_hidden").val($cpzj);

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

    function fomatNumber(number) {
        var result;
    
        if (1000 <= parseInt(number) && parseInt(number) < 10000) {
            result = parseInt(number) / 1000 + "千";
        } else if (100 <= parseInt(number) && parseInt(number) < 1000) {
            result = parseInt(number) / 100 + "百";
        }
        else if (10000 <= parseInt(number)) {
    
            result = parseInt(number) / 10000 + "万";
        } else {
            result = number + "元";
        }
        return result;
    }
})