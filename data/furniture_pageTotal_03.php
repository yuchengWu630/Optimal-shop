<?php
//功能:查询计算总页数
//1.修改响应头格式json
header("content-type:application/json;charset=utf-8");
//2.创建数据库连接，设置编码
require("init.php");
//3.创建并发送sql
//查询总记录数
$sql="SELECT count(pid) FROM product WHERE pid<100";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);//索引数组
//2.依据总记录数算总页
$page=ceil($row[0]/9); //$row[0]=45
$str=["page"=>$page];
echo json_encode($str);
?>