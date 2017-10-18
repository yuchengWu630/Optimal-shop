<?php
//1.修改响应头格式json
header("content-type:application/json;charset=utf-8");
//2.获取用户提交参数
@$uid=$_REQUEST['uid'] or die('{"code":-2,"msg":"用户id是必须的"}');
//创建连接，设置编号
require("init.php");
//创建sql语句并发送
$sql="SELECT * FROM t_order WHERE userId=$uid";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);

//定义变量：表示已经完成的异步查询数量
$progress=0;

//方法一：for循环遍历
//根据订单编号查询产品列表——异步查询——必须等待所有的查询全部加载完成才能向客户端输出订单列表
for($i=0;$i<sizeof($rows);$i++){
    $oid=$rows[$i]['oid'];//获取php对象的一个值,订单编号
    $sql="SELECT * FROM product WHERE pid IN
(SELECT productId FROM t_order_detail WHERE orderId=$oid)";
    $result=mysqli_query($conn,$sql);
    $productList=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $rows[$i]['productList']=$productList;

    $progress++;//每进行一次异步查询progress +1
    //sizeof()或者count():获取php对象数组的长度
    if($progress===sizeof($rows)) {//表示所有异步查询完成
        //转换json,发送
        echo json_encode($rows);
    }
}
//方法二：foreach获取下标值$i,不能使用$v值，因为这只是foreach对数组的一个拷贝值，不会改变原数组的值
/*foreach($rows as $i=>$v){
    $oid=$rows[$i]['oid'];//获取php对象的一个值,订单编号
    $sql="SELECT * FROM product WHERE pid IN
(SELECT productId FROM t_order_detail WHERE orderId=$oid)";
    $result=mysqli_query($conn,$sql);
    $productList=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $rows[$i]['productList']=$productList;

    $progress++;//每进行一次异步查询progress +1
    //sizeof()或者count():获取php对象数组的长度
    if($progress===sizeof($rows)) {//表示所有异步查询完成
        //转换json,发送
        echo json_encode($rows);
    }
}*/
//方法三：foreach获取数组中的每个对象，该方法无效
//只是foreach对数组的一个拷贝值，不会改变原数组的值，因此无效不可使用该方法
/*
foreach ($rows as $row){
    $oid=$row['oid'];
    $sql="SELECT * FROM product WHERE pid IN
(SELECT productId FROM t_order_detail WHERE orderId=$oid)";
    $result=mysqli_query($conn,$sql);
    $productList=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $row['productList']=$productList;

    echo json_encode($row);
    $progress++;//每进行一次异步查询progress +1
    //sizeof()或者count():获取php对象数组的长度
    if($progress===sizeof($rows)) {//表示所有异步查询完成
        //转换json，发送
        echo json_encode($rows);
    }
}
*/
?>