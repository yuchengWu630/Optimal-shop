<?php
//修改响应头格式
header("Content-Type:application/json;charset=utf-8");
//a:获取删除购物项cid值
@$oid = $_REQUEST['oid']or die('{"code":-1,"msg":"订单编号是必须的"}');
//b:连接数据库，设置编码
require('init.php');
//c:发送sql删除语句
$sql = "DELETE FROM t_order WHERE oid=$oid";
mysqli_query($conn,$sql);
$sql = "DELETE FROM t_order_detail WHERE orderId=$oid";
$result = mysqli_query($conn,$sql);
//判断是否删除成功
if($result===true){
    echo '{"code":1,"msg":"删除成功"}';
}
?>