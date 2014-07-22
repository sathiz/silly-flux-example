var superagent = require('superagent');

var api = {
	searchAccounts: function (search) {
		return superagent
			.get('/api/account?search=' + search)
			.set('Accept', 'application/json');
	},
	getAccount: function (accountId) {
		return superagent
			.get('/api/account/' + accountId)
			.set('Accept', 'application/json');
	}
};

module.exports = api;
