var speed = 3000, run = 0, sec_run = 0;
var no_li = 0, item_width = 0, ul_length = 0 , left_value = 0 , flag = 0, current = 0, secFlag = 0, faqFlag = 0;
var maxHeight;var str = '';
var index = 0 ,no_sec_li = 0 ,sec_index = 0, sec_item_width = 0, sec_left_value = 0 , ul_length = 0;
(function($) {
	
	$(document).ready(function(){
		$.getJSON("JSON/carousel-data.json", function(result){
			$.each(result, function(i, field){
				var carousel = '<li class="pos-' + i +'">';
				
				carousel += '<div class="carousel_wrap"><div class="carousel_img"><img src="' + field.image + '" /> </div>'; 
				carousel += '<div class="carousel_mid"></div><div class="carousel_bottom"><div class="carousel_text">';
				carousel += '<h2>' + field.heading + '</h2><p>' + field.text + '</p> </div></div></div>';
				carousel += '</li>';
				$(".carousel_ul").append(carousel);
			});
		}).done(function() {
			//console.log( "success" );
			no_sec_li = $('.carousel_ul li').length;
			sec_item_width = $('.carousel').width(); 
			$('.carousel_ul li').css({
				"width": sec_item_width
			});
			
			
			sec_ul_length = (no_sec_li * sec_item_width);
			sec_left_value = sec_item_width * (-1);         
			$('.carousel_ul li:first').before($('.carousel_ul li:last'));	
			
			$('.carousel_ul').css({
				"left" : sec_left_value,
				"width": sec_ul_length
			});
			
			/*------------------------- Carousel Move ----------------*/
		
			
		
			if(no_sec_li > 1){
				sec_run = setInterval('sec_rotate()', speed);
			}
			
			$('.carousel_controller li').click(function(){
				if($(this).hasClass('selected') == false)
				{
					secAnimationStop();
					$('.carousel_controller li.selected').removeClass('selected');
					$(this).addClass('selected');
					var current_li = $(this).attr('class');
					var cPos = current_li.replace('pos-', '');
					cPos = parseInt(cPos);
					
					cPos = (cPos==0) ? (no_sec_li-1) : cPos-1;
					
					str = '';
					for(i = cPos; i < no_sec_li; i++ ){
						var currHtml = $('.carousel_ul .pos-'+i).html();//alert(currHtml);
						str += '<li class="pos-'+i+'">'+currHtml+'</li>';
					}
					for(i = 0; i <cPos; i++ ){
						var currHtml = $('.carousel_ul .pos-'+i).html();
						str += '<li class="pos-'+i+'">'+currHtml+'</li>';
						
					}
					
					
					$(".carousel_wrap").fadeOut(500,function(){
						$(".carousel_ul").html(function(){
							return str;
						});
						$('.carousel_ul li').css({
							"width": sec_item_width
						});
						$(".carousel_wrap").show().css({opacity:0}).animate({opacity:1},1000,function(){
							
							secAnimationStop();
						});
					});
					
					
					
				}
			});
			
			$('.carousel_ul').hover(function(){		
				secAnimationStop();
			},function(){
				secAnimationStop();
			});
		});
		
		
		
		
		
	});
	
	
})(jQuery);

function sec_rotate() {
	var left_indent = parseInt($('.carousel_ul').css('left')) - sec_item_width;		
	$('.carousel_ul:not(:animated)').animate({'left' : left_indent}, 2000, function () {            
		$('.carousel_ul li:last').after($('.carousel_ul li:first'));                 				
		$('.carousel_ul').css({'left' : sec_left_value});	

		var ppos = $(".carousel_ul li:eq(1)").attr('class');
		$('.carousel_controller li.selected').removeClass('selected');
		$('.carousel_controller').find('li.'+ppos).addClass('selected');
	});
}
function secAnimationStop(){
		if(secFlag==0){
			clearInterval(sec_run);
			secFlag = 1;
		}
		else{
			sec_run = setInterval('sec_rotate()', speed);
			secFlag = 0;
		}

}