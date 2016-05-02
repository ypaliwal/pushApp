angular
	.module('pushApp')
	.controller('CategoryCtrl',CategoryCtrl);

	function CategoryCtrl(productSrv) {
		var categoryVm = this;
		categoryVm.categories = productSrv.categories;

		//Public Functions
		categoryVm.editCategory = editCategory;
		categoryVm.updateCategory = updateCategory;
		categoryVm.categoryRemove = categoryRemove;
		categoryVm.logThis = logThis;
		categoryVm.bulkUpdate = bulkUpdate;

		function editCategory() {

		}

		function logThis(value){
			categoryVm.valB4edit = value;
			console.log("value when edit is clicked >> " + categoryVm.valB4edit);
		}

		function updateCategory(data, catId) {
			console.log(data, catId);
			// console.log(productSrv.categories);
			// console.log(productSrv.categories.length);
			console.log(productSrv.categories[0]);
			// console.log(productSrv.categories[0].id);
			for (i=0; i < productSrv.categories.length; i++){
				if (productSrv.categories[i].id == catId){
					productSrv.categories[i].label = data;
					//call update function here to make sure localStorage is updated as well
					// console.log("new value >> " + productSrv.categories[i].value);
					productSrv.updateCategories(); 
					categoryVm.bulkUpdate(data);
				}
				// console.log(data, catId);
			}
		}

		//call this when save is clicked
		function bulkUpdate(val) {
			console.log("inside bulkUpdate function");
			console.log(productSrv.products.length);

			for (i=0; i<productSrv.products.length; i++) {
				var product = productSrv.products[i];
				console.log("product to be updated >> " + product);
				console.log("value of product to be updated >> " + product.category);
				console.log("value before edit >> " + categoryVm.valB4edit);
				if (product.category == categoryVm.valB4edit){
					// update the whole product
					console.log("+++++++++++++++++++++++++++++++++++++");
					product.category = val;

					//pass the product back to update function with ID
					productSrv.updateProduct(product,product.id);
				}
			}
		}

		function categoryRemove(id) {
			productSrv.deleteCategory(id);
		}

	}