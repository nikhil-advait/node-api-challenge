exports.handleErrorAndSendResponse = function(promise, res, transformFunction){
	promise.then(function(data){
		
		if(!data) return res.send('No record/records in database!');
		
		if(transformFunction){
			res.json(transformFunction(data))
		}else{
			res.json({msg: 'Operation successful!'});
		}
	}).catch(function(error){
		//res.req.next({type: 'error', msg: 'Some error occured'})
		res.req.next(error);
	});
};

exports.convertErrorInstanceToStringifiableObj = function(err) {
  var plainObject = {};
  Object.getOwnPropertyNames(err).forEach(function(key) {
    plainObject[key] = err[key];
  });
  return plainObject;
};