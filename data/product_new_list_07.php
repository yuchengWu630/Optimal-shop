<?php
//1.修改响应头格式json
header("content-type:application/json;charset=utf-8");
//2.创建数据库连接，设置编码
require("init.php");
//3.创建并发送sql
$sql="SELECT * FROM product WHERE pid>200 AND pid<300";
//4.抓取多行记录
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
//5.转换json
$str=json_encode($rows);
//6.发送
echo $str;
?>