var app = require('express')();
var initApp = require('./init');
var bodyParser = require('body-parser');
var productsApp = require('./resources/products');
var errorHandlingMiddleware = require('./utils/customMiddlewares').errorHandlingMiddleware;
var jsonEncodedMiddleware = bodyParser.json();
var loginHandler = require('./auth').login;

app.use(jsonEncodedMiddleware);


app.post('/login', loginHandler);

app.use('/products', productsApp);

//error handling middleware 
app.use(errorHandlingMiddleware);

//start listening to requests once whole application is initialized

initApp.initPromise.then(function(){
	
	var server = app.listen(3000, function(){
		var port = server.address().port;
		
		console.log('Server is listening at http://localhost:$s', port);
	});
});	