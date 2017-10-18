<?php
//1、将连接数据库与设置编码程序保存在init.php中
//2、哪个php需要数据库连接
// require('init.php');
//require加载-->init.php
//<!--主库域名，用户名，密码，数据库名，端口号-->
//<!--新浪云上全改为变量了，如主库域名: SAE_MYSQL_HOST_M(都是变量不需要加引号)-->
$conn=mysqli_connect('127.0.0.1','root','','myStoreProject');
mysqli_query($conn,"SET NAMES UTF8");
?>