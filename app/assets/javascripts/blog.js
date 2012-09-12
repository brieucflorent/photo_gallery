$(function() {
  //$("#q_created_at_gt").datepicker();
  $("#q_created_at_gt").datepicker({dateFormat: 'yy-mm-dd'});
  $("#q_created_at_lt").datepicker({dateFormat: 'yy-mm-dd'});
});
  
function centerBlog(){
				var windowWidth = document.documentElement.clientWidth;
				var windowHeight = document.documentElement.clientHeight;
				//var popupAboutHeight = $("#blog").height();
				//var popupAboutWidth = $("#blog").width();
				var popupAboutWidth = windowWidth *70/100;
				$("#blog").css({
					"position": "absolute",
					"top": windowHeight * 5/100,
					"left": windowWidth-popupAboutWidth-windowWidth*3/100,
					"height":windowHeight * 85/100,
					"width":popupAboutWidth
				});
			}

function positionBlogSearch(){
				var windowWidth = document.documentElement.clientWidth;
				var windowHeight = document.documentElement.clientHeight;
				//var popupAboutHeight = $("#blog").height();
				//var popupAboutWidth = $("#blog").width();
				var popupAboutWidth = windowWidth *22/100;
				$("#blogsearch").css({
					"position": "absolute",
					"top": windowHeight * 5/100,
					"left": 10,
					"height":windowHeight * 60/100,
					"width":popupAboutWidth
				});
			}
			
$(window).load(function() {
	positionBlogSearch();
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
                $(".day").click(function(event) {
                	window.location="/blog/"+event.target.id;
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
			

