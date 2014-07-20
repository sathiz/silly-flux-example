"use strict";
var http = require('http');
var filed = require('filed');
var path = require('path');
var mysql = require('mysql');

var config = {
	port: 8080
};

var port = process.env.PORT || config.port;
var staticDir = __dirname + '/../client';

var server = http.createServer(function (req, res) {

	filed(staticDir + req.url)
		.pipe(res);
}).listen(port, console.log.bind(console, 'listening on port: %d', port));
