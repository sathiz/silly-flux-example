var superagent = require('superagent');

var accountServerCalls = {
	searchAccounts: function (search) {
		return superagent
			.get('/api/account?search=' + search)
			.set('Accept', 'application/json');
	}
};

module.exports = accountServerCalls;
