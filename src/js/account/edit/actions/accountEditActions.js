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
		account.ownerId = parseInt(account.ownerId);

		accountDispatcher.handleViewAction({
			actionType: accountConstants.SAVING_ACCOUNT,
			account: account
		});
		accountEditServerCalls.editAccount(account).end(function(err, res) {
			if(err || res.error) {
				return accountDispatcher.handleServerAction({
					actionType: accountConstants.ACCOUNT_SAVE_ERROR,
					account: account,
					error: res.body.error + ": " + res.body.message
				});
			}
			accountDispatcher.handleServerAction({
				actionType: accountConstants.ACCOUNT_SAVE_OK,
				account: account
			});
		});
	}
};

module.exports = actions;
