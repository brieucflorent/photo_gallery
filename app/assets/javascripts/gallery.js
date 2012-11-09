/* Background gallery by http://manos.malihu.gr */
//config
//set default images view mode
$defaultViewMode="normal"; //full, normal, original
$tsMargin=30; //first and last thumbnail margin (for better cursor interaction) 
$scrollEasing=600; //scroll easing amount (0 for no easing) 
$scrollEasingType="easeOutCirc"; //scroll easing type 
$thumbnailsContainerOpacity=0.8; //thumbnails area default opacity
$thumbnailsContainerMouseOutOpacity=0; //thumbnails area opacity on mouse out
$thumbnailsOpacity=0.6; //thumbnails default opacity
$nextPrevBtnsInitState="show"; //next/previous image buttons initial state ("hide" or "show")
$keyboardNavigation="on"; //enable/disable keyboard navigation ("on" or "off")

//cache vars
$thumbnails_wrapper=$("#thumbnails_wrapper");
$outer_container=$("#outer_container");
$thumbScroller=$(".thumbScroller");
$thumbScroller_container=$(".thumbScroller .container");
$thumbScroller_content=$(".thumbScroller .content");
$thumbScroller_thumb=$(".thumbScroller .thumb");
$preloader=$("#preloader");
$toolbar=$("#toolbar");
$toolbar_a=$("#toolbar a");
$bgimg=$("#bgimg");
$img_title=$("#img_title");
$nextImageBtn=$(".nextImageBtn");
$prevImageBtn=$(".prevImageBtn");

//alert("templatecol"+$("body").attr("template_color"));

var RED=0;
var GREEN=1;
var PINK=2;
var colors=[["#A41030","#591015","#240606"],["#0DA096","#134A32","#0D2712"],["#D789E3","#931D69","#30172A"],["#00BCD6","#00677C","#005364"],["#F9E05B","#CDAF07","#7D6B06"]];

function apply_color(albumcolor){	
	$('hgroup').css("color", colors[albumcolor][1]);	
	$('hgroup').css("background-image", "-webkit-gradient(linear,left top, left bottom,from("+ colors[albumcolor][0]+"),to("+ colors[albumcolor][1]+"))");
	$('hgroup').css("-webkit-text-stroke-color", colors[albumcolor][2]);

	$('#img_title').css("color", colors[albumcolor][1]);	
	$('#img_title').css("background-image", "-webkit-gradient(linear,left top, left bottom,from("+ colors[albumcolor][0]+"),to("+ colors[albumcolor][1]+"))");
	$('#img_title').css("-webkit-text-stroke-color", colors[albumcolor][2]);
	
	$('ul.menu li span span.link').css("color", colors[albumcolor][1]);
	$('ul.menu li span span.link, ul.menu li span span.descr, ul.menu li div.box a').css("background-image", "-webkit-gradient(linear,left top, left bottom,from("+ colors[albumcolor][0]+"),to("+ colors[albumcolor][1]+"))");
	$('ul.menu li span span.link, ul.menu li span span.descr, ul.menu li div.box a').css(colors[albumcolor][2]);
	
	$('ul.menuleft li span span.link').css("color", colors[albumcolor][1]);
	$('ul.menuleft li span span.link, ul.menu li span span.descr, ul.menu li div.box a').css("background-image", "-webkit-gradient(linear,left top, left bottom,from("+ colors[albumcolor][0]+"),to("+ colors[albumcolor][1]+"))");
	$('ul.menuleft li span span.link, ul.menu li span span.descr, ul.menu li div.box a').css(colors[albumcolor][2]);
	
	$('#outer_container .thumbScroller img').css("border",'3px solid '+ colors[albumcolor][1]);
	
	
	
}
apply_color($("body").attr("template_color"));

$(window).load(function() {
	$toolbar.data("imageViewMode",$defaultViewMode); //default view mode
	if($defaultViewMode=="full"){
		$toolbar_a.html("<img src='/assets/toolbar_n_icon.png' width='50' height='50'  />").attr("onClick", "ImageViewMode('normal');return false").attr("title", "Restore");
	} else {
		$toolbar_a.html("<img src='/assets/toolbar_fs_icon.png' width='50' height='50'  />").attr("onClick", "ImageViewMode('full');return false").attr("title", "Maximize");
	}
	ShowHideNextPrev($nextPrevBtnsInitState);
	//thumbnail scroller
	$thumbScroller_container.css("marginLeft",$tsMargin+"px"); //add margin
	sliderLeft=$thumbScroller_container.position().left;
	sliderWidth=$outer_container.width();
	$thumbScroller.css("width",sliderWidth);
	var totalContent=0;
	fadeSpeed=200;
	
	var $the_outer_container=document.getElementById("outer_container");
	var $placement=findPos($the_outer_container);
	
	$thumbScroller_content.each(function () {
		var $this=$(this);
		totalContent+=$this.innerWidth();
		$thumbScroller_container.css("width",totalContent);
		$this.children().children().children(".thumb").fadeTo(fadeSpeed, $thumbnailsOpacity);
	});

	$thumbScroller.mousemove(function(e){
		if($thumbScroller_container.width()>sliderWidth){
	  		var mouseCoords=(e.pageX - $placement[1]);
	  		var mousePercentX=mouseCoords/sliderWidth;
	  		var destX=-((((totalContent+($tsMargin*2))-(sliderWidth))-sliderWidth)*(mousePercentX));
	  		var thePosA=mouseCoords-destX;
	  		var thePosB=destX-mouseCoords;
	  		if(mouseCoords>destX){
		  		$thumbScroller_container.stop().animate({left: -thePosA}, $scrollEasing,$scrollEasingType); //with easing
	  		} else if(mouseCoords<destX){
		  		$thumbScroller_container.stop().animate({left: thePosB}, $scrollEasing,$scrollEasingType); //with easing
	  		} else {
				$thumbScroller_container.stop();  
	  		}
		}
	});

	$thumbnails_wrapper.fadeTo(fadeSpeed, $thumbnailsContainerOpacity);
	$thumbnails_wrapper.hover(
		function(){ //mouse over
			var $this=$(this);
			$this.stop().fadeTo("slow", 1);
		},
		function(){ //mouse out
			var $this=$(this);
			$this.stop().fadeTo("slow", $thumbnailsContainerMouseOutOpacity);
		}
	);

	$thumbScroller_thumb.hover(
		function(){ //mouse over
			var $this=$(this);
			$this.stop().fadeTo(fadeSpeed, 1);
		},
		function(){ //mouse out
			var $this=$(this);
			$this.stop().fadeTo(fadeSpeed, $thumbnailsOpacity);
		}
	);

	//on window resize scale image and reset thumbnail scroller
	$(window).resize(function() {
		FullScreenBackground("#bgimg",$bgimg.data("newImageW"),$bgimg.data("newImageH"));
		$thumbScroller_container.stop().animate({left: sliderLeft}, 400,"easeOutCirc"); 
		var newWidth=$outer_container.width();
		$thumbScroller.css("width",newWidth);
		sliderWidth=newWidth;
		$placement=findPos($the_outer_container);
	});

	//load 1st image
	var the1stImg = new Image();
	the1stImg.onload = CreateDelegate(the1stImg, theNewImg_onload);
	the1stImg.src = $bgimg.attr("src");
	$outer_container.data("nextImage",$(".content").first().next().find("a").attr("href"));
	$outer_container.data("prevImage",$(".content").last().find("a").attr("href"));
	
});

function BackgroundLoad($this,imageWidth,imageHeight,imgSrc){
	$this.fadeOut("fast",function(){
		$this.attr("src", "").attr("src", imgSrc); //change image source
		FullScreenBackground($this,imageWidth,imageHeight); //scale background image
		$preloader.fadeOut("fast",function(){$this.fadeIn("slow");});
		var imageTitle=$img_title.data("imageTitle");
		if(imageTitle){
			$this.attr("alt", imageTitle).attr("title", imageTitle);
			$img_title.fadeOut("fast",function(){
				$img_title.html(imageTitle).fadeIn();
			});
		} else {
			$img_title.fadeOut("fast",function(){
				$img_title.html($this.attr("title")).fadeIn();
			});
		}
	});
}

//mouseover toolbar
if($toolbar.css("display")!="none"){
	$toolbar.fadeTo("fast", 0.4);
}
$toolbar.hover(
	function(){ //mouse over
		var $this=$(this);
		$this.stop().fadeTo("fast", 1);
	},
	function(){ //mouse out
		var $this=$(this);
		$this.stop().fadeTo("fast", 0.4);
	}
);

//Clicking on thumbnail changes the background image
$("#outer_container a").click(function(event){
	event.preventDefault();
	var $this=$(this);	
	GetNextPrevImages($this);
	GetImageTitle($this);
	//SwitchImage(this);
	SwitchImage($this.attr("href"));
	
	//window.history.replaceState("cururl","mylink",'/photos/' + img.substr(68,1))
	ShowHideNextPrev("show");
}); 

//next/prev images buttons
$nextImageBtn.click(function(event){
	event.preventDefault();
	SwitchImage($outer_container.data("nextImage"));
	var $this=$("#outer_container a[href='"+$outer_container.data("nextImage")+"']");
	GetNextPrevImages($this);
	GetImageTitle($this);
});

$prevImageBtn.click(function(event){
	event.preventDefault();
	SwitchImage($outer_container.data("prevImage"));
	var $this=$("#outer_container a[href='"+$outer_container.data("prevImage")+"']");
	GetNextPrevImages($this);
	GetImageTitle($this);
});

//next/prev images keyboard arrows
if($keyboardNavigation=="on"){
$(document).keydown(function(ev) {
    if(ev.keyCode == 39) { //right arrow
        SwitchImage($outer_container.data("nextImage"));
		var $this=$("#outer_container a[href='"+$outer_container.data("nextImage")+"']");
		GetNextPrevImages($this);
		GetImageTitle($this);
        return false; // don't execute the default action (scrolling or whatever)
    } else if(ev.keyCode == 37) { //left arrow
        SwitchImage($outer_container.data("prevImage"));
		var $this=$("#outer_container a[href='"+$outer_container.data("prevImage")+"']");
		GetNextPrevImages($this);
		GetImageTitle($this);
        return false; // don't execute the default action (scrolling or whatever)
    }
});
}

function ShowHideNextPrev(state){
	if(state=="hide"){
		$nextImageBtn.fadeOut();
		$prevImageBtn.fadeOut();
	} else {
		$nextImageBtn.fadeIn();
		$prevImageBtn.fadeIn();
	}
}

//get image title
function GetImageTitle(elem){
	var title_attr=elem.children("img").attr("title"); //get image title attribute
	$img_title.data("imageTitle", title_attr); //store image title
}

//get next/prev images
function GetNextPrevImages(curr){
	var nextImage=curr.parents(".content").next().find("a").attr("href");
	if(nextImage==null){ //if last image, next is first
		var nextImage=$(".content").first().find("a").attr("href");
	}
	$outer_container.data("nextImage",nextImage);
	var prevImage=curr.parents(".content").prev().find("a").attr("href");
	if(prevImage==null){ //if first image, previous is last
		var prevImage=$(".content").last().find("a").attr("href");
	}
	$outer_container.data("prevImage",prevImage);
}

//switch image
function SwitchImage(img){
	$preloader.fadeIn("fast"); //show preloader
	var theNewImg = new Image();
	theNewImg.onload = CreateDelegate(theNewImg, theNewImg_onload);
	theNewImg.src = img;
	window.history.replaceState("cururl","mylink",'/photos/' + img.split('/')[6])
}

//get new image dimensions
function CreateDelegate(contextObject, delegateMethod){
	return function(){
		return delegateMethod.apply(contextObject, arguments);
	}
}

//new image on load
function theNewImg_onload(){
	$bgimg.data("newImageW",this.width).data("newImageH",this.height);
	BackgroundLoad($bgimg,this.width,this.height,this.src);
}

//Image scale function
function FullScreenBackground(theItem,imageWidth,imageHeight){
	var winWidth=$(window).width();
	var winHeight=$(window).height();
	var marginTop,rate;
	if($toolbar.data("imageViewMode")!="original"){ //scale
		var picHeight = imageHeight / imageWidth;
		var picWidth = imageWidth / imageHeight;
		if($toolbar.data("imageViewMode")=="full"){ //fullscreen size image mode
			if ((winHeight / winWidth) < picHeight) {
				$(theItem).attr("width",winWidth);
				$(theItem).attr("height",picHeight*winWidth);
			} else {
				$(theItem).attr("height",winHeight);
				$(theItem).attr("width",picWidth*winHeight);
			};
			
		$(".direction.up").css("position","absolute");
		$(".direction.up").css("left",(winWidth-$(theItem).width())/2);
		$(".direction.up").css("right",(winWidth+$(theItem).width())/2);
		$(".direction.up").css("top",0);
		$(".direction.up").css("height",winHeight/2);
		$(".direction.up").css("width",winWidth);
		$(".direction.up").css("bottom",winHeight/2);
		$(".direction.down").css("position","absolute");
		$(".direction.down").css("height",winHeight/2);
		$(".direction.down").css("width",winWidth);
		$(".direction.down").css("left",0);
		$(".direction.down").css("right",(winWidth+$(theItem).width())/2);
		$(".direction.down").css("top",winHeight/2);
		$(".direction.down").css("bottom",winHeight);
		$(".direction.up").click(function(e){
			ImageViewMode('normal');
			$(".direction.up").css("height",0);
		    $(".direction.up").css("width",0);
			$(".direction.down").css("height",0);
		    $(".direction.down").css("width",0);
		
			return false;
		});	
		
		$(".direction.down").click(function(e){
			ImageViewMode('normal');
			$(".direction.up").css("height",0);
		    $(".direction.up").css("width",0);
			$(".direction.down").css("height",0);
		    $(".direction.down").css("width",0);
		
			return false;
		});			
        $('.direction.up').mousemove(function(e){
        	marginTop=$(theItem).data("margin-top");        	
            rate = (-marginTop )*(winHeight/2 - e.pageY)/winHeight;
            if (marginTop<0){
               marginTop=marginTop + rate *2;
               if (marginTop >0){
               	marginTop=0;
               } 
               $(theItem).data("margin-top",marginTop);               
      		   $(theItem).css("margin-top",marginTop);
      		   
            }
        	//alert(e.pageY);
    	    //alert("mouve move up");
        });
        $('.direction.down').mousemove(function(e){
            marginTop=$(theItem).data("margin-top");
            //alert(marginTop);        	
            rate = - (e.pageY)/winHeight;
            //alert(marginTop);
            if (marginTop > -$(theItem).height()){
               marginTop=marginTop + rate *100;
               if (marginTop < -$(theItem).height()+winHeight){
               	marginTop=-$(theItem).height()+winHeight;
               } 
               $(theItem).data("margin-top",marginTop);               
      		   $(theItem).css("margin-top",marginTop);
      		   
            }
        
        	//alert("mouve move down");
        });
		} else { //normal size image mode
			if ((winHeight / winWidth) > picHeight) {
				$(theItem).attr("width",winWidth);
				$(theItem).attr("height",picHeight*winWidth);
			} else {
				$(theItem).attr("height",winHeight);
				$(theItem).attr("width",picWidth*winHeight);
			};
		}
		$(theItem).css("margin-left",(winWidth-$(theItem).width())/2);
		$(theItem).css("margin-top",(winHeight-$(theItem).height())/2);
		$(theItem).data("margin-top",(winHeight-$(theItem).height())/2);
	} else { //no scale
		$(theItem).attr("width",imageWidth);
		$(theItem).attr("height",imageHeight);
		$(theItem).css("margin-left",(winWidth-imageWidth)/2);
		$(theItem).css("margin-top",(winHeight-imageHeight)/2);
		$(theItem).data("margin-top",(winHeight-imageHeight)/2);
	}
}

//Image view mode function - fullscreen or normal size
function ImageViewMode(theMode){
	$toolbar.data("imageViewMode", theMode);
	FullScreenBackground($bgimg,$bgimg.data("newImageW"),$bgimg.data("newImageH"));
	/*if(theMode=="full"){
		$toolbar_a.html("<img src='/assets/toolbar_n_icon.png' width='50' height='50'  />").attr("onClick", "ImageViewMode('normal');return false").attr("title", "Restore");
	} else {
		$toolbar_a.html("<img src='/assets/toolbar_fs_icon.png' width='50' height='50'  />").attr("onClick", "ImageViewMode('full');return false").attr("title", "Maximize");
	}
	*/
	if(theMode=="full"){
		$bgimg.attr("onClick", "ImageViewMode('normal');return false").attr("title", "Restore");
	} else {
		$bgimg.attr("onClick", "ImageViewMode('full');return false").attr("title", "Maximize");
	}
}


function selectAlbum(albumid) {

	var myAlbumsJSON = $("#my_albums_json").html(), myAlbums = $.parseJSON(myAlbumsJSON);
	var myPhotosJSON = $("#my_albumphotos_json" + albumid).html(), myPhotos = $.parseJSON(myPhotosJSON);
	//var curPhotoJSON = $("#curphoto_json").html(), curPhoto = $.parseJSON(curPhotoJSON);
	var albumname = "test";
	$.each(myAlbums, function(i, val) {
		if(val.id == albumid) {
			albumname = val.name;
			albumcolor = val.template_color;
		}

	});
            
		
	apply_color(albumcolor);
	loadthumbs(albumname,myPhotos,albumcolor);
	apply_colorthumbs(albumcolor);
	disablePopupPhotos();
	
		//var imageArray = ['images/gallery/2.jpg', 'images/gallery/3.jpg', 'images/gallery/4.jpg', 'images/gallery/5.jpg', 'images/gallery/6.jpg'];
            //var myPhotos=["https://radiant.gallery.s3.amazonaws.com/uploads/photo/imagefile/23/DSC6667.jpg?AWSAccessKeyId=AKIAIOWAKMSK3N5JQ6OA&Signature=WbYiC7l%2FZ0GYMZJGvqzTYR%2B%2ByUg%3D&Expires=1335866537","https://radiant.gallery.s3.amazonaws.com/uploads/photo/imagefile/24/zita_redmodel.jpg?AWSAccessKeyId=AKIAIOWAKMSK3N5JQ6OA&Signature=CsmhlXq0PbtWsoeVnEt%2FciTaHDI%3D&Expires=1335866537"]
            //var hidden = $('body').append('<div id="img-cache" style="display:none/>').children('#img-cache');
            var hidden = $('#img-cache');
            
			//$('<img/>').attr('src', curPhoto.imagefile.url).appendTo(hidden);
			//$.each(myPhotos, function (i, val) {
			//  $('<img/>').attr('src', val.imagefile.url).appendTo(hidden);
		//	});
			
	//window.history.replaceState("cururl","mylink",'/photos/' + myPhotos[0].id)
}

function selectProject(albumid) {

	var myAlbumsJSON = $("#my_projects_json").html(), myAlbums = $.parseJSON(myAlbumsJSON);
	var myPhotosJSON = $("#my_projectphotos_json" + albumid).html(), myPhotos = $.parseJSON(myPhotosJSON);
	var albumname = "test";
	$.each(myAlbums, function(i, val) {
		if(val.id == albumid) {
			albumname = val.name;
			albumcolor = val.template_color;
		}

	});
	var hidden = $('#img-cache');
			
	$.each(myPhotos, function (i, val) {
			  $('<img/>').attr('src', val.imagefile.url).appendTo(hidden);
			});
	apply_color(albumcolor);
	loadthumbs(albumname,myPhotos,albumcolor);
	apply_colorthumbs(albumcolor);
	//setTimeout(apply_colorthumbs(albumcolor), 3000);
    disablePopupProjects();
	//window.history.replaceState("cururl","mylink",'/photos/' + myPhotos[0].id);
}

function apply_colorthumbs(albumcolor){
	//alert("zita");
	//alert(albumcolor);
	$('#outer_container .thumbScroller img').css("border",'3px solid '+ colors[albumcolor][1]);
}

function loadthumbs(albumname,myPhotos,albumcolor){	
	if($bgimg.attr("src").split("Signature")[0] != myPhotos[0].imagefile.url.split("Signature")[0]) {
	    //event.preventDefault();
		SwitchImage(myPhotos[0].imagefile.url);
		var $this = $("#outer_container a[href='" + myPhotos[0].imagefile.url + "']");
		$img_title.data("imageTitle", myPhotos[0].title);
		$('#albumname h1').text(albumname);
		totalContent = 0;
		//var numPhotos=myPhotos.count
		var count = 0;
		$thumbScroller_container.empty();
		
		$.each(myPhotos, function(i, val) {
			var myImg = new Image();
			$(myImg).attr("alt", val.title);
		
			$(myImg).addClass('thumb');
			$(myImg).attr("title", val.title);
			$(myImg).load(function() {
				var $this = $(this);
				count++;
			    
				$this.wrap("<a href='" + val.imagefile.url + "'></a>")
				totalContent += $this.parents(".content").innerWidth();
			    $thumbScroller_container.css("width", totalContent);
			    $thumbScroller_container.css("left", "0px");
				$this.fadeTo(fadeSpeed, $thumbnailsOpacity);
		
				if(count == myPhotos.length) {				
     			    //$('#outer_container .thumbScroller img').css("border",'3px solid '+ colors[albumcolor][1]);
        			$("#outer_container a").click(function(event) {
						event.preventDefault();
						var $this = $(this);
						GetNextPrevImages($this);
						GetImageTitle($this);
						//SwitchImage(this);
						SwitchImage($this.attr("href"));
						ShowHideNextPrev("show");
					});
					$thumbScroller.mousemove(function(e) {
						if($thumbScroller_container.width() > sliderWidth) {
							var mouseCoords = (e.pageX - $placement[1]);
							var mousePercentX = mouseCoords / sliderWidth;
							var destX = -((((totalContent + ($tsMargin * 2)) - (sliderWidth)) - sliderWidth) * (mousePercentX));
							var thePosA = mouseCoords - destX;
							var thePosB = destX - mouseCoords;
							if(mouseCoords > destX) {
								$thumbScroller_container.stop().animate({
									left : -thePosA
								}, $scrollEasing, $scrollEasingType);
								//with easing
							} else if(mouseCoords < destX) {
								$thumbScroller_container.stop().animate({
									left : thePosB
								}, $scrollEasing, $scrollEasingType);
								//with easing
							} else {
								$thumbScroller_container.stop();
							}
						}
					});
					
				$outer_container.data("nextImage", $(".thumbScroller .content").first().next().find("a").attr("href"));
				$outer_container.data("prevImage", $(".thumbScroller .content").last().find("a").attr("href"));
				}

			});
			myImg.src = val.imagefile.thumb.url;
			$thumbScroller_container.append($("<div>").addClass("content").append($("<div>").append($(myImg))));
			});
		var $the_outer_container = document.getElementById("outer_container");
		var $placement = findPos($the_outer_container);


	}
}

//function to find element Position
	function findPos(obj) {
		var curleft = curtop = 0;
		if (obj.offsetParent) {
			curleft = obj.offsetLeft
			curtop = obj.offsetTop
			while (obj = obj.offsetParent) {
				curleft += obj.offsetLeft
				curtop += obj.offsetTop
			}
		}
		return [curtop, curleft];
	}
	
	