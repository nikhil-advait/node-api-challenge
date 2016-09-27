var dbCols = require('./init').dbCollections;
var ObjectId = require('mongodb').ObjectId;
var crypto = require('crypto');

exports.login = function(req, res){
	dbCols.usersCol.findOne({name: req.body.name, password: req.body.password}).then(function(user){
		if(user){
			var salt = 'my valuable secret!';
			var dateString = new Date().valueOf().toString();
			var randomNumStr = Math.random().toString();
			var hash = crypto.createHash('sha1').update(salt + dateString + randomNumStr).digest('hex');
			
			dbCols.usersCol.update({_id: ObjectId(user._id)}, {$set: {authToken: hash}}).then(function(){
				res.json({msg: 'User Authenticated!', authToken: hash});
			}, function(){
				res.status(500).send('Problem creating authToken for user');
			});
						
		} else{
			res.status(401).send('username/password does not match');	
		}		
	}).catch(function(){
		res.status(401).send('Problem while authenticating user!');
	});
};