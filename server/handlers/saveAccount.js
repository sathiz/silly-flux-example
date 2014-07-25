var _ = require('lodash');
var getAccount = require('./getAccount');

module.exports = function (request, reply) {
	var accountId = request.params.accountId;
	var ownerEmail = request.payload.ownerEmail;

	// save etc
	return getAccount(request, reply);
};
