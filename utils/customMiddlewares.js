var convertErrorInstanceToStringifiableObj = require('./utils').convertErrorInstanceToStringifiableObj;

exports.errorHandlingMiddleware = function(err, req, res, next){
	var statusCode = 500;
	
	if(err instanceof Error){
		var errObj = convertErrorInstanceToStringifiableObj(err);
		if(errObj.status || errObj.statusCode) {
			statusCode = errObj.status || errObj.statusCode;
			delete errObj.status;
			delete errObj.statusCode;
		}
		if(process.env.NODE_ENV !== 'development'){
			delete errObj.stack;
		}
		
		err = JSON.stringify(errObj);
	}
	
	!err && (err = "Something bad happened!");
	
	res.status(statusCode).send(err);
};