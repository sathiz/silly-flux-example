var _ = require('lodash');
var Boom = require('boom');
var mysql = require('mysql');
var config = require('../config');

module.exports = function (request, reply) {
	var accountId = request.params.accountId;

	var sql = "SELECT \
			a.id, \
			a.name, \
			d.FullName domainName, \
			IFNULL(o.id, 0) ownerId, \
			u.ID administratorId, \
			u.Name administratorName, \
			IFNULL(u.Email, u.Username) administratorEmail \
		FROM account a \
		JOIN domain d ON a.ID = d.accountId \
		LEFT JOIN userrecord o ON a.OwnerEmail = o.Email \
		JOIN userrecord u ON a.ID = u.AccountID \
		WHERE d.RecordType = 145000100 /*Primary*/ \
		AND u.Permissions = 169000400 /*Administrator*/ \
		AND a.id = ?";

	var connection = mysql.createConnection(config.mysql);
	connection.connect(function(err) {
		if (err) return reply(Boom.badImplementation(err.message));

		connection.query(sql, [accountId], function (err, rows) {
			connection.end();
			if (err) return reply(Boom.badImplementation(err.message));
			if (!rows.length) return reply({});

			var account = _.pick(rows[0], 'id', 'name', 'domainName', 'ownerId');
			account.teamMembers = _.map(rows, _.partialRight(_.pick, 'administratorId', 'administratorName', 'administratorEmail'));
			reply(account);
		});
	});
};
