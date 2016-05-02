(function(){
	angular
		.module('pushApp')
		.controller('CheckoutCtrl', CheckoutCtrl);

	function CheckoutCtrl($location, $state, productSrv){
		var chkVm = this;
		chkVm.cart = productSrv.getCart();

		// Public functions
		chkVm.theTotal = theTotal;
		chkVm.checkout = checkout;
		chkVm.productSrv = productSrv;
		chkVm.serialNumAssign = serialNumAssign;

		function theTotal() {
			chkVm.total = [0, 0];
			for(var i = 0; i < chkVm.cart.length; i++) {
				chkVm.total[0] += chkVm.cart[i].price * chkVm.cart[i].count;
				chkVm.total[1] += chkVm.cart[i].count;
			}
			return chkVm.total;
		}

		function checkout(cart) {
			var tempOrders = {
				order: cart,
				fname: chkVm.fname,
				lname: chkVm.lname,
				add1: chkVm.add1,
				add2: chkVm.add2,
				city: chkVm.city,
				postalcode: chkVm.postalcode,
				email: chkVm.email,
				ccnumber: chkVm.ccnumber,
				cvc: chkVm.cvc,
				ccexpiry: chkVm.ccexpiry,
				orderNum: chkVm.serialNumAssign(),
				orderTotal: chkVm.theTotal()
			}

			console.log('Products Arr before:');
			console.log(productSrv.products);
			// Update products list (in productSrv)
			for(var i = 0; i < cart.length; i++) {
				var cartId = cart[i].id;
				for(var q = 0; q < chkVm.productSrv.products.length; q++) {
					if (chkVm.productSrv.products[q].id == cartId) {
						chkVm.productSrv.products[q].quantity -= cart[i].count;
					}
				}
				for(var q = 0; q < chkVm.productSrv.products.length; q++) {
					if (chkVm.productSrv.products[q].id == cartId) {
						productSrv.updateProduct(productSrv.products[q], cartId);
					}
				}
			}
			console.log('Products Arr after:');
			console.log(productSrv.products);


			chkVm.productSrv.orders.push(tempOrders);
			console.log(chkVm.productSrv.orders);

			localStorage.setItem("cart", "[]");
			chkVm.productSrv.cartRefresh();
			
			var ordersToJSON = angular.toJson(chkVm.productSrv.orders);
			localStorage.setItem("orders", ordersToJSON);

			$state.go('shop');

		}

		function serialNumAssign() {
			var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		    for( var i=0; i < 5; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));

		    return text;
		}
	}
})();