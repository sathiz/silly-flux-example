var path = require('path');
var Hapi = require('hapi');
var Good = require('good');
var Joi = require('joi');
var config = require('./config');

var server = new Hapi.Server('localhost', process.env.PORT || config.port);

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
	handler: require('./handlers/searchAccounts'),
	config: {
		validate: {
			query: {
				search: Joi.string().allow(null,'').optional()
			}
		}
	}
});

server.route({
	method: 'GET',
	path: '/api/account/{accountId}',
	handler: require('./handlers/getAccount'),
	config: {
		validate: {
			params: {
				accountId: Joi.number().required()
			}
		}
	}
});

server.route({
	method: 'POST',
	path: '/api/account/{accountId}',
	handler: require('./handlers/saveAccount'),
	config: {
		validate: {
			params: {
				accountId: Joi.number().required()
			},
			payload: {
				ownerId: Joi.number().required()
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
