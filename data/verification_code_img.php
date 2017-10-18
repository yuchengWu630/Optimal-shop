<?php
/**
*向客户端输出一个随机的验证码图片，同时在服务器保存该验证码
*/
header('Content-Type: image/png');

$w = 120;
$h = 40;
//在服务器内存中创建一副图像
$img = imagecreatetruecolor($w, $h);
//分配一个随机颜色，作为背景颜色
$c = imagecolorallocate($img, rand(180,240), rand(180,240),rand(180,240));
//填充一个矩形，作为背景
imagefilledrectangle($img, 0, 0, $w, $h, $c);

//向图像上绘制四个随机的字符
$src = 'ABCDEFGHJKMNPRSTWXYZabcdefghijkmnpqrstuvwxyz123456789';
$code = '';
for($i=0; $i<4; $i++){
  $char = $src[rand(0, strlen($src)-1)];
  $code .= $char;
  $c = imagecolorallocate($img,rand(60,130),rand(60,130), rand(60,130));
  //绘制一个旋转的随机字符，使用指定字体文件
  $fontSize = rand(12, 20);
  $angle = rand(-25, 25);
  $x = 30*$i+10;
  $y = rand(10, $h-10);
  $fontFile = '../fonts/simhei.ttf';
  imagettftext($img,$fontSize,$angle,$x,$y,$c,$fontFile,$char);
}

/*
*验证码必须保存在服务器端，同时每个客户端的验证码彼此不同
*存储中服务器端Session空间中
*/
//为当前客户端分配新的Session空间，或查找它已有的Session空间
session_start();
$_SESSION['RegisterVcode'] = $code;

//绘制5条随机干扰线
for($i=0; $i<5; $i++){
  $c = imagecolorallocate($img,rand(0,255),rand(0,255),rand(0,255));
  imageline($img, rand(0,$w), rand(0,$h), rand(0,$w), rand(0,$h),$c);
}

//把服务器中的图像发送给客户端
imagepng($img);
//从服务器的内存中删除随机图片
imagedestroy($img);
?>