$(function(){
	var spanD=document.getElementsByClassName("days")[0];
	var spanH=document.getElementsByClassName("hours")[0];
	var spanM=document.getElementsByClassName("minutes")[0];
	var spanS=document.getElementsByClassName("seconds")[0];
	var spanDate=document.getElementsByClassName("date")[0];

	function task(){
		/*var now=new Date();//系统时间
		 var date=new Date(now);//将开始时间复制一个副本
		 date.setDate(date.getDate()+10);
		 var end=new Date(date);*/
		var countDown=parseInt(spanDate.innerHTML);
		if(countDown>0){
			countDown--;
			var d=parseInt(countDown/3600/24);
			if(d<10) d="0"+d;
			//countDown/3600/24,再下取整
			var h=parseInt(countDown%(3600*24)/3600);
			if(h<10) h="0"+h;
			//countDown/(3600*24)的余数,再/3600,再下去整
			var m=parseInt(countDown%3600/60);
			if(m<10) m="0"+m;
			//countDown/3600的余数,再/60，再下取整
			var s=countDown%60;//s/60的余数
			if(s<10) s="0"+s;
			spanD.innerHTML=d;
			spanH.innerHTML=h;
			spanM.innerHTML=m;
			spanS.innerHTML=s;
			spanDate.innerHTML=countDown;
		}
	}
	task();
	setInterval(task,1000);
});