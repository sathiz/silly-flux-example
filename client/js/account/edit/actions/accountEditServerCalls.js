var superagent = require('superagent');

var api = {
	editAccount: function (account) {
		return superagent
			.post('/api/account/' + account.id)
			.send({
				ownerId: account.ownerId
			})
			.set('Accept', 'application/json');
	}
};

module.exports = api;