(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url + '?apiKey=' + obj.api + '&format=json');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = function () {
            return reject(xhr.statusText);
        };
        xhr.send(obj.body);
    });
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bestbuy = require('./bestbuy');

var _bestbuy2 = _interopRequireDefault(_bestbuy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.slider = $('#product').bxSlider();

var App = function () {
	function App() {
		_classCallCheck(this, App);

		this.initBBCall();
	}

	_createClass(App, [{
		key: 'initBBCall',
		value: function initBBCall(cat) {
			console.log(cat);
			$('#product').empty();
			(0, _bestbuy2.default)({ url: "https://api.bestbuy.com/v1/products" + cat, api: "8ccddf4rtjz5k5btqam84qak" }).then(function (data) {
				console.log(data);

				for (var i = 0; i < 6; i++) {
					//fill slider
					$("#product").append('<li><div class="item-whole"><a id="' + data.products[i].sku + '" href="#"><h1 class="item-manu">' + data.products[i].manufacturer + '</h1><p class="item-title">' + data.products[i].albumTitle + '</p><div class="item-bg" style="background-image:url(' + data.products[i].largeFrontImage + ')"></div></a><h2 class="item-price">$' + data.products[i].salePrice + '</h2><button id=' + data.products[i].sku + ' class="add-to-cart" data-sku="' + data.products[i].sku + '" data-price="' + data.products[i].salePrice + ' " >ADD</button></div></li>');
				}
				//add-to-cart button
				$("button.add-to-cart").on("click", function () {
					console.log("adding to cart");
					var sku = $(this).data("sku");
					var price = $(this).data("price");
					if (sessionStorage.getItem(sku) == null) {
						var quantity = 1;
						var item = { 'price': price, 'quantity': quantity };
						sessionStorage.setItem(sku, JSON.stringify(item));
					} else {
						var temp = JSON.parse(sessionStorage.getItem(sku));
						temp.quantity += 1;
						temp.price = price * temp.quantity;
						sessionStorage.setItem(sku, JSON.stringify(temp));
					}
				});
				$("#cart").on('click', function () {
					$("#sub-totals").empty();
					var cartTotal = 0;
					for (var i = 0; i < sessionStorage.length; i++) {
						console.log(sessionStorage.getItem(sessionStorage.key(i)));
						var obj = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
						var skuKey = JSON.parse(sessionStorage.key(i));
						var qty = obj.quantity;
						var price = parseFloat(obj.price);
						cartTotal += parseFloat(obj.price);
						$("#sub-totals").append('<li>SKU: ' + skuKey + '<span>QUANTITY:<input id="input" type="number" value="' + qty + '"></span><span> TOTAL:$' + price + '</span><button data-skukey=' + skuKey + ' id="update">update</button><button data-skukey=' + skuKey + ' id="remove">remove</button></li>');

						$("#total-item").empty();
						$("#total-item").append($("#sub-totals")["0"].children.length);
					}
					//remove from cart
					$("button#remove").on("click", function () {
						console.log("removing");
						console.log($('#remove').data("skukey"));
						sessionStorage.removeItem($(this).data("skukey"));
						$(this).parent().remove();
					});
					//update cart
					$("button#update").on("click", function () {
						console.log($(this).data("skukey"));
						console.log(sessionStorage.getItem(JSON.parse($(this).data("skukey"))));
					});
					//total
					$("#total-cart").empty();
					$("#total-cart").text('$' + cartTotal);
					parseInt($("#total-cart"));
					//	$("#total-cart").toFixed(2);
				});

				//slider reload
				window.slider.reloadSlider({
					maxSlides: 2,
					minSlides: 2,
					slideWidth: 800
				});
				//
			}).catch(function (error) {
				console.log("warning Christopher Robins... Error");
				console.log(error);
			});
		}
	}]);

	return App;
}();

exports.default = App;

var x = new App();
console.log("hello");
//smooth scrolling
$('a[href^="#"]').on('click', function (e) {

	e.preventDefault();

	var target = this.hash;
	var $target = $(target);

	$('html, body').stop().animate({
		'scrollTop': $target.offset().top
	}, 1500, 'swing', function () {
		window.location.hash = target;
	});
});
$('a').on('click', function (a) {
	a.preventDefault();
});

//category select
x.initBBCall("(categoryPath.id=abcat0502000)");

$('li').on('click', function (e) {
	e.preventDefault();
	x.initBBCall($(this).data('value'));
});

},{"./bestbuy":1}]},{},[2]);
