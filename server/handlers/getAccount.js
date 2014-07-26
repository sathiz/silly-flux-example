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
	JOIN userrecord u ON u.AccountID = a.id \
	LEFT JOIN userrecord o ON o.accountId = a.id \
		AND o.Email = a.OwnerEmail \
		AND o.status = 109000200 /*Active*/ \
		AND o.Deleted IS NULL \
		AND o.permissions = 169000400 /*Administrator*/ \
	WHERE d.RecordType = 145000100 /*Primary*/ \
	AND u.Permissions = 169000400 /*Administrator*/ \
	AND u.status = 109000200 /*Active*/ \
	AND u.Deleted IS NULL \
	AND a.id = ?";

	var connection = mysql.createConnection(config.mysql);
	connection.connect(function(err) {
		if (err) return reply(Boom.badImplementation(err.message));

		connection.query(sql, [accountId], function (err, rows) {
			connection.end();
			if (err) return reply(Boom.badImplementation(err.message));
			if (!rows.length) return reply(Boom.badImplementation("Account has no administrators."));

			var account = _.pick(rows[0], 'id', 'name', 'domainName', 'ownerId');
			account.teamMembers = _.map(rows, _.partialRight(_.pick, 'administratorId', 'administratorName', 'administratorEmail'));
			reply(account);
		});
	});
};
