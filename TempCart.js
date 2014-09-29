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
				deleteObjectId(cartProduct.id,JsonCart);
				if(typeof options.removeProductCallBack == "function"){
					options.removeProductCallBack();
				}
			}
	};

	this.init = function(tempCartOptions){
		options = tempCartOptions;
		products = options.products;
		if(validateProductsJson(products)){
			renderTemplate(products,options.listingHtmlTemplate,options.appendListingTo,options.currency);
			if(checkLocalStorageCart()){
				getLocalStorageCart();
			}
			if(typeof options.renderProductsCallBack == "function"){
				options.renderProductsCallBack();
			}
		}
		else{
			consoleLog('error','Please revise the products JSON object');
		}
	}
	var renderTemplate = function(products,template,target,currency){
		if(template.length == 0 || target.length == 0){
			consoleLog('error','There is No Template/Listing');
			return;
		}
		Mustache.parse(template);   // optional, speeds up future uses
		target.innerHTML = Mustache.render(template, {products : products,currency:currency});
	}
	this.updateCart = function(id,type){
		var cartProduct = getObjectbyProperty(JsonCart,'id',id);
		if(cartProduct){
			cartActions[type](cartProduct);
		}else{
			product = getObjectbyProperty(options.products,'id',id);
			product.qty = 1;
			JsonCart.push(product);
			if(typeof options.addProductCallBack == "function"){
				options.addProductCallBack();
			}

		}
		JsonCart['total'] = getCartTotal(JsonCart);
		if(options.saveCart){
			pushLocalStorageCart(JsonCart);
		}
		renderTemplate(JsonCart,options.cartHtmlTemplate,options.cartHtmlObject,options.currency);
	}
	var getCartTotal = function(cart){
		var total = 0;
		for (var i = cart.length - 1; i >= 0; i--) {
			total += cart[i].price * cart[i].qty;
		};
		return total;
	}
	var validateProductsJson = function(products){
		var validateThese = ['name','id','price','image'];
		if(products.length ===  0){
			return false;
		}
		for (var i = products.length - 1; i >= 0; i--) {
			for (var m = 0; m < validateThese.length; m++) {
				if( products[i][validateThese[m]] == null || typeof products[i][validateThese[m]] == 'undefined'){
					consoleLog('warn',"product #"+ i +" doesn't have "+validateThese[m]);
					return false; 
				}
			};
		};
		return true;
	}
	var pushLocalStorageCart = function(cart){
		if(typeof(Storage) ==="undefined"){
			return;
		}
		var cartString = JSON.stringify(cart);
		localStorage.setItem("TempCart", cartString);
	}
	var getLocalStorageCart = function(){
		if(typeof(Storage) ==="undefined"){
			return;
		}	
		var cartString = localStorage.getItem('TempCart');
		JsonCart = JSON.parse(cartString);
		JsonCart['total'] = getCartTotal(JsonCart);
		renderTemplate(JsonCart,options.cartHtmlTemplate,options.cartHtmlObject,options.currency);

	}
	var checkLocalStorageCart = function(){
		return typeof(Storage) !=="undefined" && localStorage.getItem('TempCart') != null ;	
	}
	var consoleLog = function(type,message){
		if(consoleReady){
			console[type]('Temp Cart : ' + message);
		}
		else{
			alert(message);
		}
	}
	var getObjectbyProperty = function(obj,prop,value){//helper
		for (var i = obj.length - 1; i >= 0; i--) {
			if(obj[i][prop] == value){
				return obj[i];
			}
		}
	}
	var deleteObjectId = function(id,obj){
		for (var i = obj.length - 1; i >= 0; i--) {
			if(obj[i]['id'] == id){
				obj.splice(i,1);
			}
		}
	}
};