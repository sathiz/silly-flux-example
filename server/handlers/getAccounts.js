var _ = require('lodash');
module.exports = function (request, reply) {
	var accounts = _.map(_.range(10000, 10100), function (i) {
		return {
			id: i,
			name: 'Account ' + i,
			domainName: 'account' + i + '.mindflash.com',
			owner: 'owner@domain' + i + '.com'
		};
	});
	reply(accounts);
};
