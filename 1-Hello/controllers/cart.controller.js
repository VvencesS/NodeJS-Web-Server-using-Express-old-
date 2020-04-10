var db = require('../db');

module.exports.addToCart = function(req, res, next){
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/products');
		return;
	}

	var count = db
	.get('sessions')
	.find({id: sessionId})
	.get('cart.' + productId, 0)
	.value();

	db.get('sessions')
	.find({id: sessionId})
	.set('cart.' + productId, count + 1)
	.write();

	res.redirect('/products');
};

module.exports.index = function(req, res, next){
	var sessions = db.get('sessions').value();
	var sessionId = req.signedCookies.sessionId;

	if(sessions.id !== sessionId){
		res.redirect('products');
		return;
	}

	var productIdsInCart = Object.keys(sessions.cart);
	var products = db.get('products').value();
	var productsAddToCart = [];

	for(var productId in productIdsInCart){
		var temp = products.filter(function(product) {
			return product.id === productId;
		});
		productsAddToCart.push(temp[0]);
	}

	res.render('cart/index', {

		productsAddToCart: productsAddToCart
	});
}