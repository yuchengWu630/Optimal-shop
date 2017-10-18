<?php
//修改响应头格式
header("Content-Type:application/json;charset=utf-8");
//a:获取删除购物项cid值
@$cid = $_REQUEST['cid']or die('{"code":-1,"msg":"购物车编号是必须的"}');
//b:连接数据库，设置编码
require('init.php');
//c:发送sql删除语句
$sql = "DELETE FROM t_cart WHERE cid=$cid";
$result = mysqli_query($conn,$sql);
//判断是否删除成功
if($result===true){
    echo '{"code":1,"msg":"删除成功"}';
}
?>