import request from "./bestbuy";
window.slider = $('#product').bxSlider();
export default class App{
	constructor(){
		this.initBBCall();
	}
	initBBCall (cat) {
		$('#product').empty();
		request({url: "https://api.bestbuy.com/v1/products" + cat,api : "8ccddf4rtjz5k5btqam84qak"})
		.then(data => {
			console.log(data);

			for (var i=0;i<6;i++){
				$("#product").append('<li><div class="item-whole"><a href="#"><h1 class="item-manu">' + data.products[i].manufacturer
				+ '</h1><p class="item-title">' + data.products[i].albumTitle
				+'</p><div class="item-bg" style="background-image:url(' + data.products[i].largeFrontImage
				+ ')"></div></a><h2 class="item-price">$'+ data.products[i].salePrice
				+ '</h2><button>ADD</button></div></li>');
			}
		    window.slider.reloadSlider({
					maxSlides:2,
					minSlides:2,
					slideWidth:800,
		    });

			console.log(data.currentPage);
			console.log(cat)
		})
		.catch(error => {
			console.log("warning Christopher Robins... Error");
			console.log(error);
		});
	}
}
let x = new App;
console.log("hello");
//smooth scrolling
 $('a[href^="#"]').on('click',function (e) {

	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 1500, 'swing', function () {
	        window.location.hash = target;
	    });
	});
//smooth end

$('li').on('click',function(e){

	e.preventDefault();
	x.initBBCall($(this).data('value'));
});

$('a').on('click',function(a){
	a.preventDefault();
});
//cart
$("a#cart").on("click",function(){
	console.log("pop-up cart");
	$("#pop-up").css({display:"block",cursor:"default"});
});
