<?php
//功能:
//1.修改响应头格式json
header("content-type:application/json;charset=utf-8");
//2.获取用户提交参数 pid(产品id)
@$pid=$_REQUEST['pid']or die('{"code":-1,"msg":"产品id是必须的"}');
//3.创建数据库连接，设置编码
require("init.php");
//4.创建并发送sql
$sql="SELECT * FROM product WHERE pid=$pid";
//5.抓取一行记录
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_assoc($result);
//6.转换json
$str=json_encode($rows);
//7.发送
echo $str;
?>