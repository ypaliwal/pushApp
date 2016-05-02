(function(){

	angular
		.module('pushApp')
		.controller('ModalCtrl', ModalCtrl);

	function ModalCtrl($location, $state, $uibModalInstance, productSrv, api){	
		
		var modalVm	= this;
		modalVm.cart = productSrv.getCart();

		//Public function
		modalVm.cartRemove = cartRemove;
		modalVm.removeSelected = removeSelected;
		modalVm.closeModal = closeModal;
		modalVm.updateCart = updateCart;
		modalVm.checkout = checkout;
		modalVm.max = max;

		function removeSelected(id){
			for (var i = 0; i < modalVm.cart.length; i++){
				if (modalVm.cart[i].id === id){
					console.log("cart before: " + modalVm.cart);
					modalVm.cart.splice(i,1);
					console.log("selection removed");
				}
			}
			var cart = angular.toJson(modalVm.cart);
			localStorage.setItem("cart", cart);
		};

		function cartRemove(id) {
			removeSelected(id);
			// productSrv.storageUpdate();
		};

		function updateCart(){
			productSrv.storageUpdate();				
		}

		function closeModal(){
			productSrv.cartRefresh();
			$uibModalInstance.dismiss('cancel');
		}

		function checkout() {
			modalVm.closeModal();
			$location.path('/checkout');
		}

		function max(){
			for (var i = 0; i < modalVm.cart.length; i++){
				if (modalVm.cart[i].count == undefined){
					modalVm.cart[i].count = modalVm.cart[i].quantity;
				}
			}
		}
		
	}

})();