(function(){
	angular
		.module('pushApp')
		.controller('ShopCtrl',ShopCtrl)

	function ShopCtrl($location,$scope,productSrv,products, $uibModal, $timeout){
		var shopVm = this;

		//TODO #3 Capture resolved products for view
		shopVm.products = products;
		shopVm.productSrv = productSrv;
		shopVm.searchFilter = searchFilter;
		shopVm.adminLogin = adminLogin;
		shopVm.openModal = openModal;
		shopVm.openDetailModal = openDetailModal; 
		shopVm.max = max;
	
		function adminLogin(){
			$location.path('/auth');
		}

		function searchFilter(){
			shopVm.filter = "";

			shopVm.customFilter = shopVm.search;
			//console.log(shopVm.search);
			
		}

		function openModal(){
			console.log(shopVm.products);
			$uibModal.open({
			templateUrl: 'site/partials/modal.html',
			controller: 'ModalCtrl',
			controllerAs: 'ctrl'
			})
		}

		function openDetailModal(id){
			shopVm.productId = id;
			$uibModal.open({
			templateUrl: 'site/partials/product-detail.html',
			controller: 'ProdDetailCtrl',
			controllerAs: 'ctrl',
			resolve: {
				product: function(){
					//console.log("this works" + id);
					return productSrv.getProduct(shopVm.productId).then(function(res) {
						return res.data.product;
					});
				}
			}
			})
		}

		function max(id){
				if (shopVm.productSrv.cart.length != undefined){
					for (var i = 0; i < shopVm.productSrv.cart.length; i++){
						if (shopVm.productSrv.cart[i].id == id){
							if (shopVm.productSrv.cart[i].count == shopVm.productSrv.cart[i].quantity){
								return true;
							}
						}
					}
				}
				for (var i = 0; i < shopVm.products.length; i++){
					if (shopVm.products[i].id == id){
						if (shopVm.products[i].quantity == 0){
							return true;
						}
					}
				}



		}

		// watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});

		// $scope.$watchCollection(function() {
		// 	return productSrv.products;
		// }, function(newValue) {
		// 	shopVm.products = newValue;
		// })
	}



})();


