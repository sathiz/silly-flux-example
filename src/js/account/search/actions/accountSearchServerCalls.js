var superagent = require('superagent');

var accountSearchServerCalls = {
	searchAccounts: function (search) {
		return superagent
			.get('/api/account?search=' + search)
			.set('Accept', 'application/json');
	}
};

module.exports = accountSearchServerCalls;
