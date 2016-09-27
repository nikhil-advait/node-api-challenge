# nodejs-apis-challenge
Challenge to create simple node server for CRUD like operations.
This repo has solution to a challenge. Below are details of challenge:

### Problem Statement:
 Design a RESTful API for an online store which can be used to manage different products.
Details: You need to send us a design document on how you would implement a RESTful API for an online store. It should support addition, deletion, editing and searching a product. You are free to assume everything else but make sure you document them. Make sure you have considered things like authentication (only authenticated users can add / view / edit / delete items). You are creating the API for a mobile developer who will use it to create a mobile app. It would be great if you can also include some example scenarios along with the expected request / response objects.

### Solution:
Instruction to setup:  
##### Requirements:  
1) Mongodb (3.0.0 or greater) installed and running on port 27017. Configuration can be changed in init.js file.
Current configuration are as below:   
var url = 'mongodb://localhost:27017/nikDb';
2) node.js 4.0.0 or above npm 2 (Should work with npm 3 but not tested)

##### Instructions:  
-Unzip attached directory and cd to it  
-run $npm install  
-fire command $node server.js to start the server on port 3000  
-Use any api test tool (such as advanced rest client/postman/curl) to test the application. Apis are documented in 

#####  Apis are as below:

baseUrl: localhost:3000

 **1) /login (i.e localhost:3000/login)**

request: POST  
json body:  
{
  "name": "user1",
  "password": "test123"
}

response:   
{
"msg": "User Authenticated!"
"authToken": "f1d1d9c77d33821f31d4591f55bb14d9177b4a22"
}

**Important: Send custom header x-auth-token as above authToken for all subsequent request**


**2)products (to create a new product)**

request: POST  
json body:  
{
  "name": "Nikon vx123",
  "type": "Camera",
  "prize": 10000,
  "info": "10x zoom, image stabilization, with manual focus"
  }

response:  
{
  “msg” : “Operation successful”
}

**3)/products/:id (to get one product)**
e.g
/products/5676b533aad6489a7dfbedad

request: GET  
response:  
{
  “_id”: “5676b533aad6489a7dfbedad”,
  "name": "Nikon vx123",
  "type": "Camera",
  "prize": 10000,
  "info": "10x zoom, image stabilization, with manual focus"
}

**4)products/:id (to modify product)**  
request: PUT  
json body:  
{
  "name": "Sone newModel",
  "type": "Camera",
  "prize": 20000,
  "info": "10x zoom, image stabilization, with manual focus"
}

response:
{
  “msg” : “Operation Successful”
}


**5)/products/:id (to delete product)**  
request: DELETE  
response:  
{
  “msg” : “Operation Successful”
}


**6)/products (to list all products)**  
Note: pagination is not implemented yet.  
request: GET  
response:   
[{
	"_id": "56758e884585c66e2cd18ad6",
	"name": "HP laptop123",
	"type": "Laptop",
	"prize": 50000,
	"info": "i5, 500GB, 8GB RAM"
}, {
	"_id": "56758ecf4585c66e2cd18ad7",
	"name": "Canon vx123",
	"type": "Camera",
	"prize": 10000,
	"info": "10x zoom, image stabilization, with manual focus"
}]

**7)/products/name=hp&name=canon&type=Laptop&type=Camera&prize=60000 (to list all products by search/filter criteria)**

Note: the query to mongodb will be generated accordingly. 
for example a complex query could be generated from complex url like below

db.products.find({  
    $and : [  { name: {$in: [new RegExp(hp, 'i'), new RegExp('canon', 'i')]} },
        { type : {$in: ['Laptop', 'Camera']} },
        { prize : {$lte: 6000} },
        { info: {$in: [new RegExp('i5', 'i'), new RegExp('focus', 'i')]} }  
    ]
}) 

request: GET  
response:  
[{
	"_id": "56758e884585c66e2cd18ad6",
	"name": "HP laptop123",
	"type": "Laptop",
	"prize": 50000,
	"info": "i5, 500GB, 8GB RAM"
}, {
	"_id": "56758ecf4585c66e2cd18ad7",
	"name": "Canon vx123",
	"type": "Camera",
	"prize": 10000,
	"info": "10x zoom, image stabilization, with manual focus"
}]
