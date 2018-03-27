$(function(){
    function isPhoneNo(phone){ 
        var pattern = /^1[34578]\d{9}$/; 
        return pattern.test(phone); 
    }

    function isEmailNo(email){
        var emailNo = email;
        return !emailNo.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/);
    }

    $(".denglu").click(function(){
        var $userName = $("#Name").val();
        var $userPassWord = $("#passWord").val();
        $("#userName").val($userName);
        $("#userPassWord").val($userPassWord);
        if($.trim($('#userName').val()).length == 0){ 
            alert("请输入手机号/邮箱/用户名");
            $('#Name').focus();
        }else if(isPhoneNo($.trim($('#userName').val())) == true || isEmailNo($.trim($('#userName').val())) == false){
            if($.trim($('#userPassWord').val()).length == 0){
                alert("请输入密码");
                $('#passWord').focus();
            }else{
                $(window).attr('location','index.html');
            }
        }
    })
})
