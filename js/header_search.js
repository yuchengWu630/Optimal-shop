$(function(){
    /*导入顶部header内容*/
    /*若有登录则显示登录id*/
    $(".header").load("header.html",function(){
	    //获取存储在服务器端Session空间中的数据
	    $.ajax({
		    url:'data/loginInfo.php',
		    success: function(result){
			    //用户名:result.uname
			    //用户id:result.uid
			    if(result.uname){
				    $('.head-login').html('欢迎回来:'+result.uname);
				    $('.head-register').html(`<a href=${result.uid} class="login-out">退出登录</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="order.html" class="goto_order">我的订单</a>`)
					    .on('click','a.login-out',function(e){
						    e.preventDefault();
						    $.ajax({
							    //点击退出登录按钮，清空其存储在服务器端Session空间中的数据
							    url:'data/login_out.php',
							    success: function(result){console.log(succ);}
						    });
						    location.href='index.html';
					    })
					    .on('click','a.goto_order',function(e){
						    e.preventDefault();
						    //在新窗口打开我的订单页，只能打开一个页面
						    open('order.html','_order');
					    });
			    }else{
				    $('.head-login').html=`
                <i class="glyphicon glyphicon-log-in" aria-hidden="true"></i>
                <a href="login.html">登录</a>
                `;
				    $('.head-register').html=`
                <i class="glyphicon glyphicon-book" aria-hidden="true"></i>
                <a href="register.html">注册</a>
                `;
			    }
		    }
	    });


        //功能:看用户是否登录判断能否前往购物车
        $('.shopping-cart').on('click','a.goto_checkout',function(e){
            //阻止默认事件
            e.preventDefault();
	        //如果用户已登录即获取到用户的uid,才能前往购物车
	        if($('a.login-out').attr('href')){
		        //在新窗口打开购物车页，只能打开一个页面
		        open('checkout.html','_checkout');
	        }else{//若没有登录进行操作时提示是否立即登录
		        if(confirm('是否立即登录进行购物')){
			        location.href='login.html';
		        }
	        }
        });

        /*****功能：搜索框功能实现*****/

        //功能一:搜索框输入内容就显示匹配的选项/搜索建议
        // keyup 事件会在键盘按键被松开时发生
        $(".search-box").on('keyup','.search-box-input',function(){
            var keyword=$('.search-box-input').val();
            $.ajax({
                type:'POST',
                url:'data/header_search.php',
                data:{keyword:keyword},
                success:function(result) {
                    if(!keyword){
                        $("#search-result ul").html('');
                        $("#search-result").css('display', 'none');
                        return;//阻止当前js运行
                    }else{
                        if(result.code===-1){
                            $("#search-result ul").html(`<li>${result.msg}</li>`);
                            $("#search-result").css('display', 'block');
                        }else{
                            if(result[0]){
                                var html = '';
                                for (var i = 0; i < result.length; i++) {
                                    html += `
                                <li class="${result[i].pid}">${result[i].pname}</li>
                                `;
                                }
                                $("#search-result ul").html(html);
                                $("#search-result").css('display', 'block');
                            } else {
                                $("#search-result ul").html(`<li>未搜索到该商品</li>`);
                                $("#search-result").css('display', 'block');
                            }
                        }
                    }
                }
            });

        });
        /*功能二:点击搜索到的选项跳到相关商品详情页*/
        $("#search-result ul").on('click','li',function(){
            //会话级存储当前商品Pid
            sessionStorage['singlePid']=$(this).attr('class');
            //在新窗口打开详情页，可打开多个
            open('single.html','_blank');
        });
        /*功能三:离开搜索框范围，隐藏搜索结果，并清空搜索内容*/
        $(".logo-nav").on('mouseleave','.search-box',function(){
            $("#search-result").css('display', 'none');
            $('.search-box-input').val('');
        });


    });//$(header).load   end

    /*导入底部footer内容*/
    $("footer").load("footer.html");

});//$() end