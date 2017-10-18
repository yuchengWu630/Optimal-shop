<?php
//1.修改响应头格式json
header("content-type:application/json;charset=utf-8");

//自定义消费数据
$list=[
['label'=>'1月','value'=>4000],
['label'=>'2月','value'=>5000],
['label'=>'3月','value'=>6000],
['label'=>'4月','value'=>3000],
['label'=>'5月','value'=>5500],
['label'=>'6月','value'=>3500],
['label'=>'7月','value'=>5000],
['label'=>'8月','value'=>8000],
['label'=>'9月','value'=>4500],
['label'=>'10月','value'=>2000],
['label'=>'11月','value'=>7000],
['label'=>'12月','value'=>1000],
];
//向客户端输出
echo json_encode($list);
?>