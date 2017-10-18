#新浪云提供的共享型数据库只能建表,不能删库和建库
SET NAMES UTF8;
DROP DATABASE IF EXISTS myStoreProject;
CREATE DATABASE myStoreProject CHARSET=UTF8;
USE myStoreProject;
# 商品表
CREATE TABLE product(
   pid   INT PRIMARY KEY AUTO_INCREMENT,
   pname VARCHAR(50) NOT NULL DEFAULT '',
   intro VARCHAR(100) NOT NULL DEFAULT '',
   p_price DOUBLE(10,2) NOT NULL DEFAULT 0,
   price DOUBLE(10,2) NOT NULL DEFAULT 0,
   pic   VARCHAR(100) NOT NULL DEFAULT '',
   evalStar TINYINT #1-评价1颗星 2-评级2颗星 3-评级3颗星 4-评级4颗星 5-评价5颗星
);
# 家具类商品 1~100
INSERT INTO product VALUES
(1,'边桌1','折叠桌方形桌子',325.00,250.00,'images/30.jpg',3),
(null,'2座沙发1','简约实木沙发',280.00,220.00,'images/33.jpg',4),
(null,'脚踝链子1','名族风复古脚踝链子',180.00,120.00,'images/10.jpg',5),
(null,'机箱柜1','4层多媒体机箱柜',340.00,260.00,'images/32.jpg',2),
(null,'壁灯1','简约过道灯壁灯',480.00,400.00,'images/6.jpg',3),
(null,'水晶手镯1','时尚奥地利水晶新款手镯',340.00,257.00,'images/11.jpg',3),
(null,'电视柜1','实木现代简约电视柜',585.00,489.00,'images/31.jpg',5),
(null,'壁灯1','全铜欧式客厅复古单头壁灯',360.00,300.00,'images/9.jpg',3),
(null,'挂钟1','时尚创意静音挂钟',475.00,415.00,'images/34.jpg',4),
(null,'茶几1','胡桃色实木质感茶几',150.00,99.00,'images/40.jpg',2),
(null,'简易衣柜1','折叠收纳12门6格2挂',275.00,199.00,'images/41.jpg',3),
(null,'鞋架1','实木四层置物架',99.00,69.00,'images/42.jpg',2),
(null,'边桌2','折叠桌方形桌子',325.00,250.00,'images/30.jpg',3),
(null,'2座沙发2','简约实木沙发',280.00,220.00,'images/33.jpg',4),
(null,'脚踝链子2','名族风复古脚踝链子',180.00,120.00,'images/10.jpg',3),
(null,'机箱柜2','4层多媒体机箱柜',340.00,260.00,'images/32.jpg',2),
(null,'壁灯2','简约过道灯壁灯',480.00,400.00,'images/6.jpg',5),
(null,'水晶手镯2','时尚奥地利水晶新款手镯',340.00,257.00,'images/11.jpg',3),
(null,'电视柜2','实木现代简约电视柜',585.00,489.00,'images/31.jpg',4),
(null,'壁灯2','全铜欧式客厅复古单头壁灯',360.00,300.00,'images/9.jpg',3),
(null,'挂钟2','时尚创意静音挂钟',475.00,415.00,'images/34.jpg',5),
(null,'茶几2','胡桃色实木质感茶几',150.00,99.00,'images/40.jpg',3),
(null,'简易衣柜2','折叠收纳12门6格2挂',275.00,199.00,'images/41.jpg',4),
(null,'鞋架2','实木四层置物架',99.00,69.00,'images/42.jpg',4),
(null,'边桌3','折叠桌方形桌子',325.00,250.00,'images/30.jpg',3),
(null,'2座沙发3','简约实木沙发',280.00,220.00,'images/33.jpg',2),
(null,'脚踝链子3','名族风复古脚踝链子',180.00,120.00,'images/10.jpg',4),
(null,'机箱柜3','4层多媒体机箱柜',340.00,260.00,'images/32.jpg',3),
(null,'壁灯3','简约过道灯壁灯',480.00,400.00,'images/6.jpg',4),
(null,'水晶手镯3','时尚奥地利水晶新款手镯',340.00,257.00,'images/11.jpg',2),
(null,'电视柜3','实木现代简约电视柜',585.00,489.00,'images/31.jpg',5),
(null,'壁灯3','全铜欧式客厅复古单头壁灯',360.00,300.00,'images/9.jpg',4),
(null,'挂钟3','时尚创意静音挂钟',475.00,415.00,'images/34.jpg',2),
(null,'茶几3','胡桃色实木质感茶几',150.00,99.00,'images/40.jpg',3),
(null,'简易衣柜3','折叠收纳12门6格2挂',275.00,199.00,'images/41.jpg',4),
(null,'鞋架3','实木四层置物架',99.00,69.00,'images/42.jpg',5),
(null,'边桌4','折叠桌方形桌子',325.00,250.00,'images/30.jpg',3),
(null,'2座沙发4','简约实木沙发',280.00,220.00,'images/33.jpg',2),
(null,'脚踝链子4','名族风复古脚踝链子',180.00,120.00,'images/10.jpg',4),
(null,'机箱柜4','4层多媒体机箱柜',340.00,260.00,'images/32.jpg',3),
(null,'壁灯4','简约过道灯壁灯',480.00,400.00,'images/6.jpg',5),
(null,'水晶手镯4','时尚奥地利水晶新款手镯',340.00,257.00,'images/11.jpg',4),
(null,'电视柜4','实木现代简约电视柜',585.00,489.00,'images/31.jpg',3),
(null,'壁灯4','全铜欧式客厅复古单头壁灯',360.00,300.00,'images/9.jpg',2),
(null,'挂钟4','时尚创意静音挂钟',475.00,415.00,'images/34.jpg',3);
# 服饰类商品 101~200
INSERT INTO product VALUES
(101,'休闲衬衫1','2017新款修身棉衬衣',325.00,250.00,'images/19.jpg',4),
(null,'女式西服1','女纯色休闲小西装',315.00,239.00,'images/43.jpg',5),
(null,'正式衬衫1','男士正装纯色长袖衬衫',280.00,220.00,'images/7.jpg',3),
(null,'休闲衬衫1','男士纯棉长袖衬衣男',305.00,280.00,'images/20.jpg',2),
(null,'短袖T恤1','春装新款宽松简约T桖',79.00,59.90,'images/47.jpg',3),
(null,'休闲裤1','彩虹条纹侧拉链休闲女长裤',229.00,186.00,'images/46.jpg',4),
(null,'帆布鞋1','透气帆布鞋男板鞋',225.00,150.00,'images/21.jpg',5),
(null,'男靴1','商务高帮皮鞋潮流尖头男靴',480.00,400.00,'images/22.jpg',2),
(null,'短外套1','薄款冰丝镂空潮外套',249.00,186.00,'images/45.jpg',3),
(null,'休闲鞋1','百搭棕色休闲鞋',389.00,299.00,'images/23.jpg',4),
(null,'西装马甲1','西服背心休闲马甲',360.00,300.00,'images/25.jpg',2),
(null,'西服1','商务简约男士西服',475.00,415.00,'images/26.jpg',3),
(null,'连衣裙1','夏季新款棉麻连衣裙',439.00,389.00,'images/44.jpg',4),
(null,'西装1','纯色百搭男青年西装 棕色',385.00,289.00,'images/24.jpg',5),
(null,'短袖T恤1','宽松休闲女装小衫棉麻T桖',109.00,89.00,'images/48.jpg',3),
(null,'牛仔裤1','绣花中腰宽松哈伦风牛仔裤女',249.00,199.00,'images/49.jpg',4),
(null,'休闲衬衫2','2017新款修棉衬衣',325.00,250.00,'images/19.jpg',3),
(null,'女式西服2','女纯色休闲小西装',315.00,239.00,'images/43.jpg',2),
(null,'正式衬衫2','男士正装纯色长袖衬衫',280.00,220.00,'images/7.jpg',4),
(null,'休闲衬衫2','男士纯棉长袖衬衣男',305.00,280.00,'images/20.jpg',3),
(null,'短袖T恤2','春装新款宽松简约T桖',79.00,59.90,'images/47.jpg',5),
(null,'休闲裤2','彩虹条纹侧拉链休闲女长裤',229.00,186.00,'images/46.jpg',4),
(null,'帆布鞋2','透气帆布鞋男板鞋',225.00,150.00,'images/21.jpg',4),
(null,'男靴2','商务高帮皮鞋潮流尖头男靴',480.00,400.00,'images/22.jpg',5),
(null,'短外套2','薄款冰丝镂空潮外套',249.00,186.00,'images/45.jpg',4),
(null,'休闲鞋2','百搭棕色休闲鞋',389.00,299.00,'images/23.jpg',3),
(null,'西装马甲2','西服背心休闲马甲',360.00,300.00,'images/25.jpg',2),
(null,'西服2','商务简约男士西服',475.00,415.00,'images/26.jpg',4),
(null,'连衣裙2','夏季新款棉麻连衣裙',439.00,389.00,'images/44.jpg',3),
(null,'西装2','纯色百搭男青年西装 棕色',385.00,289.00,'images/24.jpg',2),
(null,'短袖T恤2','宽松休闲女装小衫棉麻T桖',109.00,89.00,'images/48.jpg',4),
(null,'牛仔裤2','绣花中腰宽松哈伦风牛仔裤女',249.00,199.00,'images/49.jpg',3),
(null,'休闲衬衫3','2017新款修棉衬衣',325.00,250.00,'images/19.jpg',2),
(null,'女式西服3','女纯色休闲小西装',315.00,239.00,'images/43.jpg',4),
(null,'正式衬衫3','男士正装纯色长袖衬衫',280.00,220.00,'images/7.jpg',2),
(null,'休闲衬衫3','男士纯棉长袖衬衣男',305.00,280.00,'images/20.jpg',3),
(null,'短袖T恤3','春装新款宽松简约T桖',79.00,59.90,'images/47.jpg',4),
(null,'休闲裤3','彩虹条纹侧拉链休闲女长裤',229.00,186.00,'images/46.jpg',4),
(null,'帆布鞋3','透气帆布鞋男板鞋',225.00,150.00,'images/21.jpg',3),
(null,'短外套3','薄款冰丝镂空潮外套',249.00,186.00,'images/45.jpg',5),
(null,'休闲鞋3','百搭棕色休闲鞋',389.00,299.00,'images/23.jpg',4),
(null,'西装马甲3','西服背心休闲马甲',360.00,300.00,'images/25.jpg',4),
(null,'连衣裙3','夏季新款棉麻连衣裙',439.00,389.00,'images/44.jpg',3),
(null,'短袖T恤3','宽松休闲女装小衫棉麻T桖',109.00,89.00,'images/48.jpg',2),
(null,'牛仔裤3','绣花中腰宽松哈伦风牛仔裤女',249.00,199.00,'images/49.jpg',4);

# product页侧边新品 201~203
INSERT INTO product VALUES
   (201,'连衣裙','夏季新款棉麻连衣裙',439.00,389.00,'images/44.jpg',4),
   (null,'短袖T恤','宽松休闲女装小衫棉麻T桖',109.00,89.00,'images/48.jpg',2),
   (null,'西服','商务简约男士西服',475.00,415.00,'images/26.jpg',3);

# furniture页侧边新品 301~303
INSERT INTO product VALUES
   (301,'茶几','胡桃色实木质感茶几',150.00,99.00,'images/40.jpg',4),
   (null,'简易衣柜','折叠收纳12门6格2挂',275.00,199.00,'images/41.jpg',3),
   (null,'鞋架','实木四层置物架',99.00,69.00,'images/42.jpg',5);

# single页侧边新品 401~404
INSERT INTO product VALUES
(401,'帆布鞋','透气帆布鞋男板鞋',225.00,150.00,'images/21.jpg',4),
(null,'短外套','薄款冰丝镂空潮外套',249.00,186.00,'images/45.jpg',3),
(null,'边桌','折叠桌方形桌子',325.00,250.00,'images/30.jpg',3),
(null,'电视柜','实木现代简约电视柜',585.00,489.00,'images/31.jpg',5);

# index页侧边新品 501~507
INSERT INTO product VALUES
   (501,'壁灯','全铜欧式客厅背景墙复古单头壁灯',360.00,300.00,'images/9.jpg',5),
   (null,'餐桌','现代桌椅组合6人长方形家用小户型餐桌',580.00,550.00,'images/5.jpg',4),
   (null,'壁灯','欧式壁灯 简约餐厅、过道灯壁灯灯饰',480.00,400.00,'images/6.jpg',3),
   (null,'正式衬衫','男士新款商务正装 方领长袖衬衫 蓝色',325.00,250.00,'images/7.jpg',3),
   (null,'珍珠宝石脚踝链子','名族风复古脚踝链子 珍珠+宝石',180.00,120.00,'images/10.jpg',2),
   (null,'水晶手镯','女欧美奢华时尚奥地利水晶新款手镯',340.00,257.00,'images/11.jpg',1),
   (null,'运动鞋','PUMA网面跑步鞋本蓝色+灰色+黄色',280.00,199.00,'images/8.jpg',2);

# index页特价商品 550
INSERT INTO product VALUES
(550,'女士 黑色单肩长款连衣裙','夏季新品 &nbsp;女士连衣裙&nbsp; 优雅气质中长袖宽松单肩礼服裙 &nbsp;斜肩长款连衣裙 宴会聚会party女士必备礼服裙，彰显优雅气质 黑色',580.00,550.00,'images/17.jpg',4);

# 用户表
CREATE TABLE t_user(
   uid INT PRIMARY KEY AUTO_INCREMENT,
   uname VARCHAR(20) NOT NULL DEFAULT '',
   email VARCHAR(50) NOT NULL DEFAULT '',
   upwd VARCHAR(32) NOT NULL DEFAULT ''
);
INSERT INTO t_user VALUES
  (null,'tony','tony@163.com','123456'),
  (null,'mary','mary@qq.com','123456'),
  (null,'james','james@qq.com','123456'),
  (null,'lesley','lesley@qq.com','9635214'),
  (null,'blank','blank@163.com','111111');

# 购物车表
CREATE TABLE t_cart(
   cid INT PRIMARY KEY AUTO_INCREMENT,
   uid INT NOT NULL DEFAULT 0,
   pid INT NOT NULL DEFAULT 0,
   count INT NOT NULL DEFAULT 0
);
INSERT INTO t_cart VALUES
   (null,1,1,2),
   (null,1,2,1);

CREATE TABLE t_order(
  oid BIGINT PRIMARY KEY AUTO_INCREMENT,
  conName VARCHAR(32),
  phoneNum VARCHAR(20),
  price DECIMAL(10,2),
  payment TINYINT,  /*1-货到付款 2-微信支付 3-支付宝支付 4-网银支付*/
  orderTime DATETIME NOT NULL DEFAULT 0,
  userId INT
);
INSERT INTO t_order VALUES
  (913431801,'jackson','13545525555',1500, 1, '2016-06-08 13:00:13', 1),
  (null,'mary','13545525555',1200, 2, '2016-07-12 19:00:00', 1),
  (null,'jackson','13545525555',1200, 3, '2016-07-18 18:30:43', 1),
  (null,'james','13545525555',1200, 1, '2016-12-15 14:00:00', 1),
  (null,'bluce','13545525555',1200, 4, '2017-01-01 09:00:12', 1),
  (null,'chancel','13545525555',1200, 2, '2017-02-08 11:00:16', 1);

CREATE TABLE t_order_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  orderId BIGINT,
  productId INT,
  count INT
);
INSERT INTO t_order_detail VALUES
  (NULL, 913431801, 10, 1),
  (NULL, 913431801, 15, 3),
  (NULL, 913431802, 3, 2),
  (NULL, 913431803, 5, 1),
  (NULL, 913431803, 7, 2),
  (NULL, 913431803, 13, 4),
  (NULL, 913431804, 22, 2),
  (NULL, 913431804, 15, 3),
  (NULL, 913431805, 9, 1),
  (NULL, 913431806, 31, 2),
  (NULL, 913431806, 32, 1),
  (NULL, 913431807, 18, 1);