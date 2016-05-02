(function() {
	angular
		.module('pushApp')
		.controller('OrdersCtrl', OrdersCtrl);

	function OrdersCtrl(productSrv) {
		var OrdVm = this;

		OrdVm.orders = productSrv.orders;

		console.log(OrdVm.orders);

		// Public functions
		OrdVm.ordersTotal = ordersTotal;

		function ordersTotal() {
			console.log('test');
			console.log(OrdVm.orders.length);
			var total = 0;
			for(var i = 0; i < OrdVm.orders.length; i++) {
				total += parseInt(OrdVm.orders[0].orderTotal[0]);
			}

			return total;
		}

	}

})();