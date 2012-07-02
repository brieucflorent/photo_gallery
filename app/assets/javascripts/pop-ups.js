/***************************/
//@Author: Adrian "yEnS" Mato Gondelle
//@website: www.yensdesign.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!					
/***************************/
//About Page Pop Up



			var popupAboutStatus = 0;
			
			function loadPopupAbout(){				
				var albumcolor=0;
				if(popupAboutStatus==0){
					if ($("#popupAbout").parent().attr("class")== "popup_color0"){
						albumcolor=0;
					}
					if ($("#popupAbout").parent().attr("class")== "popup_color1"){
						albumcolor=1;
					}
					if ($("#popupAbout").parent().attr("class")== "popup_color2"){
						albumcolor=2;
					}
					if ($("#popupAbout").parent().attr("class")== "popup_color3"){
						albumcolor=3;
					}
					if ($("#popupAbout").parent().attr("class")== "popup_color4"){
						albumcolor=4;
					}

					$("#popupAbout").css({
							"border": "1px solid " + colors[albumcolor][0],
							"color": colors[albumcolor][1]
                    });
                      $("#popupAbout h1").css({
                            "color":colors[albumcolor][1],
	                        "border-bottom": "1px dotted " +colors[albumcolor][0]
                    });
                    
                    $("#popupAbout h1").css({                    
      "background-image": "-webkit-gradient(linear,left top, left bottom,from(" + colors[albumcolor][0] +"),to(" + colors[albumcolor][1] +"))"
                    });
                    $("#popupAbout h1").css({
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    "-webkit-text-stroke-width": "1px",
    "-webkit-text-stroke-color": colors[albumcolor][2],
                    });
                    
					$("#popupAbout").fadeIn("slow");
					popupAboutStatus = 1;
				}
			}
			
			function disablePopupAbout(){
				if(popupAboutStatus==1){
					$("#popupAbout").fadeOut("slow");
					popupAboutStatus = 0;
				}
			}
			
			function centerPopupAbout(){
				var windowWidth = document.documentElement.clientWidth;
				var windowHeight = document.documentElement.clientHeight;
				var popupAboutHeight = $("#popupAbout").height();
				var popupAboutWidth = $("#popupAbout").width();
				$("#popupAbout").css({
					"position": "absolute",
					"top": windowHeight/2-popupAboutHeight/2,
					"left": windowWidth/2-popupAboutWidth/2
				});
			}
			
			
			$(document).ready(function(){
				$("#popupAbout").fadeOut();
				popupAboutStatus = 0;
				$("#about").click(function(){
				$("#popupAbout").css({
					"visibility": "visible"	});
					disablePopupProjects();
					disablePopupContact();
					disablePopupBlog();
					centerPopupAbout();
					loadPopupAbout();
				    $("#popupAbout").mCustomScrollbar("vertical",400,"easeOutCirc",1.05,"auto","yes","yes",10);	
				});
				$("#popupAboutClose").click(function(){
					disablePopupAbout();
				});
				$("#bg").click(function(){
					disablePopupAbout();
				});
				
				$(document).keyup(function(e){
				if(e.keyCode === 27)
					disablePopupAbout();
			});
			});
//Projects Page Pop Up
			var popupProjectsStatus = 0;
			
			function loadPopupProjects(){
				var albumcolor=0;
				if(popupProjectsStatus==0){
					if ($("#popupProjects").parent().attr("class")== "popup_color0"){
						albumcolor=0;
					}
					if ($("#popupProjects").parent().attr("class")== "popup_color1"){
						albumcolor=1;
					}
					if ($("#popupProjects").parent().attr("class")== "popup_color2"){
						albumcolor=2;
					}
					if ($("#popupProjects").parent().attr("class")== "popup_color3"){
						albumcolor=3;
					}
					if ($("#popupProjects").parent().attr("class")== "popup_color4"){
						albumcolor=4;
					}


					$("#popupProjects").css({
							"border": "1px solid " + colors[albumcolor][0],
							"color": colors[albumcolor][1]
                    });
                    
                    $("#popupProjects h1").css({
                            "color":colors[albumcolor][1],
	                        "border-bottom": "1px dotted " +colors[albumcolor][0]
                    });
                    
                    $("#popupProjects h1").css({                    
      "background-image": "-webkit-gradient(linear,left top, left bottom,from(" + colors[albumcolor][0] +"),to(" + colors[albumcolor][1] +"))"
                    });
                    $("#popupProjects h1").css({
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    "-webkit-text-stroke-width": "1px",
    "-webkit-text-stroke-color": colors[albumcolor][2],
                    });
					$("#popupProjects").fadeIn("slow");
					popupProjectsStatus = 1;
				}
			}
			
			function disablePopupProjects(){
				if(popupProjectsStatus==1){
					$("#popupProjects").fadeOut("slow");
					popupProjectsStatus = 0;
				}
			}
			
			function centerPopupProjects(){
				var windowWidth = document.documentElement.clientWidth;
				var windowHeight = document.documentElement.clientHeight;
				var popupProjectsHeight = $("#popupProjects").height();
				var popupProjectsWidth = $("#popupProjects").width();
				$("#popupProjects").css({
					"position": "absolute",
					"top": windowHeight/2-popupProjectsHeight/2,
					"left": windowWidth/2-popupProjectsWidth/2
				});
			}
			
			
			$(document).ready(function(){
				$("#popupProjects").fadeOut();
				popupProjectsStatus = 0;
				$("#projects").click(function(){
				$("#popupProjects").css({
					"visibility": "visible"	});
					disablePopupAbout();
					disablePopupContact();
					disablePopupBlog();					
					centerPopupProjects();
					loadPopupProjects();
				    $("#popupProjects").mCustomScrollbar("vertical",400,"easeOutCirc",1.05,"auto","yes","yes",10);						
				});
				$("#popupProjectsClose").click(function(){
					disablePopupProjects();
				});
				
         		
				$("#bg").click(function(){
					disablePopupProjects();
				});
				$(document).keyup(function(e){
				if(e.keyCode === 27)
					disablePopupProjects();
			    });
			});
//Photos Page Pop Up
			var popupPhotosStatus = 0;
			
			function loadPopupPhotos(){
				if(popupPhotosStatus==0){
					if ($("#popupPhotos").parent().attr("class")== "popup_color0"){
						albumcolor=0;
					}
					if ($("#popupPhotos").parent().attr("class")== "popup_color1"){
						albumcolor=1;
					}
					if ($("#popupPhotos").parent().attr("class")== "popup_color2"){
						albumcolor=2;
					}
					if ($("#popupPhotos").parent().attr("class")== "popup_color3"){
						albumcolor=3;
					}
					if ($("#popupPhotos").parent().attr("class")== "popup_color4"){
						albumcolor=4;
					}


					$("#popupPhotos").css({
							"border": "1px solid " + colors[albumcolor][0],
							"color": colors[albumcolor][1]
                    });
                    
                    $("#popupPhotos h1").css({
                            "color":colors[albumcolor][1],
	                        "border-bottom": "1px dotted " +colors[albumcolor][0]
                    });
                    
                    $("#popupPhotos h1").css({                    
      "background-image": "-webkit-gradient(linear,left top, left bottom,from(" + colors[albumcolor][0] +"),to(" + colors[albumcolor][1] +"))"
                    });
                    $("#popupPhotos h1").css({
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    "-webkit-text-stroke-width": "1px",
    "-webkit-text-stroke-color": colors[albumcolor][2],
                    });
					$("#popupPhotos").fadeIn("slow");
					popupPhotosStatus = 1;
				}
			}
			
			function disablePopupPhotos(){
				if(popupPhotosStatus==1){
					$("#popupPhotos").fadeOut("slow");
					popupPhotosStatus = 0;
				}
			}
			
			function centerPopupPhotos(){
				var windowWidth = document.documentElement.clientWidth;
				var windowHeight = document.documentElement.clientHeight;
				var popupPhotosHeight = $("#popupPhotos").height();
				var popupPhotosWidth = $("#popupPhotos").width();
				$("#popupPhotos").css({
					"position": "absolute",
					"top": windowHeight/2-popupPhotosHeight/2,
					"left": windowWidth/2-popupPhotosWidth/2
				});
			}

			
			
			$(document).ready(function(){
				$("#popupPhotos").fadeOut();
				popupPhotosStatus = 0;
				
      			var myAlbumsJSON = $("#my_albums_json").html(),
                myAlbums     = $.parseJSON(myAlbumsJSON);
				$("#photos").click(function(){
				$("#popupPhotos").css({
					"visibility": "visible"	});
					disablePopupAbout();
					disablePopupContact();
					disablePopupBlog();					
					centerPopupPhotos();
					loadPopupPhotos();
				    $("#popupPhotos").mCustomScrollbar("vertical",400,"easeOutCirc",1.05,"auto","yes","yes",10);						
				});
				$("#popupPhotosClose").click(function(){
					disablePopupPhotos();
				});
                
				$("#bg").click(function(){
					disablePopupPhotos();
				});
				$(document).keyup(function(e){
				if(e.keyCode === 27)
					disablePopupPhotos();
			    });
			});
			
//Contact Page Pop Up
			var popupContactStatus = 0;
			
			function loadPopupContact(){
				if(popupContactStatus==0){
					$("#popupContact").fadeIn("slow");
					popupContactStatus = 1;
				}
			}
			
			function disablePopupContact(){
				if(popupContactStatus==1){
					$("#popupContact").fadeOut("slow");
					popupContactStatus = 0;
				}
			}
			
			function centerPopupContact(){
				var windowWidth = document.documentElement.clientWidth;
				var windowHeight = document.documentElement.clientHeight;
				var popupContactHeight = $("#popupContact").height();
				var popupContactWidth = $("#popupContact").width();
				$("#popupContact").css({
					"position": "absolute",
					"top": windowHeight/2-popupContactHeight/2,
					"left": windowWidth/2-popupContactWidth/2
				});
			}
			
			
			$(document).ready(function(){
				$("#popupContact").fadeOut();
				popupContactStatus = 0;
				$("#contact").click(function(){
				$("#popupContact").css({
					"visibility": "visible"	});
					disablePopupAbout();
					disablePopupProjects();
					disablePopupBlog();					
					centerPopupContact();
					loadPopupContact();
				    $("#popupContact").mCustomScrollbar("vertical",400,"easeOutCirc",1.05,"auto","yes","yes",10);						
				});
				$("#popupContactClose").click(function(){
					disablePopupContact();
				});
				$("#bg").click(function(){
					disablePopupContact();
				});
				$(document).keyup(function(e){
				if(e.keyCode === 27)
					disablePopupContact();
			});
			});
//Blog Page Pop Up
			var popupBlogStatus = 0;
			
			function loadPopupBlog(){
				if(popupBlogStatus==0){
					$("#popupBlog").fadeIn("slow");
					popupBlogStatus = 1;
				}
			}
			
			function disablePopupBlog(){
				if(popupBlogStatus==1){
					$("#popupBlog").fadeOut("slow");
					popupBlogStatus = 0;
				}
			}
			
			function centerPopupBlog(){
				var windowWidth = document.documentElement.clientWidth;
				var windowHeight = document.documentElement.clientHeight;
				var popupBlogHeight = $("#popupBlog").height();
				var popupBlogWidth = $("#popupBlog").width();
				$("#popupBlog").css({
					"position": "absolute",
					"top": windowHeight/2-popupBlogHeight/2,
					"left": windowWidth/2-popupBlogWidth/2
				});
			}
			
			
			$(document).ready(function(){
				$("#popupBlog").fadeOut();
				popupBlogStatus = 0;
				$("#blog").click(function(){
				$("#popupBlog").css({
					"visibility": "visible"	});
					disablePopupAbout();
					disablePopupProjects();					
					disablePopupContact();					
					centerPopupBlog();
					loadPopupBlog();
				    $("#popupBlog").mCustomScrollbar("vertical",400,"easeOutCirc",1.05,"auto","yes","yes",10);						
				});
				$("#popupBlogClose").click(function(){
					disablePopupBlog();
				});
				$("#bg").click(function(){
					disablePopupBlog();
				});
				$(document).keyup(function(e){
				if(e.keyCode === 27)
					disablePopupBlog();
			});
			});