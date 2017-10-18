<?php
//1.修改响应头格式json
header("content-type:application/json;charset=utf-8");
//2.获取指定参数
@$uname=$_REQUEST['uname'] or die('{"code":-2,"msg":"用户名是必须的"}');
@$email=$_REQUEST['email'];
@$upwd=$_REQUEST['upwd'];
//3.连接数据库，指定编码
require('init.php');
$sql="SELECT * FROM t_user";
$sql.=" WHERE uname='$uname'";//注意前面需有个空格
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
//判断是否存在
if($row===null){
    echo '{"code":1,"msg":"该用户名可以使用"}';  //不存在，可以使用
    if($email!=''&&$upwd!=''){
        $sql="INSERT INTO t_user VALUES(null,'$uname','$email','$upwd');";
    }
}else{
    echo '{"code":-1,"msg":"该用户名已被注册"}';	//存在，已被注册
}
mysqli_query($conn,$sql);
?>