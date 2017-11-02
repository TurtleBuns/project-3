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
			$('#product').empty();
			(0, _bestbuy2.default)({ url: "https://api.bestbuy.com/v1/products" + cat, api: "8ccddf4rtjz5k5btqam84qak" }).then(function (data) {
				console.log(data);

				for (var i = 0; i < 6; i++) {
					$("#product").append('<li><div class="item-whole"><a href="#"><h1 class="item-manu">' + data.products[i].manufacturer + '</h1><p class="item-title">' + data.products[i].albumTitle + '</p><div class="item-bg" style="background-image:url(' + data.products[i].largeFrontImage + ')"></div></a><h2 class="item-price">$' + data.products[i].salePrice + '</h2><button>ADD</button></div></li>');
				}
				window.slider.reloadSlider({
					maxSlides: 2,
					minSlides: 2,
					slideWidth: 800
				});

				console.log(data.currentPage);
				console.log(cat);
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
//smooth end

$('li').on('click', function (e) {

	e.preventDefault();
	x.initBBCall($(this).data('value'));
});

$('a').on('click', function (a) {
	a.preventDefault();
});
//cart
$("a#cart").on("click", function () {
	console.log("pop-up cart");
	$("#pop-up").css({ display: "block", cursor: "default" });
});

},{"./bestbuy":1}]},{},[2]);
