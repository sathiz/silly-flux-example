var accountConstants = require('../../shared/constants/accountConstants');
var accountDispatcher = require('../../shared/dispatchers/accountDispatcher');
var accountEditServerCalls = require('./accountEditServerCalls');

var actions = {
	abandonEdit: function () {
		accountDispatcher.handleViewAction({
			actionType: accountConstants.ABANDON_EDIT
		});
	},
	saveEdit: function (account) {
		accountDispatcher.handleViewAction({
			actionType: accountConstants.SAVING_EDIT,
			account: account
		});
		accountEditServerCalls.editAccount(account).end(function(err, res) {
			if(err || res.error) {
				return accountDispatcher.handleServerAction({
					actionType: accountConstants.ACCOUNT_SAVE_ERROR,
					error: err || res.body
				});
			}
			accountDispatcher.handleServerAction({
				actionType: accountConstants.ACCOUNT_SAVE_OK,
				account: res.body
			});
		});
	}
};

module.exports = actions;
