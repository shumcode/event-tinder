//The routes.js page, in general, is used to create the actual pipelines that information will be sent to and from external databases/ servers.//

//express is a framework that we are capable of using in making/using connections to outside servers and databases, such as postgreSQL//
var express = require("express");


// "routes" is, as defined by the variable declaration above, an object which allows us to utilize the various methods used within the Express framework//
var routes = express.Router();


//pool = this is giving us the information that is contained within the pg-connection-pool.js file.  This is the file that we need in order to make connections to outside servers - i.e. Heroku, which is a server that contains the database we will be working with//
var pool = require("./pg-connection-pool.js");





//.get is a method that allows us set an endpoint to another server/database.  The first parameter (ex. "/stayIn2") is naming the endpoint that we will be referencing within our own internal server - i.e. within the date-service.js file.  The 2nd parameter (ex. function(req, res){...}) is the function we want to run whenever this endpoint is called within our internal documents (i.e. when a service.js calls)//
routes.get("/stayInIdeas/:id", function(req, res){
    var sql = "select * from stayIn where infoset = $1::int";
    var values = [req.params.id];
    pool.query(sql, values).then(function(result){
        console.log(result.rows);
        res.send(result.rows)    
    })
})

module.exports = routes;
