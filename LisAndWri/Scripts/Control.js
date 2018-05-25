$(document).ready(function(){
    $('#btn-prev').attr('disabled', 'disabled');
    $("li").click(function(){
    	$("li").removeClass("active");
    	$(this).addClass("active");
        $("#danhsach").fadeIn("slow");
    });

    $("#btnNew").click(function(){
    	$("#NewMode").show();	
    	$("#btnNew").hide();
    	$("#btnFull").hide();
	});
    
	$("#btnFull").click(function(){
    	$("#FullMode").show();
    	$("#btnFull").hide();	
    	$("#btnNew").hide();   
	});

	$("#btnExitFull").click(function(){
		var r = confirm("Bạn có thực sự muốn đổi chế độ khác");
		if (r == true) {
			$("#FullMode").hide();
			$("#btnFull").show();	
    		$("#btnNew").show(); 
		} else {
		}
	});

	$("#btnExitNew").click(function(){
		var r = confirm("Bạn có thực sự muốn đổi chế độ khác");
		if (r == true) {
		    $("#NewMode").hide();
			$("#btnFull").show();	
    		$("#btnNew").show(); 
		} else {
		}
    });

});

$(window).load(function () {
    $('#btn-prev').attr('disabled', 'disabled');
});