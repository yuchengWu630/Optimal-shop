$(function(){

	var uid;
	//获取存储在服务器端Session空间中的数据uid
	$.ajax({
		url: 'data/loginInfo.php',
		success: function (result) {
			//用户id:result.uid
			uid = result.uid;

			//如果用户已登录即获取到用户的uid,才能执行购物车删加减操作
			//功能1：页面加载完成后，异步请求
			//当前登录用户购物车中商品信息
			$.ajax({
				//参数 uid=1
				data:{uid:uid},
				url:"data/shoppingcartlist_08.php",
				success:function(data){
					if(data[0]){
						//拼接字符串 #cart tbody tr->tr->tr
						var html='';
						$.each(data,function(i,obj){
							html+=`
                <tr>
                    <td class="invert-image">
                        <a class="${obj.pid}"><img src="${obj.pic}"/></a>
                    </td>
                    <td>
                        <button class="${obj.cid}">-</button><input type="text" value="${obj.count}"/><button class="${obj.cid}">+</button>
                    </td>
                    <td>${obj.pname}</td>
                    <td>${obj.price}</td>
                    <td class="sub_total">${(obj.price*obj.count).toFixed(2)}</td>
                    <td>
                        <div class="rem">
                            <a class="close" href="${obj.cid}"></a>
                        </div>
                    </td>
                </tr>
                `;
						});
						$(".timetable_sub tbody").html(html);

						//计算总计价格
						var total=0;
						$('.sub_total').each(function(){
							total+=parseFloat($(this).html());
						});
						$(".checkout-left .total").html(total.toFixed(2));
					}else{//如果当前用户还没有购物数据
						$(".checkout-right").html("");
						$(".checkout-left").html(
							`<h4>您的购物车是空的,立即返回<a href="index.html">首页</a>去购物吧！</h4>`
						)
					}
				}
			});

			//功能2:为删除按钮绑定事件监听,
			//实现删除购物车选项功能
			$(".timetable_sub tbody").on("click",
				"a.close",
				function(e){
					//1:阻止事件默认行为
					e.preventDefault();
					//2:获取当前购物项cid
					var cid = $(this).attr("href");
					//3:留存this<-->删除按钮
					var that = this;   //that<--->删除按钮
					//4:发送ajax请求 shoppingcart_delete_07.php
					$.ajax({
						type:"POST",
						url:"data/shoppingcart_delete_09.php",
						data:{cid:cid},
						success:function(data){
							if(data.code<0){//5:data.code<0
								//6:data.msg 错误信息
								alert("删除失败:"+data.msg);
							}else{
								//7:data.code>0 删除当前元素a->div->td->tr
								alert("删除成功");
								$(that).parent().parent().parent().remove();
								//8.计算总计价格
								var total=0;
								$('.sub_total').each(function(){
									total+=parseFloat($(this).html());
								});
								$(".checkout-left .total").html(total.toFixed(2));
							}
						},
						error:function(){
							alert('删除失败,请检查网络');
						}
					});
				});

			//功能3:为修改购物车中项目 +
			//查找购物车项中+
			//绑定监听事件
			$(".timetable_sub tbody").on("click","button:contains('+')",function(e){
				//1:阻止事件默认行为
				e.preventDefault();
				//2:获取当前购物项cid
				var cid=$(this).attr("class");
				var self = this;// 留存this<-->+按钮
				$.ajax({
					url:"data/shopping_add_cart_10.php",
					data:{cid:cid},
					success:function(data){
						if(data.code>0){
							$(self).prev().val(data.count);
							var price=$(self).parent().next().next().html();
							$(self).parent().next().next().next().html((price*data.count).toFixed(2));
							//计算总计价格
							var total=0;
							$('.sub_total').each(function(){
								total+=parseFloat($(this).html());
							});
							$(".checkout-left .total").html(total.toFixed(2));
						}else{
							//data.msg 错误信息
							alert("增加失败:"+data.msg);
						}
					},
					error:function(){
						alert('增加失败,请检查网络');
					}
				});
			});

			//功能4:为修改购物车中项目 -
			//查找购物车项中-
			//绑定监听事件
			$(".timetable_sub tbody").on("click","button:contains('-')",function(e){
				//1:阻止事件默认行为
				e.preventDefault();
				//2:获取当前购物项cid
				var cid=$(this).attr("class");
				var self = this;//留存this<-->-按钮
				$.ajax({
					url:"data/shopping_reduce_cart_11.php",
					data:{cid:cid},
					success:function(data){
						if(data.code>0){
							$(self).next().val(data.count);
							var price=$(self).parent().next().next().html();
							$(self).parent().next().next().next().html((price*data.count).toFixed(2));
							//计算总计价格
							var total=0;
							$('.sub_total').each(function(){
								total+=parseFloat($(this).html());
							});
							$(".checkout-left .total").html(total.toFixed(2));
						}else{
							//data.msg 错误信息
							alert("删减失败:"+data.msg);
						}
					},
					error:function(){
						alert('删减失败,请检查网络');
					}
				});
			});

			//功能5:点击去结算按钮跳转到确认订单
			$(".checkout-left").on("click","button",function(e) {
				//1:阻止事件默认行为
				e.preventDefault();
				$('.checkout-nav-grids li:nth-child(2)').addClass('active');
				$('.checkout').css('display','none');
				$('.confirm-order').css('display','block');
			});

			//功能6:点击确认订单按钮跳转到成功提交订单,并将订单数据导入数据库，输出生成的订单号
			$(".confirm-order").on("click","#confirm-bt",function(e) {
				//1:阻止事件默认行为
				e.preventDefault();
				//获取商品的pid和count，形成对象数组并转换为json数据
				var pidCount=[];
				var $ins=$('.timetable_sub tbody input');
				var $as=$('.invert-image a');
				for(var i=0;i<$ins.length;i++){
					pidCount[pidCount.length]={pid:$as[i].className,count:$ins[i].value};
				}
				var jsonStr=JSON.stringify(pidCount);
				var conName=$('#link-person').val();
				var phoneNum=$('#link-phoneNumber').val();
				var address=$('#shipping-address').val();
				var price=parseFloat($('.total').html()).toFixed(2);
				var payment=$('.confirm-order input:radio[name="pay-method"]:checked').val();

				if(conName&&phoneNum&&address){
					$.ajax({
						type:"POST",
						url:"data/checkout_order_15.php",
						data:{conName:conName,phoneNum:phoneNum,price:price,payment:payment,uid:uid,jsonStr:jsonStr},
						success:function(result){
							$('.post-order h4 span').html(result);
							$('.checkout-nav-grids li:last-child').addClass('active');
							$('.confirm-order').css('display','none');
							$('.post-order').css('display','block');
						}

					})
				}

			});
			//功能6:点击查看跳转到我的订单页
			$(".post-order").on('click','a.goto_order',function(e){
				e.preventDefault();
				//在当前页面打开订单页，且不可后退
				location.replace('order.html');
			});
		}
	});


});//$()结束