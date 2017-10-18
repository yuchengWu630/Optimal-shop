$(function(){
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
});