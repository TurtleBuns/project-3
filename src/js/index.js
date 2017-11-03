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
				//fill slider
				$("#product").append('<li><div class="item-whole"><a id="'+data.products[i].sku+'" href="#"><h1 class="item-manu">' + data.products[i].manufacturer
				+ '</h1><p class="item-title">' + data.products[i].albumTitle
				+'</p><div class="item-bg" style="background-image:url(' + data.products[i].largeFrontImage
				+ ')"></div></a><h2 class="item-price">$'+ data.products[i].salePrice
				+ '</h2><button id='+data.products[i].sku+' class="add-to-cart" data-sku="'+ data.products[i].sku+'" data-price="'+data.products[i].salePrice+' " >ADD</button></div></li>');
			}
			//add-to-cart button
			$("button.add-to-cart").on("click",function(){
				console.log("adding to cart");
				var sku = $(this).data("sku");
				var price= $(this).data("price");
				if(sessionStorage.getItem(sku)==null){
						var quantity = 1;
						var item = {'price':price,'quantity':quantity};
						sessionStorage.setItem(sku,JSON.stringify(item));
				}else{
					var temp = JSON.parse(sessionStorage.getItem(sku));
					temp.quantity+=1;
					temp.price = JSON.stringify(item).price*temp.quantity;
					sessionStorage.setItem(sku,JSON.stringify(temp));
				}
				/*$("#sub-totals").append('<li>SKU: '+ $(this).data("sku") + ' <span id="qauntity">QUANTITY<input type="number"></span> TOTAL:$'+$(this).data("price")+' <button>update | remove</button></li>');
				$("#total-item").empty();
				$("#total-item").append($("#sub-totals")["0"].children.length);
				console.log($("#sub-totals")) */

			});
			//local storage


			//slider reload
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

//category select
$('li').on('click',function(e){

	e.preventDefault();
	x.initBBCall($(this).data('value'));
});

$('a').on('click',function(a){
	a.preventDefault();
});
