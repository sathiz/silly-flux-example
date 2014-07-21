var accountConstants = require('../constants/accountConstants');
var accountDispatcher = require('../dispatchers/accountDispatcher');
var accountServerCalls = require('./accountServerCalls');

var accountActions = {
	searchAccounts: function(search) {
		accountDispatcher.handleViewAction({
			actionType: accountConstants.SEARCH_ACCOUNTS,
			search: search
		});
		accountServerCalls.searchAccounts(search).end(function(err, res) {
			if(err || res.error) {
				return accountDispatcher.handleServerAction({
					actionType: accountConstants.ACCOUNT_SEARCH_RESULTS_ERROR,
					error: err || res.body
				});
			}
			accountDispatcher.handleServerAction({
				actionType: accountConstants.ACCOUNT_SEARCH_RESULTS_OK,
				results: res.body
			});
		});
	},
	sortSearchResults: function(field) {
		accountDispatcher.handleViewAction({
			actionType: accountConstants.SORT_SEARCH_RESULTS,
			field: field
		});
	}
};

module.exports = accountActions;
