var path = require('path');
var Hapi = require('hapi');

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
	handler: require('./handlers/getAccounts')
});

server.route({
	method: 'GET',
	path: '/api/account/{accountId}',
	handler: require('./handlers/getAccountDetails')
});

server.start(function () {
	console.log('Server running at:', server.info.uri);
});
