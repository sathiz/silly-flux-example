var _ = require('lodash');
var Boom = require('boom');
var mysql = require('mysql');
var config = require('../config');

module.exports = function (request, reply) {
	var accountId = request.params.accountId;
	var ownerId = request.payload.ownerId;

	var sql = "UPDATE account \
		SET ownerEmail = ( \
			SELECT u.email \
			FROM userrecord u \
			WHERE u.id = ? \
		) \
		WHERE id = ?";

	var connection = mysql.createConnection(config.mysql);
	connection.connect(function (err) {
		if (err) return reply(Boom.badImplementation(err.message));

		connection.query(sql, [ownerId, accountId], function (err, res) {
			if (err) return reply(Boom.badImplementation(err.message));
			if (res.affectedRows !== 1) return reply(Boom.badImplementation("(" + res.affectedRows + ") were affected."));
			reply();
		});
	});
};
