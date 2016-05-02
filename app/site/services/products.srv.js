(function(){

	angular
		.module('pushApp')
		.service('productSrv',ProductService);

	function ProductService($state,api){
		var self = this;
		//public variables
		self.products = [];
		self.categories = [];
		
		if(localStorage.getItem("cart") == undefined){
			//console.log("undefined cart");
			self.cart = [];
		} else {
			//console.log(localStorage.getItem("cart"));
			cartRefresh();
			//console.log("defined cart");
		}

		if(localStorage.getItem("orders") == undefined){
			self.orders = [];
		} else {
			self.orders = JSON.parse(localStorage.getItem("orders"));
		}

		//public functions
		self.getProduct = getProduct;
		self.getProducts = getProducts;
		self.addProduct = addProduct;
		self.updateProduct = updateProduct;
		self.updateProductList = updateProductList;
		self.removeProduct = removeProduct;
		self.deleteProduct = deleteProduct;
		self.cartAdd = cartAdd;
		self.getCart = getCart;
		self.cartRemove = cartRemove;
		self.cartRefresh = cartRefresh;
		self.storageUpdate = storageUpdate;
		self.setCategories = setCategories;
		self.updateCategories = updateCategories;
		self.deleteCategory = deleteCategory;
		// self.productRefresh = productRefresh;



		self.getProducts()
			.then(function(){

				if (self.products.length === 0){
					addProduct({
						name: "Floral Blue Pants",
						image: "assets/img/updated_imgs/pants_1.jpeg",
						description: "Floral blue, slim fit.",
						category: "Pants",
						price: 79.99,
						quantity: 12});

					addProduct({
						name: "Sky Blue Pants",
						image: "assets/img/updated_imgs/pants_2.jpeg",
						description: "Light Blue, formal pants.",
						category: "Pants",
						price: 119.99,
						quantity: 19});

					addProduct({
						name: "Drawstring Pants",
						image: "assets/img/updated_imgs/pants_3.jpeg",
						description: "For shop-liffting.",
						category: "Pants",
						price: 69.99,
						quantity: 21});
						
					addProduct({
						name: "Trippy Pattern Shirt",
						image: "assets/img/updated_imgs/shirt_1.jpeg",
						description: "LSD. Nuff' said.",
						category: "Shirts",
						price: 49.99,
						quantity: 17});

					addProduct({
						name: "Roots - Beaver Shirt",
						image: "assets/img/updated_imgs/shirt_2.jpeg",
						description: "Canada Spirit! Yay!",
						category: "Shirts",
						price: 39.99,
						quantity: 8});

					addProduct({
						name: "Preppy Stripped Shirt",
						image: "assets/img/updated_imgs/shirt_3.jpeg",
						description: "Hi, I'm white.",
						category: "Shirts",
						price: 39.99,
						quantity: 7});

					addProduct({
						name: "Sunset Ombre",
						image: "assets/img/updated_imgs/sweater_1.jpeg",
						description: "Popsicle colors.",
						category: "Outerwear",
						price: 59.99,
						quantity: 6});

					addProduct({
						name: "Grey Cardi",
						image: "assets/img/updated_imgs/sweater_2.jpeg",
						description: "Life in Grey.",
						category: "Outerwear",
						price: 49.99,
						quantity: 7});

					addProduct({
						name: "Zebra Crossing",
						image: "assets/img/updated_imgs/sweater_3.jpeg",
						description: "Cool sweater, bro.",
						category: "Outerwear",
						price: 39.99,
						quantity: 6});

					addProduct({
						name: "White Ultra Boosts",
						image: "http://cdn.sneakernews.com/wp-content/uploads/2015/05/adidas-ultra-boost-white-1.jpg",
						description: "Pumped Up Kicks!",
						category: "Shoes",
						price: 9000.01,
						quantity: 2});

					addProduct({
						name: "Gold Plated Louboutins",
						image: "https://s-media-cache-ak0.pinimg.com/736x/61/45/9e/61459e352c9e86b55b8f741bd128d847.jpg",
						description: "Oh you fancy, huh?",
						category: "Shoes",
						price: 799.99,
						quantity: 3});

					addProduct({
						name: "Fit Bit I",
						image: "https://www.tsg.com.sg/online/images/charge%20hr.png",
						description: "Black strap for 80 bucks.",
						category: "Accessories",
						price: 79.99,
						quantity: 15});
				}
			});

		function getProducts(){
			return api.request('/products',{},'GET')
			.then(function(res){
				//success callback
				//console.log(res);
				self.products = res.data.products;
				return res.data.products;
			},function(res){
				//error callback
				//console.log(res);
				return;
			})
		}

		function addProduct(product){
			api.request('/products',product,'POST')
			.then(function(res){
				//console.log(res);
				if(res.status === 200){
					//product was added successfully
					self.products.push(res.data.product);
					$state.go('admin.dash');
				}
			})
		}

		function updateProduct(product,productId){
			return api.request('/products/'+productId,product,'PUT')
			.then(function(res){
				//console.log(res);
				if(res.status === 200){
					//product was updated successfully
					self.updateProductList(product,productId);
				}
			})
		}

		function deleteProduct(productId){
			api.request('/products/'+productId,{},'DEL')
			.then(function(res){
				//console.log(res);
				if(res.status === 200){
					//product was deleted successfully
					self.removeProduct(productId);

					self.getProducts();
					$state.go('admin.dash');
				}
			})
		}

		function getProduct(productId){
			return api.request('/products/'+productId,{},'GET');
		}

		function updateProductList(product,productId){
			for(var i=0;i < self.products.length;i++){
				if(self.products[i].id == productId){
					self.products[i].name = product.name;
					self.products[i].image = product.image;
					self.products[i].description = product.description;
					self.products[i].category = product.category;
					self.products[i].price = product.price;
					self.products[i].quantity = product.quantity;
				}
			}
			// $state.go('admin.dash');
		}



		function removeProduct(productId){
			for(var i=0;i < self.products.length;i++){
				if(self.products[i].id == productId){
					delete self.products[i];
					$state.go('admin.dash');
				}
			}
		}

		// CART FUNCTIONS
		function cartAdd(id) {
			console.log("adding");
			var duplicate = false;
			// Check if item's already in cart, add quanitity if so
			for(var i = 0; i < self.cart.length; i++) {
				if(self.cart[i].id == id) {
					if (self.cart[i].count >= self.cart[i].quantity){
						self.cart[i].count = self.cart[i].quantity;
					} else {
						self.cart[i].count += 1;	
					}
					duplicate = true;
				}
			}

			if (!duplicate) {
				for(var i = 0; i < self.products.length; i++) {
					if(self.products[i].id == id) {
						if (self.products[i].quantity != 0){
							self.cart.push(self.products[i]);
							self.cart[self.cart.length - 1].count = 1;
						}
					}
				}
			}
			self.storageUpdate();
		}

		function storageUpdate(){
			for (var i = 0; i < self.cart.length;i++){
				if (self.cart[i].count == 0){
					self.cart.splice(i,1);
					i--;
				}
			}
			var cart = angular.toJson(self.cart);
			localStorage.setItem("cart", cart);	
		}

		function cartRemove(id) {
			//console.log("remove");
			for (var i = 0; i < self.cart.length; i++){
				if (self.cart[i].id === id){
					//console.log("cart before: "+self.cart);
					self.cart.splice(i,1);
					//console.log("cart after: "+self.cart);
				}
			}
			self.storageUpdate();
		}

		var defaultCategories = [
			{label:'Shirts',value:'shirts', id:'1'},
			{label:'Pants',value:'pants', id:'2'},
			{label:'Shoes',value:'shoes', id:'3'},
			{label:'Outerwear',value:'outerwear', id:'4'},
			{label:'Accessories',value:'accessories', id:'5'}
		];

		// Call function at the start to set categories in variable self.categories
		// so that can be called using productSrv
		
		setCategories();

		function setCategories() {
			var categories = JSON.parse(localStorage.getItem("categories"));
			// console.log(categories);
			if (categories != null) {

				//get categories from localStorage if they exist


				self.categories = categories;
			}
			else {
				//set default categories if no category exists
				var categoriesToJSON = angular.toJson(defaultCategories);
				localStorage.setItem("categories", categoriesToJSON);

			}		
		}

		function updateCategories() {
			var categoriesToJSON = angular.toJson(self.categories);
				localStorage.setItem("categories", categoriesToJSON);
		}

		function deleteCategory(id){
			for (var i = 0; i < self.categories.length;i++){
				if (self.categories[i].id == id){
					self.categories.splice(i,1);
					i--;
				}
			}
			var categories = angular.toJson(self.categories);
			localStorage.setItem("categories", categories);	
		}

		function cartRefresh(){
			//console.log('refreshing cart...');
			if (localStorage.cart){
				self.cart = JSON.parse(localStorage.getItem("cart"));
				return self.cart;

			}
			return [];
		}

		// function productRefresh(){
		// 	console("products REFRESH");
		// 	self.products = self.getProducts();
		// }

		function getCart() {
			console.log(localStorage.cart);
			
			if (localStorage.cart){
				self.cart = JSON.parse(localStorage.getItem("cart"));
				return self.cart;

			}
			return [];
		}

	}
})();