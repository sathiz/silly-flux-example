var path = require('path');
var Hapi = require('hapi');
var Good = require('good');
var Joi = require('joi');

var server = new Hapi.Server('localhost', 8080);

server.route({
	method: 'GET',
	path: '/{path*}',
	handler: {
		directory: { path: path.join(__dirname, '/../client'), listing: false, index: true }
	}
});

server.route({
	method: 'GET',
	path: '/api/account',
	handler: require('./handlers/getAccounts'),
	config: {
		validate: {
			query: {
				search: Joi.string().optional()
			}
		}
	}
});

server.route({
	method: 'GET',
	path: '/api/account/{accountId}',
	handler: require('./handlers/getAccountDetails')
});

server.pack.register(Good, function (err) {
	if (err) throw err; // something bad happened loading the plugin
	server.start(function () {
		server.log('info', 'Server running at: ' + server.info.uri);
	});
});
