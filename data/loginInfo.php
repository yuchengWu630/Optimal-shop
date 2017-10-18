<?php
header('Content-Type: application/json;charset=utf-8');

//向当前客户端返回其存储在服务器端Session空间中的数据
session_start();
@$output['uname'] = $_SESSION['loginUname'];
@$output['uid'] = $_SESSION['loginUid'];

echo json_encode($output);
?>