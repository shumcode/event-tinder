var express = require("express");
var routes = express.Router();
var pool = require("./pg-connection-pool.js");


routes.get("/stayInIdeas/:id", function(req, res){
    var sql = "select * from stayIn where infoset = $1::int";
    var values = [req.params.id];
    pool.query(sql, values).then(function(result){
        console.log(result.rows);
        res.send(result.rows)    
    })
})

routes.get("/movieTV", function(req, res){
    pool.query("select * from stayIn").then(function(result){
        console.log(result.rows);
        res.send(result.rows)    
    })
})


module.exports = routes;
