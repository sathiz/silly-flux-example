var AccountConstants = require('../constants/accountConstants');
var AccountDispatcher = require('../dispatchers/accountDispatcher');

var AccountActions = {
	searchAccounts: function(search) {
		AccountDispatcher.handleViewAction({
			actionType: AccountConstants.SEARCH_ACCOUNTS,
			search: search
		});
	}
};

module.exports = AccountActions;
