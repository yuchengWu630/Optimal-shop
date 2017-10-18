<?php
header("content-type:application/json;charset=utf-8");
//a:获取增加购物项cid值
@$cid = $_REQUEST['cid']or die('{"code":-1,"msg":"购物车编号是必须的"}');
//连接数据库，设置编码
require("init.php");
//创建并发送sql
$sql="UPDATE t_cart SET count=count-1";
$sql.=" WHERE cid=$cid AND count>1";
$result=mysqli_query($conn,$sql);
//判断输出返回结果
if($result===true){
    $sql="SELECT * FROM t_cart WHERE cid=$cid";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);
    $count=$row['count'];
    $arr=["code"=>1,"count"=>$count];
    echo json_encode($arr);
}
?>