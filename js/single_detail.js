$(function(){
    $('body').on('click','a.goto_single',function(e){
        //阻止默认事件
        e.preventDefault();
        //会话级存储当前商品Pid
        sessionStorage['singlePid']=$(this).attr('href');
        //在新窗口打开详情页，可打开多个
        open('single.html','_blank');
    })
});