$(function(){

    /*滑动栏滑到指定位置+100px时执行动画效果*/
    //广告图片
    scrollAnimate($(".photo_ad"),"animated slideInUp");
    // //新品图片
    // scrollAnimate($(".categories-photo>.panel-public:nth-child(2)"),"animated slideInUp");
    // //右侧商品图片
    // scrollAnimate($("#products-right-grids"),"animated slideInUp");
    // //页码
    // scrollAnimate($(".numbering"),"animated slideInRight");

    //功能一:发起异步请求,获取产品列表
    //1.发起ajax请求
    //2.接收服务器返回数据
    //pageNo:当前页码
    function loadProduct(pageNo){
        $.ajax({
            type:'POST',
            data:{pageNo:pageNo},
            url:"data/product_list_04.php",
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
                            <s>￥${p.p_price}</s>
                            <span class="item_price">￥${p.price}</span>
                            <a class="item_add" href="${p.pid}">加入购物车</a>
                        </p>
                        </div>
                    </div>
                    `;
                });
                $("#products-right-grids").html(html);
            }
        });
        //2:再次发送 ajax请求获取总页数
        $.ajax({
            url:"data/product_pageTotal_05.php",
            success:function(data) {
                var pageTotal = data.page;
                //拼接字符串
                var html = "";
                for (var i = 1; i <= pageTotal; i++) {
                    if (i == pageNo) {
                        html += `
                    <li class="active"><a href="#products-right-grids">${i}</a></li>
                    `;
                    } else {
                        html += `
                    <li><a href="#products-right-grids">${i}</a></li>
                    `;
                    }
                }
                $("ul.pagination").html(html);
            }
        });
    }
    loadProduct(1);
    //功能二：为分页条超链接绑定点击事件
    //由于该元素是动态创建使用代理绑定
    $("ul.pagination").on("click","li a",function(e){
        //1:阻止事件默认行为
        e.preventDefault();
        //2:获取当前按钮页码
        var p=$(this).text();
        //3:发送请求
        loadProduct(p);
    });

    //功能三:发起异步请求,获取左侧新品产品列表
    $.ajax({
        type: 'POST',
        url: "data/product_new_list_07.php",
        success: function (data) {
            //新系列产品列表拼接字符串
            var html = '';
            for(let i=0;i<data.length;i++){
                var p=data[i];
                html += `
                    <li>
                        <p>
                            <a href="single.html"><img src="${p.pic}"/></a>
                        </p>
                        <div>
                            <h3>
                                <a href="single.html">${p.pname}</a>
                            </h3>
                            <div class="evaluate-star">
                    `;
                //评级星级p.evalStar为1~5的数字,html拼接时不允许使用循环,必须得单独分离出来
                for (var j = 0; j < p.evalStar; j++) {
                    html += `<img src="images/2.png"/>`;
                }
                for (var j = 0; j < 5 - p.evalStar; j++) {
                    html += `<img src="images/1.png"/>`;
                }
                html += `
                    </div>
                            <div class="item_price">￥${p.price}</div>
                            <a class="item_add" href="${p.pid}">加入购物车</a>
                        </div>
                    </li>
                    `;
            }
            $(".categories-photo .panel-body ol").html(html);
        }
    });

});//$() end;