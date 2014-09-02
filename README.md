TempCartJs
==========
A simple Strait forward Javascript Cart System with HTML5 storage (if Available) and Mustache Template Engine:

This plugin is still in inital stages

How to Use :

1.Set the Options 
  cartOptions = {
  	listingHtmlTemplate: document.getElementById('listingTemp').innerHTML, // Mustache script template , You can use jQuery also
  	appendListingTo: document.getElementsByClassName('proListing')[0], //target html object for the product listing , You can use jQuery also
  	cartHtmlTemplate: document.getElementById('cartTemp').innerHTML, // Mustache script template, You can use jQuery also
  	cartHtmlObject:document.getElementsByClassName('cart')[0], //target html object for the Cart , You can use jQuery also
  	currency:'$',
  	products: [ // Array of Json objects of the products 
  	{
  	"name":"Product 1", String
  	"id":12, Numeric Value
  	"price":12, Numeric Value
  	"image":"http://placehold.it/350x150"}
  	] 
  }

_____________________________________________________________________________

2. Init it :

(function(){
 cartJS.init(cartOptions);
})();



