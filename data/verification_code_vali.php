<?php
/**
*接收客户端提交的注册信息，若有效则保存入数据库
*/
header('Content-Type: text/plain');
@$c = $_REQUEST['vcode'];  //客户端提交的验证码

//先验证客户端提交的验证码与之前在服务器端保存的验证码是否一致
session_start();
$c = strtolower($c);
$_SESSION['RegisterVcode']=strtolower($_SESSION['RegisterVcode']);
if($c === $_SESSION['RegisterVcode']){
    echo '验证码输入正确';
}else {
    echo '验证码输入有误';
}
?>