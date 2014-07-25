var superagent = require('superagent');

var api = {
	editAccount: function (account) {
		return superagent
			.post('/api/account/' + account.id)
			.send({
				ownerEmail: account.ownerEmail
			})
			.set('Accept', 'application/json');
	}
};

module.exports = api;
