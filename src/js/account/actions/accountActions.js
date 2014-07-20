var AccountConstants = require('../constants/accountConstants');
var AccountDispatcher = require('../dispatchers/accountDispatcher');
var AccountServerCalls = require('./accountServerCalls');

var AccountActions = {
	searchAccounts: function(search) {
		AccountDispatcher.handleViewAction({
			actionType: AccountConstants.SEARCH_ACCOUNTS,
			search: search
		});
		AccountServerCalls.searchAccounts(search).end(function(err, res) {
			if(err) {
				return AccountDispatcher.handleServerAction({
					actionType: AccountConstants.ACCOUNT_SEARCH_RESULTS_ERROR,
					error: err
				});
			}
			AccountDispatcher.handleServerAction({
				actionType: AccountConstants.ACCOUNT_SEARCH_RESULTS_OK,
				results: res.body
			});
		});
	}
};

module.exports = AccountActions;
