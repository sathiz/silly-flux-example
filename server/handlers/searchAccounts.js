var _ = require('lodash');
var Boom = require('boom');
var mysql = require('mysql');
var config = require('../config');

module.exports = function (request, reply) {
	var search = '%' + request.query.search + '%';
	if(~['null',''].indexOf(request.query.search))
		search = '%';

	var sql = "SELECT \
			a.id, \
			a.name, \
			d.FullName domainName, \
			IF(o.name IS NULL, a.ownerEmail, CONCAT(o.name, '<', a.ownerEmail, '>')) owner \
		FROM account a \
		JOIN domain d ON a.ID = d.accountId \
		LEFT JOIN userrecord o ON a.OwnerEmail = o.Email \
		WHERE d.RecordType = 145000100 /*Primary*/ \
		AND a.Status NOT IN ( \
			127000500, /*Trial expired*/ \
			127000200, /*NonPayment*/ \
			127000400, /*AdministrativeDisableDEPRECIATED*/ \
			127000700 /*Cancelled*/ \
		) \
		AND ( \
			a.Name LIKE ? \
			OR d.FullName LIKE ? \
		)";

	var connection = mysql.createConnection(config.mysql);
	connection.connect(function(err) {
		if (err) return reply(Boom.badImplementation(err.message));

		connection.query(sql, [search, search], function (err, rows) {
			connection.end();
			if (err) return reply(Boom.badImplementation(err.message));
			if (!rows.length) return reply({});
			reply(rows);
		});
	});
};
