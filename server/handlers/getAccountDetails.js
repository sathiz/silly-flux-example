module.exports = function (request, reply) {
	var accountId = request.params.accountId;

	reply({
		id: accountId,
		name: 'Account ' + accountId,
		domainName: 'account' + accountId + '.mindflash.com',
		owner: 'owner@domain' + accountId + '.com'
	});
};
