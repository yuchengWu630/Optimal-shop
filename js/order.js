$(function(){

	var uid;
	//获取存储在服务器端Session空间中的数据uid
	$.ajax({
		url: 'data/loginInfo.php',
		success: function (result) {
			//用户id:result.uid
			uid = result.uid;
			/**功能点1：点击附加导航，切换中央部分的主题内容**/
			$(".order-affix").on('click','li a',function(e){
				e.preventDefault();
				//修改A的父元素LI的.active的位置
				$(this).parent().addClass('active').siblings('.active').removeClass('active');
				//根据A的href找到对应的右侧DIV，修改.active的位置
				var id=$(this).attr('href');
				$(id).addClass('active').siblings('.active').removeClass('active');
			});

			/*****功能点2：异步请求当前用户的订单列表*****/
			$.ajax({
				type: 'GET',
				url: "data/order_list_16.php",
				data:{uid:uid},
				success: function (orderList){
					//遍历整个订单列表,向table中拼接HTML片段
					var html='';
					for(let i=0;i<orderList.length;i++){
						var order=orderList[i];//订单信息
						html+=`
                    <tr class="my-order-list-number">
                        <td colspan="7">订单编号:${order.oid}</td>
                    </tr>
                    <tr>
                        <td class="products-images">
                     `;
						for(let j=0;j<order.productList.length;j++){
							var p=order.productList[j];//订单中的商品详情
							html+=`
                        <a href="${p.pid}" class="goto_single" title="${p.pname}">
                            <img src="${p.pic}"/>
                        </a>
                    `;
						}
						html+=`
                     </td>
                        <td>${order.conName}</td>
                        <td>${order.phoneNum}</td>
                        <td>${order.orderTime}</td>
                        <td>￥${order.price}</td>
                        <td>${(parseInt(order.payment)===1)?'货到付款':(parseInt(order.payment)===2)?'微信支付':(parseInt(order.payment)===3)?'支付宝支付':'网银支付'}</td>
                        <td>
                            <div class="operation">
                                <a class="close" href="${order.oid}"></a>
                            </div>
                        </td>
                    </tr>
            `;
					}
					$('table.my-order-list tbody').html(html);
				},
				error:function(){
					$('#my-order').html(`
            <p>我的订单</p>
            <h4>您目前还没有任何订单,立即返回<a href="index.html">首页</a>去购物吧！</h4>
            `)
				}
			});

			//功能3:为删除按钮绑定事件监听,
			//实现删除订单选项功能
			$(".my-order-list tbody").on("click",
				"a.close",
				function(e){
					//1:阻止事件默认行为
					e.preventDefault();
					//2:获取当前购物项cid
					var oid = $(this).attr("href");
					//3:留存this<-->删除按钮
					var that = this;   //that<--->删除按钮
					//4:发送ajax请求 shoppingcart_delete_07.php
					$.ajax({
						type:"POST",
						url:"data/order_delete_17.php",
						data:{oid:oid},
						success:function(data){
							if(data.code<0){//5:data.code<0
								//6:data.msg 错误信息
								alert("删除失败:"+data.msg);
							}else{
								//7:data.code>0 删除当前元素a->div->td->tr以及tr->订单编号
								alert("删除成功");
								//必须先删除前面的订单编号tr，再删除自身所在tr
								$(that).parent().parent().parent().prev().remove();
								$(that).parent().parent().parent().remove();
							}
						},
						error:function(){
							alert('删除失败,请检查网络');
						}
					});
				});

			/***功能点4：异步请求消费统计数据,绘制SVG统计图***/
			$.ajax({
				type:'GET',
				url:'data/order_stat_svg_18.php',
				success:function(list){
					//默认初始为线形图
					var c=new FusionCharts({
						type:'line',//'doughnut2d',//'pie3d',//'bar2d',//'column3d' //'column2d' ...//图表类型
						renderAt:'buy-stat-svg',//渲染到div#buy-stat-svg中
						width:800,
						height:500,
						dataSource:{
							data:list   //[{label:'',value:.}]
						}
					});
					//渲染出来
					c.render();
					$("#buy-stat-list").on('click','ul li a',function(e){
						e.preventDefault();
						//修改A的父元素LI的.active的位置
						$(this).parent().addClass('active').siblings('.active').removeClass('active');
						//根据A的href切换图表类型
						var chartType=$('#buy-stat-list li.active a').attr('href');

						// console.log(list);//异步请求到了消费统计数据
						//创建一个图表对象
						var c=new FusionCharts({
							type:chartType,//'doughnut2d',//'pie3d',//'bar2d',//'column3d' //'column2d' //图表类型
							renderAt:'buy-stat-svg',//渲染到div#buy-stat-svg中
							width:800,
							height:500,
							dataSource:{
								data:list   //[{label:'',value:.}]
							}
						});
						//渲染出来
						c.render();

					});

				}
			});
		}
	});

}); //$() end