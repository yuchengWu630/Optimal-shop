<?php
//1.修改响应头格式json
header("content-type:application/json;charset=utf-8");
//2.创建数据库连接，设置编码
require("init.php");
//3.创建并发送sql
//3.1获取用户提交参数
@$pageNo=$_REQUEST['pageNo'];
if($pageNo===NULL){
    $pageNo=1;
}
//3.2计算查询偏移量
$offset=($pageNo-1)*9;
$sql="SELECT * FROM product WHERE pid>100 AND pid<200 LIMIT $offset,9";
//4.抓取多行记录
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
//5.转换json
$str=json_encode($rows);
//6.发送
echo $str;
?>