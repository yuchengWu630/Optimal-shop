/*register.html表单验证*/
$(function(){

	//获取所有表单元素
	var $uname=$("input[name='uname']"),
		$email=$("input[name='email']"),
		$upwd=$("input[name='upwd']"),
		$pwdCon=$("input[name='pwdCon']"),
		$checkbox=$("input[name='checkbox2']");
	//定义获得焦点函数
	function getFocus(){
		//$(this)->当前文本框
		//当前文本框边框加粗
		$(this).addClass("txt_focus");
		//清除旁边div的class
		$(this).next().children().first().removeClass();
	}
    $uname.focus(getFocus);
	$email.focus(getFocus);
	$upwd.focus(getFocus);
	$pwdCon.focus(getFocus);
	//定义失去焦点函数
	function vali($txt,reg){
		//清除当前文本框的class
		$txt.removeClass();
		//获取旁边div
		var $div=$txt.next().children().first();
		//用reg测试当前文本框的内容
		if(reg.test($txt.val())){//如果通过
			//就修改div的class为vali_success并返回true
			$div.removeClass().addClass("vali_success");
			return true;
		} else{//否则修改div的class为vali_fail并返回false
			$div.removeClass().addClass("vali_fail");
			return false;
		}
	}
    $uname.blur(function(){
        //清除当前文本框的class
        $(this).removeClass();
        //获取旁边div
        var $div=$(this).next().children().first();
        var reg=/^(\w|[\u4e00-\u9fa5]){4,20}$/;
        //用reg测试当前文本框的内容
        if(reg.test($(this).val())){//如果通过
            var n=$uname.val();
            //发送ajax $ajax();
            $.ajax({
                type:'GET',
                //data/check_uname_register_00.php
                url:"data/check_uname_register_00.php",
                data:{uname:n},
                //接收返回数据  data.code>0
                success:function(data){
                    if(data.code<0){
                        console.log(data.msg);
                        $div.html(data.msg)
                            .addClass("vali_fail")
                            .css('width',400);
                        return false;
                    }else{
                        //就修改div的class为vali_success并返回true
                        $div.html(data.msg).removeClass().addClass("vali_success");
                        return true;
                    }
                }
            });
        } else{//否则修改div的class为vali_fail并返回false
            $div.html("支持中文、字母、数字、'_'的组合，4-20个字符").removeClass().addClass("vali_fail");
            return false;
        }
	});
	$email.blur(function(){
		vali($(this),/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/);
	});
	$upwd.blur(function(){
		vali($(this),/^\w{6,20}$/);
	});
	//确认密码验证函数
	$pwdCon.blur(function() {
        //清除当前文本框的class
        $(this).removeClass();
		var $div = $(this).next().children().first();
		if ($(this).val() === $upwd.val()&&$upwd.val()!="") {
            $div.removeClass().addClass("vali_success");
		}
		else {
            $div.removeClass().addClass("vali_fail");
		}
	});
	//单选框绑定点击事件
	$checkbox.click(function(){
		if($(this).prop('checked'))
			$(this).next().next().addClass("vali_info");
		else $(this).next().next().removeClass();
	});
	//表单逐项验证函数
	function checkSubmit() {
		if (!($uname.next().children().first().attr('class')=="vali_success")) {
			$uname.focus();
			return false;//表单验证未通过时，阻止默认的提交
		}
		if (!vali($email, /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/)) {
			$email.focus();
			return false;//表单验证未通过时，阻止默认的提交
		}
		if (!vali($upwd, /^\w{6,20}$/)) {
			$upwd.focus();
			return false;//表单验证未通过时，阻止默认的提交
		}
		if(!($pwdCon.val() === $upwd.val()&&$upwd.val()!="")){
			$pwdCon.focus();
			return false;//表单验证未通过时，阻止默认的提交
		}
		if($checkbox.prop('checked')==false){
			$checkbox.next().next().removeClass();
			return false;
		}
		return true;
	}
	$("#btn-reg").click(function(e){
		e.preventDefault();//阻止表单默认提交
		if(checkSubmit()){
		// 	location.href="login.html";
		// 	//window.event.returnValue=false这个属性放到提交表单中的onclick事件中在这次点击事件不会提交表单，如果放到超链接中则在这次点击事件不执行超链接href属性
		// 	//window.event.returnValue=false;
		// 	//return false;
			//2.1获取用户名，密码,邮箱地址
			var n=$uname.val();
			var p=$upwd.val();
			var email=$email.val();
			//2.2发送ajax $ajax();
			$.ajax({
				type:'GET',
				//2.3 data/check_uname_register_00.php
				url:"data/check_uname_register_00.php",
				data:{uname:n,email:email,upwd:p},
				//2.4接收返回数据  data.code>0
				success:function(data){
					location.href="login.html";
				}
			});
		} else {
			return false;
		}
    })
});//$(function(){})结束