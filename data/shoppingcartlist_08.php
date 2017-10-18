<?php
//1.修改响应格式json
header("content-type:application/json;charset=utf-8");
//2.获取参数uid
@$uid=$_REQUEST['uid']or die('{"code":-2,"msg":"用户id不能为空"}');
//3.创建数据连接，设置编码
require('init.php');
//4.创建sql，多表
$sql="SELECT c.cid,p.pic,p.pname,p.price,c.count,p.pid";
$sql.=" FROM t_cart c,product p";
$sql.=" WHERE c.pid=p.pid";
$sql.=" AND c.uid=$uid";
$result=mysqli_query($conn,$sql);
//5.抓取多条记录
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
//6.转换json
$str=json_encode($rows);
//7.发送json
echo $str;
?>