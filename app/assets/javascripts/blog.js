  
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

var commentStatus=0;
			$(document).ready(function(){
				commentStatus = 0;
				var textheight=$('.newcomment textarea').height();
				$(".buttons").css({
					"margin-top": textheight	});
				
				$(".comment").click(function(){
      				$(".newcomment").css({"display": "block"	});
				    $(".comment").css({"display":"none"});
				});
				
                $('.newcomment textarea').autosize();
                
                $('.cancel').click(function(event){	
                 	event.preventDefault();
                	$(".comment").css({"display":"block"});
                	$(".newcomment").css({"display":"none"});
                });
                
                $('#comments-link').click(function(event){
                 	if (commentStatus == 0){
                 		commentStatus = 1;
                	    $(".popupComments").css({"display":"block"});
                	}else{
                		commentStatus = 0;
                    	$(".popupComments").css({"display":"none"});	
                	}	
                 	event.preventDefault();
                });
                
			});
			

