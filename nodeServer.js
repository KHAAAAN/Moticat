"use strict";

var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var jsonParser = bodyParser.json();

//app.use(jsonParser);
app.use(express.static(__dirname));

app.get('/', function(req, res){
	console.log('acknowledged');
	console.log(req);
	//res.sendFile()
});

//Server
//var localPort = process.env.VCAP_APP_PORT || 3000;
var localPort = 3000;
http.listen(localPort, function () {
    console.log('Listening on *:' + localPort);
});

