$(function(){
    //点击换一张更换验证码图片
    $('#login-change').on('click',function(e){
        e.preventDefault();
        $('#codepng').attr('src','data/verification_code_img.php');
    });

    //验证验证码输入是否正确
    $('#inputChk').blur(function(){
        var val=this.value;
        var me=this;
        var newCode='';
        $.ajax({
            type:'post',
            url:'data/verification_code_vali.php',
            data:{vcode:val},
            success:function(data){
                console.log(data);
                if(data==='验证码输入正确'){
                    $('#chkOk').css('display','block');
                    me.newCode=val;
                    $('#login-info').html(data)
                        .css('color','#34FF71');
                }else{
                    $('#login-info').html(data)
                    .css('color','#e4393c');
                }
            }
        });
    });

    //功能：为登录按包绑定事件监听
    //1.获取登录按钮
    //2.绑定单击事件
    $("#btn-login").click(function(){
        //2.1获取用户名，密码
        var n=$("[name='uname']").val();
        var p=$("[name='upwd']").val();
        var v=$('#login-info').html();
        //2.2发送ajax $ajax();
        $.ajax({
            type:'POST',
            //2.3 地址data/user_login_01.php
            url:"data/user_login_01.php",
            data:{uname:n,upwd:p},
            //2.4接收返回数据  data.code>0
            success:function(data){
                if(data.code<0){
                    $("p.alert").html(data.msg);
                }else{
                    $("p.alert").html("用户名和密码输入正确")
                    .css({'color':'green','background':'#bfa','border':'1px solid #ccc'});
                    if(v==="验证码输入有误"){
                        v='请填写正确的验证码';
                        $("#login-info").html(v).css('color','#e4393c');
                    }else if(v==='') {
                        v = "请填写验证码";
                        $('#login-info').html(v).css('color','#e4393c');
                    }else if(v==='验证码输入正确'){
                    //2.5登录成功跳转到首页
                    location.href="index.html";
                    //2.6升级增加功能:!!!!!
                    //登录成功,将uid和uname会话级保存
	                sessionStorage['loginUname']=n;
	                sessionStorage['loginUid']=data.uid;
                    }
                }
            }
        });
    });
});