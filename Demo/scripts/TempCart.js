TempCart = {
	init:function(tempCartOptions){
		var self = this;
		self.options = tempCartOptions;
		var options = self.options;
		var products = options.products;
		typeof console == "object" ? self.consoleReady = true : self.consoleReady == false;
			
		if(!self.validateProductsJson(products)){
			self.consoleLog('error','Please revise the products JSON object');
		}
		else{
			self.renderTemplate(products,options.listingHtmlTemplate,options.appendListingTo,options.currency);
			if(typeof options.renderProductsFallBack == "function"){
				options.renderProductsFallBack();
			}
		}

	},
	renderTemplate:function(products,template,target,currency){
		if(template.length == 0 && target.length == 0){
			self.consoleLog('error','There is No Template/Listing');
			return;
		}
		Mustache.parse(template);   // optional, speeds up future uses
		var rendered = Mustache.render(template, {products : products,currency:currency});
		target.innerHTML = rendered;
	},
	updateCart:function(id,type){
		var self = this;
		var options = self.options;
		if(typeof JsonCart == "undefined"){
			JsonCart = new Array;
		}
		if(self.getProductbyProperty(JsonCart,'id',id)){
			var cartProduct = self.getProductbyProperty(JsonCart,'id',id);
			if(type == "add"){
				cartProduct.qty++;
				options.addProductFallBack();
			}
			else{
				cartProduct.qty--;
				self.deleteObjectId(id,JsonCart);
				options.removeProductFallBack();
			}
		}else{
			product = self.getProductbyProperty(options.products,'id',id);
			product.qty = 1;
			JsonCart.push(product);
			options.addProductFallBack();
		}
		var cartTemplate = options.cartHtmlTemplate;
		var cartHtmlTarget = options.cartHtmlObject;
		var currency = options.currency;
		self.renderTemplate(JsonCart,cartTemplate,cartHtmlTarget,currency);
	},
	validateProductsJson:function(products){
		var self = this;
		var validateThese = ['name','id','price','image'];
		if(products.length > 0){
			for(i in products){
				for (var x = 0; x < validateThese.length; x++) {
					if(!products[i].hasOwnProperty(validateThese[x])){
						self.consoleLog('warn',"product #"+ i +" doesn't have "+validateThese[x]);
						return false;
					}
				}
				i++;
			}
			return true;
		}else{
			return false;
		}
	},
	consoleLog:function(type,message){
		if(self.consoleReady == true){
			console[type]('Temp Cart : ' + message);
		}
		else{
			alert(message);
		}
	},
	getProductbyProperty:function(obj,prop,value){//helper
		for (var i = obj.length - 1; i >= 0; i--) {
			if(obj[i][prop] == value){
				return obj[i];
			}
		}
	},
	deleteObjectId:function(id,obj){
		for (var i = obj.length - 1; i >= 0; i--) {
			if(obj[i]['id'] == id){
				obj.splice(i,1);
			}
		}
	}
}