var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/nikDb';
var dbCollections = {}; 

var initPromise = MongoClient.connect(url).then(function(db){
	dbCollections.productsCol = db.collection('products');
	dbCollections.usersCol = db.collection('users');
	return dbCollections.usersCol.update({name: 'testUser'}, {name: 'user1', password: 'test123'}, {upsert: true});
},function(error){
	console.log('Error while connecting to database: ', error);
});


//do all the initialization before bootstraping the app and then return final promise.

exports.initPromise = initPromise;

exports.dbCollections = dbCollections;