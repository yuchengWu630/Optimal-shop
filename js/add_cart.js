//功能:为每个商品下面"添加都购物车"
//绑定监听--事件代理
$(function(){
    $("body").on('click','a.item_add',function(e){
        //1:阻止事件默认行为
        e.preventDefault();
        //2.1获取产品id
        var pid=$(this).attr('href');
	    var uid;
	    //2.2获取存储在服务器端Session空间中的数据uid
	    $.ajax({
		    url: 'data/loginInfo.php',
		    success: function (result) {
			    //用户id:result.uid
			    uid = result.uid;
			    //3:把当前登录用户编号
			    //  +商品编号提交服务器，
			    //  执行购物车自动添加
			    $.ajax({
				    url:"data/cart_detail_add.php",
				    data:{uid:uid,pid:pid},
				    success:function(data){
					    if(data.code<0){
						    if(confirm("添加失败，错误原因:"+data.msg+'。是否立即登录进行购物')){
							    location.href='login.html';
						    }
					    }else{
						    alert("添加成功，该商品购买数量"+data.count);
					    }
				    }
			    });
		    }
	    });
    });
});