import request from "./bestbuy";
window.slider = $('#product').bxSlider();
export default class App{
	constructor(){
		this.initBBCall();
	}
	initBBCall (cat) {
		console.log(cat);
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
					temp.price = price*temp.quantity;
					sessionStorage.setItem(sku,JSON.stringify(temp));
				}
			});
			$("#cart").on('click',function(){
				$("#sub-totals").empty();
				var cartTotal = 0;
				for(var i=0; i<sessionStorage.length; i++){
					console.log(sessionStorage.getItem(sessionStorage.key(i)));
					var obj = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
					var skuKey = JSON.parse(sessionStorage.key(i));
					var qty = obj.quantity;
					var price = parseFloat(obj.price);
					cartTotal +=parseFloat(obj.price);
					$("#sub-totals").append('<li>SKU: '+ skuKey
					+ '<span>QUANTITY:<input id="input" type="number" value="'
					+qty
					+'"></span><span id="subtotal"> TOTAL:$'
					+price
					+'</span><button data-skukey='+skuKey+' id="update">update</button><button data-skukey='+skuKey+' id="remove">remove</button></li>');


					$("#total-item").empty();
					$("#total-item").append($("#sub-totals")["0"].children.length);
				}
				//remove from cart
				$("button#remove").on("click",function(){
					console.log("removing");
					console.log ($('#remove').data("skukey"));
					sessionStorage.removeItem($(this).data("skukey"));
					$(this).parent().remove();
				});
				//update cart
				$("button#update").on("click",function(){
					var skukey = $(this).data("skukey");
					console.log($(this).data("skukey"));
					console.log(JSON.parse(sessionStorage.getItem (skukey)).quantity);
					console.log($(this).parent().find("#input").val());
					var oldQ = JSON.parse(sessionStorage.getItem (skukey));
					var newQ = parseInt($(this).parent().find("#input").val());
					var subTotal = oldQ.price/oldQ.quantity*newQ;
					subTotal = subTotal.toFixed(2);
					$(this).parent().find("#subtotal").text(`TOTAL:$${subTotal}`)
					oldQ.quantity = newQ;
					oldQ.price = subTotal;
					sessionStorage.setItem(skukey,JSON.stringify(oldQ));

				//	sessionStorage.setItem(skukey,JSON.stringify(newP));

				})
				//total
				$("#total-cart").empty();
			  $("#total-cart").text('$'+cartTotal);
				parseInt($("#total-cart"));
			  //	$("#total-cart").toFixed(2);
			})




			//slider reload
		    window.slider.reloadSlider({
					maxSlides:2,
					minSlides:2,
					slideWidth:800,
		    });
			//
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
	$('a').on('click',function(a){
		a.preventDefault();
	});

//category select
x.initBBCall("(categoryPath.id=abcat0502000)");

$('li').on('click',function(e){
	e.preventDefault();
	x.initBBCall($(this).data('value'));
});
