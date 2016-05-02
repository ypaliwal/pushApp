(function(){
	'use strict';

	angular
		.module('pushApp')
		.controller('AdminCtrl',AdminCtrl);

	function AdminCtrl($scope,$state,productSrv, products){
		var adminVm = this;
		adminVm.productSrv = productSrv;

		//check if logged in
		if(localStorage.authToken == undefined || localStorage.authToken == null){
			$state.go('auth');
		}
					
		adminVm.products = products;
		if(productSrv.products.length > 0 ){
			adminVm.is_products = true;
		}

		//watch for updates to products object
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
			if(productSrv.products.length > 0){
			    adminVm.products = productSrv.products;
			    adminVm.is_products = true;
			}
		});

		//public functions
		adminVm.editProduct = editProduct;
		adminVm.logout = logout;
		adminVm.deleteAll = deleteAll;
		adminVm.goHome = goHome;

		function editProduct(product){
			$state.go('admin.edit_product',{productId:product.id});
		}

		function logout(){
			localStorage.removeItem('authToken');
			$state.go('auth');
		}

		function deleteAll() {
			
			for(var i = productSrv.products.length - 1; i >= 0; i--) {
				productSrv.deleteProduct(productSrv.products[i].id);
				
			}

		}

		function goHome() {
			$state.go('shop');
		}

	}
})();


