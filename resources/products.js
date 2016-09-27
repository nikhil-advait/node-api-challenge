var productsApp = require('express')();
var handleErrorAndSendResponse = require('../utils/utils').handleErrorAndSendResponse;
var dbCols = require('../init').dbCollections;
var ObjectID = require('mongodb').ObjectID;
var giveFindConf = require('../utils/searchApiHelpers').giveFindConf;

//all the data from client should be validated/sanitized first. Middleware is good place to do that.
//Not doing since this is demo app.

//middleware to handle authentication.

productsApp.use(function (req, res, next) {
	var authToken = req.get('x-auth-token');
	if (authToken) {
		dbCols.usersCol.findOne({ authToken: authToken }).then(function (user) {
			if (user) return next();
			res.status(401).send('No user for sent token!');
		}).catch(function () {
			res.status(401).send('Could not authenticate user!');
		});
	} else {
		res.status(401).send('No auth token for request found!');
	}

});


productsApp.get('/', function (req, res) {
	handleErrorAndSendResponse(dbCols.productsCol.find(giveFindConf(req)).toArray(), res, function (data) {
		return data;
	});
});


productsApp.post('/', function (req, res) {
	var product = req.body;
	handleErrorAndSendResponse(dbCols.productsCol.insertOne(product), res);
});

productsApp.get('/:id', function (req, res) {
	handleErrorAndSendResponse(dbCols.productsCol.findOne({ _id: ObjectID(req.params.id) }), res, function (data) {
		return data;
	});
});

productsApp.put('/:id', function (req, res) {
	handleErrorAndSendResponse(dbCols.productsCol.update({ _id: ObjectID(req.params.id) }, req.body), res);
});

productsApp.delete('/:id', function (req, res) {
	handleErrorAndSendResponse(dbCols.productsCol.remove({ _id: ObjectID(req.params.id) }), res);
});

module.exports = productsApp;