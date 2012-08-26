//= require redactor-rails
  
function centerBlog(){
				var windowWidth = document.documentElement.clientWidth;
				var windowHeight = document.documentElement.clientHeight;
				//var popupAboutHeight = $("#blog").height();
				var popupAboutWidth = $("#blog").width();
				$("#blog").css({
					"position": "absolute",
					"top": windowHeight * 5/100,
					"left": windowWidth/2-popupAboutWidth/2,
					"height":windowHeight * 80/100
				});
			}

$(window).load(function() {
	centerBlog();
	//on window resize scale image and reset thumbnail scroller
	$(window).resize(function() {
     	centerBlog();
	});

	//load 1st image
	
});

			$(document).ready(function(){
				commentStatus = 0;
				var textheight=$('.newcomment textarea').height();
				$(".buttons").css({
					"margin-top": textheight	});
				
				$(".comment").click(function(event){
					//alert(event.target.id);
      				$("#n"+event.target.id).filter(".newcomment").css({"display": "block"});
				    $("#"+event.target.id).filter(".comment").css({"display":"none"});
				});
				
                $('.newcomment textarea').autosize();
                
                $('.cancel').click(function(event){	
                 	event.preventDefault();
                	$(".comment").css({"display":"block"});
                	$(".newcomment").css({"display":"none"});
                });
                
                $('.comments-link').click(function(event){
                	//alert(event.target.id.split("l")[1]);
                	var chid="#pc"+event.target.id.split("l")[1]
                  	if(!$(chid).data("status")){
		               $(chid).data("status",0);
                   	}
                   	var commentStatus =$(chid).data("status");
                 	if (commentStatus == 0){
		               $(chid).data("status",1);
		               //alert($("#"+chid + " .popupComments").attr('class'));
                	   $(chid).css({"display":"block"});
                	}else{
		               $(chid).data("status",0);
                       $(chid).css({"display":"none"});	
                	}	
                 	event.preventDefault();
                });
                
			});
			

