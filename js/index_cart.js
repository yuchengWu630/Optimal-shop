$(function(){

    /*滑动栏滑到指定位置+100px时执行动画效果*/
    //小图banner
    // scrollAnimate($(".banner-bottom-left"),"animated slideInLeft");
    // scrollAnimate($(".banner-bottom-center"),"animated slideInUp");
    // scrollAnimate($(".banner-bottom-right"),"animated slideInRight");
    //新系列
    scrollAnimate($(".new-collections-grids"),"animated slideInUp");
    //限时特价
    scrollAnimate($(".offer-timer-info"),"animated slideInLeft");
    scrollAnimate($(".special-offer"),"animated slideInRight");
    //图片及通讯
    scrollAnimate($(".collections-bottom-info>h1"),"animated slideInLeft");
    scrollAnimate($(".newsletter"),"animated slideInUp");

    //底部输入邮箱 加入我们 点击事件
    $('#bt-join-us').click(function(e){
        e.preventDefault();
        var reg=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;

        if(reg.test($(this).prev().val())){
            alert('谢谢您加入我们！');
            $(this).prev().val('');
        }
    });

    //功能:发起异步请求,获取产品列表
    $.ajax({
        type: 'POST',
        url: "data/index_list_12.php",
        success: function (data) {
            //新系列产品列表拼接字符串
            var newHtml = '';
            for(let i=0;i<data.length-1;i++){
                var p=data[i];
                newHtml += `
                    <div class="thumbnail">
                        <div class="thumbnail-images">
                            <a href="${p.pid}" class="goto_single"><img src="${p.pic}"/></a>
                            <div class="thumbnail-images-pos">
                                <a href="${p.pid}" class="goto_single">快速查看</a>
                                <div>
                    `;
                //评级星级p.evalStar为1~5的数字,html拼接时不允许使用循环,必须得单独分离出来
                for (var j = 0; j < p.evalStar; j++) {
                    newHtml += `<img src="images/2.png"/>`;
                }
                for (var j = 0; j < 5 - p.evalStar; j++) {
                    newHtml += `<img src="images/1.png"/>`;
                }
                newHtml += `
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
            }
            $(".new-collections-grids").html(newHtml);
            $('.new-collections-grids .thumbnail:nth-child(2)').addClass('thumbnail-new');

            //限时特价产品列表拼接字符串
            var specilHtml='';
            var ot=data[data.length-1];//限时特价商品数据库获取数据对象
            specilHtml+=`
            <h1>
                <a href="${ot.pid}" class="goto_single">${ot.pname}</a>
            </h1>
            <div>
                <img src="images/2.png"/>
                <img src="images/2.png"/>
                <img src="images/2.png"/>
                <img src="images/2.png"/>
                <img src="images/2.png"/>   
            </div>
            <p>
                <s>${ot.p_price}</s>
                <span class="item_price">${ot.price}</span>
            </p>
            <p>${ot.intro}</p>
            <p><a class="item_add" href="${ot.pid}">加入购物车</a></p>
            `;
            $(".offer-timer-info-top").html(specilHtml);
            $(".special-offer").html(`
            <p>
                <a href="${ot.pid}" class="goto_single">
                    <img src="${ot.pic}" alt=""/>
                </a>
            </p>
            <span>限时特价</span>
            `)
        }
    });

});//$() end;