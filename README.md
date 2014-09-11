TempCartJs
==========
A simple Strait forward Javascript Cart System with HTML5 storage (if Available) and Mustache Template Engine:

========================================
***
  Demo : http://tareqhassan.me/TempCartJs/TempCart.html
***
========================================
How to Use :

1.Set the Options 
```javascript
var tempCartOptions = {
	listingHtmlTemplate: document.getElementById('listingTemp').innerHTML, // Mustache script template , You can use jQuery also
	appendListingTo: document.getElementsByClassName('proListing')[0], //target html object , You can use jQuery also 
	cartHtmlTemplate: document.getElementById('cartTemp').innerHTML, // Mustache script template, You can use jQuery also
	cartHtmlObject: document.getElementsByClassName('cart')[0], // Mustache script template, You can use jQuery also
	currency:'$', // Display Currency
	saveCart:true, // To use Html5 Local Storage to save the cart at the client side 
	products: [
		{"name":"White T-shirt","id":1,"price":10,"image":"style/1.png","description":"Plain White T-Shirt comes with four colors"},
		{"name":"Blue T-shirt","id":2,"price":20,"image":"style/2.png","description":"Plain Blue T-Shirt comes with four colors "},
		{"name":"Green T-shirt","id":3,"price":36,"image":"style/3.png","description":"Plain Green T-Shirt comes with four colors "},
		{"name":"Purple T-shirt","id":4,"price":19,"image":"style/4.png","description":"Plain Purple T-Shirt comes with four colors "},
		{"name":"Pinkish Red T-shirt","id":5,"price":40,"image":"style/5.png","description":"Plain Red T-Shirt comes with four colors "}
	],
	//Fall Backs
	renderProductsCallBack:function() {// Optional
		console.log('Products has been renderd');
	},
	addProductCallBack:function(){ // Optional
	  console.log('Products has been added');
	},
	removeProductCallBack:function(){// Optional
	  console.log('Products has been removed');
	}
}

```
_______________________________________________________________________

2. Init it :
```javascript
(function(){
 cartJS.init(tempCartOptions);
})();
```


