var AccountConstants = require('../constants/accountConstants');
var AccountDispatcher = require('../dispatchers/accountDispatcher');

var AccountActions = {
	searchAccounts: function(search) {
		AccountDispatcher.handleViewAction({
			actionType: AccountConstants.SEARCH_ACCOUNTS,
			search: search
		});
	},
	accountSearchResults: function(results) {
		AccountDispatcher.handleServerAction({
			actionType: AccountConstants.ACCOUNT_SEARCH_RESULTS,
			results: results
		});
	}
};

module.exports = AccountActions;
