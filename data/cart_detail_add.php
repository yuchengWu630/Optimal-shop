<?php
//功能：将商品添加到购物车
//1.修改响应头格式json
header("content-type:application/json;charset=utf-8");
//2.获取用户提交参数 uid(用户id) pid(产品id)
@$uid=$_REQUEST['uid']or die('{"code":-2,"msg":"用户id是必须的"}');
@$pid=$_REQUEST['pid']or die('{"code":-3,"msg":"产品id是必须的"}');
@$count=$_REQUEST;
//创建连接，设置编号
require("init.php");
//查询uid pid 条件记录
$sql="SELECT * FROM t_cart";
$sql.=" WHERE uid=$uid";
$sql.=" AND pid=$pid";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
//如果不存在就添加
if($row===null){
    $count=1;
    $sql="INSERT INTO t_cart VALUES(null,$uid,$pid,1)";
}else{//如果存在就更新count+1
    $sql="UPDATE t_cart SET count=count+1";
    $sql.=" WHERE uid=$uid AND pid=$pid";
    $count=$row['count']+1;
}
mysqli_query($conn,$sql);
$arr=["code"=>1,"count"=>$count];
echo json_encode($arr);
?>