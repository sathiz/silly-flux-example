var _ = require('lodash');
var Boom = require('boom');
var mysql = require('mysql');
var config = require('../config');

module.exports = function (request, reply) {
	var search = '%' + request.query.search + '%';
	if(!request.query.search)
		search = null;

	var sql = "SELECT \
		a.id, \
		a.name, \
		d.FullName domainName, \
		o.id ownerId, \
		IF(o.id IS NULL, a.ownerEmail, CONCAT(o.name, ' <', a.ownerEmail, '>')) `owner` \
	FROM account a \
	JOIN domain d ON d.accountId = a.id \
	LEFT JOIN userrecord o ON o.AccountID = a.id \
		AND o.Email = a.OwnerEmail \
		AND o.status = 109000200 /*Active*/ \
		AND o.Deleted IS NULL \
		AND o.permissions = 169000400 /*Administrator*/ \
		WHERE d.RecordType = 145000100 /*Primary*/ \
	AND a.Status NOT IN ( \
		127000500, /*Trial expired*/ \
		127000200, /*NonPayment*/ \
		127000400, /*AdministrativeDisableDEPRECIATED*/ \
		127000700 /*Cancelled*/ \
	)";

	var args = [];
	if(search) {
		// if this is an accountId
		var n = parseInt(search.replace(/%/g, ''), 10);
		if(!_.isNaN(n)) {
			args  = [n];
			sql += " AND a.id = ?";
		} else {
			args = [search, search];
			sql += " AND ( \
				a.Name LIKE ? \
				OR d.FullName LIKE ? \
			)";
		}
	}

	sql += " ORDER BY a.name";

	var connection = mysql.createConnection(config.mysql);
	connection.connect(function(err) {
		if (err) return reply(Boom.badImplementation(err.message));

		connection.query(sql, args, function (err, rows) {
			connection.end();
			if (err) return reply(Boom.badImplementation(err.message));
			if (!rows.length) return reply({});
			reply(rows);
		});
	});
};
