var superagent = require('superagent');

var AccountServerCalls = {
	searchAccounts: function (search) {
		superagent
			.get('/account')
			.send({search: search})
			.set('Accept', 'application/json')
			.end(function (err, res) {
				//
			});
	}
};

module.exports = AccountServerCalls;
