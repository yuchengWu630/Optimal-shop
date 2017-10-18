<?php
header("content-type:application/json;charset=utf-8");
//1:获取参数uname upwd
@$uname=$_REQUEST['uname']or die('{"code":-2,"msg":"用户名是必须的"}');
@$upwd=$_REQUEST['upwd']or die('{"code":-3,"msg":"密码是必须的"}');
//2:连接数据库 设置编码
require("init.php");
//3:创建sql    发送 sql
$sql="SELECT uid FROM t_user WHERE uname='$uname' AND upwd='$upwd'";
$result=mysqli_query($conn,$sql);
//4:抓取一行记录
$row=mysqli_fetch_assoc($result);
//5:判断输出最终结果
if($row===NULL){
    echo '{"code":-1,"msg":"用户名或密码有误"}';
}else{
    //登录完成，把当前客户端的登录信息保存其专有的Session空间里
    session_start(); //创建新Session空间或查找当前客户端已有的Session空间
    $_SESSION['loginUname'] = $uname; //在当前客户端的专有Session空间中存数据
    $_SESSION['loginUid']=$row['uid'];
    echo '{"code":1,"msg":"登录成功"}';
}
?>