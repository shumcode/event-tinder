//The server.js file, in general, is what will load whenever we want to run our own, internal server (i.e. our personal computer).  The information contained below is setting up our server to be able to apply the various frameworks, methods and functionalities we will want to use//

var express = require("express");
var pg = require("pg");
var bodyParser = require("body-parser");
var routes = require("./routes.js");
var pool = require("./pg-connection-pool.js");
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json()); 
app.use("/", routes);

var port = process.env.port || 5000;
var server = app.listen(port, function(req, res) {
  console.log("Server running");
});
