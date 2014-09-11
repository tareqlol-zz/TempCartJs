TempCart =  new function(){

	var options,
		products,
		self = this,
		consoleReady = typeof console == "object",
		JsonCart = [];

	var cartActions = {
			add:function(cartProduct){
				cartProduct.qty++;
				if(typeof options.addProductCallBack == "function"){
					options.addProductCallBack();
				}
			},
			remove:function(cartProduct){
				cartProduct.qty--;
				self.deleteObjectId(cartProduct.id,JsonCart);
				if(typeof options.removeProductCallBack == "function"){
					options.removeProductCallBack();
				}
			}
	};

	this.init = function(tempCartOptions){
		options = tempCartOptions;
		products = options.products;
		if(self.validateProductsJson(products)){
			self.renderTemplate(products,options.listingHtmlTemplate,options.appendListingTo,options.currency);
			if(self.checkLocalStorageCart()){
				self.getLocalStorageCart();
			}
			if(typeof options.renderProductsCallBack == "function"){
				options.renderProductsCallBack();
			}
		}
		else{
			self.consoleLog('error','Please revise the products JSON object');
		}
	}
	this.renderTemplate = function(products,template,target,currency){
		if(template.length == 0 || target.length == 0){
			self.consoleLog('error','There is No Template/Listing');
			return;
		}
		Mustache.parse(template);   // optional, speeds up future uses
		target.innerHTML = Mustache.render(template, {products : products,currency:currency});
	}
	this.updateCart = function(id,type){
		var cartProduct = self.getObjectbyProperty(JsonCart,'id',id);
		if(cartProduct){
			cartActions[type](cartProduct);
		}else{
			product = self.getObjectbyProperty(options.products,'id',id);
			product.qty = 1;
			JsonCart.push(product);
			if(typeof options.addProductCallBack == "function"){
				options.addProductCallBack();
			}

		}
		JsonCart['total'] = self.getCartTotal(JsonCart);
		if(options.saveCart){
			self.pushLocalStorageCart(JsonCart);
		}
		self.renderTemplate(JsonCart,options.cartHtmlTemplate,options.cartHtmlObject,options.currency);
	}
	this.getCartTotal = function(cart){
		var total = 0;
		for (var i = cart.length - 1; i >= 0; i--) {
			total += cart[i].price * cart[i].qty;
		};
		return total;
	}
	this.validateProductsJson = function(products){
		var validateThese = ['name','id','price','image'];
		if(products.length ===  0){
			return false;
		}
		for (var i = products.length - 1; i >= 0; i--) {
			for (var m = 0; m < validateThese.length; m++) {
				if( products[i][validateThese[m]] == null || typeof products[i][validateThese[m]] == 'undefined'){
					self.consoleLog('warn',"product #"+ i +" doesn't have "+validateThese[m]);
					return false; 
				}
			};
		};
		return true;
	}
	this.pushLocalStorageCart = function(cart){
		if(typeof(Storage) ==="undefined"){
			return;
		}
		var cartString = JSON.stringify(cart);
		localStorage.setItem("TempCart", cartString);
	}
	this.getLocalStorageCart = function(){
		if(typeof(Storage) ==="undefined"){
			return;
		}	
		var cartString = localStorage.getItem('TempCart');
		JsonCart = JSON.parse(cartString);
		JsonCart['total'] = self.getCartTotal(JsonCart);
		self.renderTemplate(JsonCart,options.cartHtmlTemplate,options.cartHtmlObject,options.currency);

	}
	this.checkLocalStorageCart = function(){
		return typeof(Storage) !=="undefined" && localStorage.getItem('TempCart') != null ;	
	}
	this.consoleLog = function(type,message){
		if(consoleReady){
			console[type]('Temp Cart : ' + message);
		}
		else{
			alert(message);
		}
	}
	this.getObjectbyProperty = function(obj,prop,value){//helper
		for (var i = obj.length - 1; i >= 0; i--) {
			if(obj[i][prop] == value){
				return obj[i];
			}
		}
	}
	this.deleteObjectId = function(id,obj){
		for (var i = obj.length - 1; i >= 0; i--) {
			if(obj[i]['id'] == id){
				obj.splice(i,1);
			}
		}
	}
};