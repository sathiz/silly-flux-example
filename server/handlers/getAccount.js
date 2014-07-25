var _ = require('lodash');

module.exports = function (request, reply) {
	var accountId = request.params.accountId;

	reply({
		id: accountId,
		name: 'Account ' + accountId,
		domainName: 'account' + accountId + '.mindflash.com',
		ownerId: 4,
		teamMembers: _.map(_.range(0, 10), function (i) {
			return {
				id: i,
				name: "Team Member " + i,
				email: "teammember" + i + "@domain.com"
			};
		})
	});
};
