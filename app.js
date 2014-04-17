var express = require('express'),
  http = require('http'),
  path = require('path'),
  mongoose = require('mongoose'),
  itemController = require('./controllers/item-controller.js'),
  orderController = require('./controllers/order-controller.js'),
  inventoryController = require('./controllers/inventory-controller.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  mongoose.connect('mongodb://localhost/candystore');

	app.get('/items/populate', itemController.populate);
}
else {
	throw new Error('TODO: add production Mongo database.')
}

// items
app.get('/', itemController.list);
app.get('/items', itemController.list);
app.get('/items/:id', itemController.detail);
app.post('/items/add/:productid', itemController.create);
app.put('/items/:id', itemController.update);
app.delete('/items/:id', itemController.remove);

// order
app.post('/order', orderController.create);

// inventory
app.put('/inventory/:id', inventoryController.update);

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
