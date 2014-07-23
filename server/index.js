var path = require('path');
var Hapi = require('hapi');
var Good = require('good');
var Joi = require('joi');

var server = new Hapi.Server('localhost', 8080);

// static assets - we'd normally only serve index.html here and cache it for a long time
server.route({
	method: 'GET',
	path: '/{path*}',
	handler: { directory: { path: path.join(__dirname, '/../dist'), listing: false, index: true } }
});

// favicon
server.route({
	method: 'GET',
	path: '/favicon.ico',
	handler: { file: path.join(__dirname, '/../dist/images/favicon.ico') },
	config: { cache: { expiresIn: 30 * 86400000 } } // 30 days
});

// api calls
server.route({
	method: 'GET',
	path: '/api/account',
	handler: require('./handlers/getAccounts'),
	config: {
		validate: {
			query: {
				search: Joi.string().allow().required()
			}
		}
	}
});

server.route({
	method: 'GET',
	path: '/api/account/{accountId}',
	handler: require('./handlers/getAccountDetails'),
	config: {
		validate: {
			params: {
				accountId: Joi.number().required()
			}
		}
	}
});

server.pack.register(Good, function (err) {
	if (err) throw err; // something bad happened loading the plugin
	server.start(function () {
		server.log('info', 'Server running at: ' + server.info.uri);
	});
});
