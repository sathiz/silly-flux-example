var _ = require('lodash');
var getAccount = require('./getAccount');

module.exports = function (request, reply) {
	var accountId = request.params.accountId;
	var ownerId = request.payload.ownerId;

	// save etc
	return getAccount(request, reply);
};
