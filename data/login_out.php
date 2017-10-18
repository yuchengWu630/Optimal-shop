<?php
header('Content-Type: application/json;charset=utf-8');

//当前客户端点击退出登录按钮，清空其存储在服务器端Session空间中的数据
session_start();
session_destroy(); //清空以创建的所有SESSION
?>