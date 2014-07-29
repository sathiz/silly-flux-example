var superagent = require('superagent');

var api = {
	searchAccounts: function (search) {
		search = search || '';
		return superagent
			.get('/api/account?search=' + search)
			.set('Accept', 'application/json')
			.set('Accept-Encoding', 'gzip');
	},
	getAccount: function (accountId) {
		return superagent
			.get('/api/account/' + accountId)
			.set('Accept', 'application/json')
			.set('Accept-Encoding', 'gzip');
	}
};

module.exports = api;
