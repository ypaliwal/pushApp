(function(){
	angular
		.module('pushApp')
		.controller('ProdDetailCtrl', ProdDetailCtrl);

		function ProdDetailCtrl($state, $uibModalInstance, productSrv, product){

			var prodVm = this;
			console.log(product);
			prodVm.product = product;
			prodVm.addToCart = addToCart;
			
			function addToCart(id){
				productSrv.cartAdd(id);	
			}
			
			// prodVm.product = prodId;	
			// console.log(prodVm.product);
		}
})();