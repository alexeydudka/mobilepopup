$().ready(function(){
	$("body").on("click",".popup-demo",function(){
		$.mobilepopup({
			targetblock:".pop-up1",
			width:"500px",
			height:"300px"
		});
		return false;
	});

	$("body").on("click",".get-demopopup2",function(){
		$.mobilepopup('reload',{
			html:".pop-up2",
			width:"500px",
			height:"400px"
		});
		return false;
	});
});