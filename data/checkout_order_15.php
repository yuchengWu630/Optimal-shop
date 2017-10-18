<?php
//1.修改响应头格式json
header("content-type:application/json;charset=utf-8");
//2.获取用户提交参数
@$conName=$_REQUEST['conName'] or die('{"code":-1,"msg":"联系人是必须的"}');
@$phoneNum=$_REQUEST['phoneNum'] or die('{"code":-2,"msg":"联系电话是必须的"}');
@$price=$_REQUEST['price'] or die('{"code":-3,"msg":"订单总价是必须的"}');
@$payment=$_REQUEST['payment'] or die('{"code":-4,"msg":"支付方式是必须的"}');
@$uid=$_REQUEST['uid'] or die('{"code":-5,"msg":"用户id是必须的"}');
@$jsonStr=$_REQUEST['jsonStr'] or die('{"code":-6,"msg":"商品id和数量是必须的"}');
//创建连接，设置编号
require("init.php");
//创建sql语句并发送
$sql="INSERT INTO t_order VALUES(NULL,'$conName','$phoneNum',$price,$payment,now(),$uid)";
mysqli_query($conn,$sql);
//获取刚刚插入订单的$orderId
$orderId=mysqli_insert_id($conn);//返回连接上刚刚执行insert语句产生自增编号.

//客户端传来的数据为json格式，先转换为php对象类型
$strs=json_decode($jsonStr,true);

foreach($strs as $i=>$v){
    $pid=$v['pid'];
    $count=$v['count'];
    $sql="INSERT INTO t_order_detail VALUES(NULL,$orderId,$pid,$count)";
    mysqli_query($conn,$sql);
}
//订单提交后删除该用户购物车的数据
$sql = "DELETE FROM t_cart WHERE uid=$uid";
mysqli_query($conn,$sql);

//输出订单编号到客户端
echo $orderId;
?>