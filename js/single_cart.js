$(function(){

    /*滑动栏滑到指定位置+100px时执行动画效果*/
    //广告图片
    scrollAnimate($(".photo_ad"),"animated slideInUp");
    //具体描述等
    scrollAnimate($(".description"),"animated slideInUp");
    //相关产品标题
    scrollAnimate($(".head-title"),"animated zoomIn");
    //相关产品图片
    scrollAnimate($(".thumbnail-grids"),"animated slideInLeft");
    /*导入底部footer内容*/
    $("footer").load("footer.html");

    //功能一:发起异步请求,获取相关产品列表
    $.ajax({
        type:'POST',
        url:"data/single_list_13.php",
        success:function(data){
            //3.拼接字符串
            var html='';
            $.each(data,function(i,p){
                html+=`
                    <div class="thumbnail">
                        <div class="thumbnail-images">
                            <a href="${p.pid}" class="goto_single"><img src="${p.pic}"/></a>
                            <div class="thumbnail-images-pos">
                                <a href="${p.pid}" class="goto_single">快速查看</a>
                                <div>
                    `;
                //评级星级p.evalStar为1~5的数字,html拼接时不允许使用循环,必须得单独分离出来
                for(var i=0;i<p.evalStar;i++){
                    html+=`<img src="images/2.png"/>`;
                }
                for(var i=0;i<5-p.evalStar;i++){
                    html+=`<img src="images/1.png"/>`;
                }
                html+=`
                                </div>
                            </div>
                        </div>
                        <div class="caption">
                        <h4><a href="${p.pid}" class="goto_single">${p.pname}</a></h4>
                        <p>${p.intro}</p>
                        <p>
                            <s>￥${parseInt(p.p_price)}</s>
                            <span class="item_price">￥${parseInt(p.price)}</span>
                            <a class="item_add" href="${p.pid}">加入购物车</a>
                        </p>
                        </div>
                    </div>
                    `;
            });
            $("#related-products .thumbnail-grids").html(html);
        }
    });

    //功能二:发起异步请求,获取产品详情信息
    $.ajax({
        type: 'POST',
        url: "data/single_detail_14.php",
        data:{pid:sessionStorage['singlePid']},
        success: function (data) {
            //获取当前图片的数字编号
            var arr=data.pic.split('/');
            var imgNum=parseInt(arr[1]);
            //拼接字符串
            var html =`
            <div id="preview">
                <div class="animated slideInUp">
                    <img id="mImg" src="images/${imgNum}-m.jpg"/>
                    <div id="mask"></div>
                    <div id="superMask"></div>
                </div>
                <div id="largeDiv"></div>
                <ul id="ul_list" class="animated slideInUp">
                    <li>
                        <img src="${data.pic}" class="active"/>
                    </li>
                    <li>
                        <img src="images/s2.jpg"/>
                    </li>
                    <li>
                        <img src="images/s3.jpg"/>
                    </li>
                </ul>
            </div>
            <div class="single-product-info animated slideInRight">
                <h1>${data.pname}</h1>
                <h6>
                    <s>${data.p_price}</s>
                    <span class="item_price">￥${data.price}</span>
                </h6>
                <div class="evaluate-star">
                    `;
            //评级星级data.evalStar为1~5的数字,html拼接时不允许使用循环,必须得单独分离出来
            for(var i=0;i<data.evalStar;i++){
                html+=`<img src="images/2.png"/>`;
            }
            for(var i=0;i<5-data.evalStar;i++){
                html+=`<img src="images/1.png"/>`;
            }
            html+=`
                </div>
                <div class="product-info-description">
                    <h4><i>商品描述：</i></h4>
                    <p>${data.intro}</p>
                </div>
                <div class="color-choose">
                    <h4>颜色：</h4>
                    <ul class="list-inline">
                        <li class="active"><a href="#"><span></span>灰色</a></li>
                        <li><a href="#"><span  class="red"></span>红色</a></li>
                        <li><a href="#"><span  class="blue"></span>蓝色</a></li>
                        <li><a href="#"><span  class="purple"></span>紫色</a></li>
                        <li><a href="#"><span  class="green"></span>绿色</a></li>
                    </ul>
                </div>
                <div class="occasional">
                    <h4>穿着场合：</h4>
                    <div class="occasion-choose">
                        <div>
                            <label class="radio"><input type="radio" name="radio" checked><i></i>休闲</label>
                        </div>
                        <div>
                            <label class="radio"><input type="radio" name="radio"><i></i>Party</label>
                        </div>
                        <div>
                            <label class="radio"><input type="radio" name="radio"><i></i>正式</label>
                        </div>
                    </div>
                </div>
                <a class="item_add" href="${data.pid}">加入购物车</a>
            </div>
            `;
            $('.single-product').html(html);

            /***功能三：放大镜***/
            //为ulList绑定鼠标进入事件
            $("#preview").on("mouseenter","#ul_list li",function(e){
                if(e.target.nodeName=="IMG"){
                    //获得当前img的src
                    var $liOth=$("#ul_list img.active");
                    $liOth.removeClass("active");
                    $(e.target).addClass("active");
                    var src=$(e.target).attr('src');
                    //查找src中最后一个.的位置
                    var i=src.lastIndexOf(".");
                    //设置mImg的src为
                    $("#mImg").attr('src',src.slice(0,i)+"-m"+src.slice(i));
                }
            });
            //为smask绑定鼠标移入和鼠标移出
            $("#preview").on("mouseenter","#superMask",function(){
                $("#mask").css("display","block");
                //获得mImg的src
                var src=$("#mImg").attr('src');
                //查找最后一个.的位置
                var i=src.lastIndexOf(".");
                src=src.slice(0,i-1)+"l"+src.slice(i);
                //显示largeDiv并设置largeDiv的背景图片
                $("#largeDiv").css({"display":"block","background-image":"url("+src+")"});
            });
            //鼠标移出时都隐藏
            $("#preview").on("mouseleave","#superMask", function(){
                $("#mask").css("display","none");
                $("#largeDiv").css("display","none");
            });
            //保存superMask和mask的大小
            var SMWIDTH=254,SMHEIGHT=355,MWIDTH=127,MHEIGHT=177;
            //mask最大top和left
            var MAXTOP=SMHEIGHT-MHEIGHT,MAXLEFT=SMWIDTH-MWIDTH;
            //为smask添加鼠标移动事件
            $("#preview").on("mousemove","#superMask",function(e){
                //获得鼠标相对于当前元素的坐标
                var x= e.offsetX,y= e.offsetY;
                //计算mask的top和left
                var l=x-MWIDTH/2,t=y-MHEIGHT/2;
                if(l<0) l=0;
                else if(l>MAXLEFT) l=MAXLEFT;
                if(t<0) t=0;
                else if(t>MAXTOP) t=MAXTOP;
                //设置mask的top和left
                $("#mask").css({"display":"block","top":t+"px","left":l+"px"});
                //修改largeDiv的背景图片位置
                $("#largeDiv").css("backgroundPosition",
                    -16/7*l+"px "+(-16/7*t)+"px");
            });

        }
    });

});// $() end