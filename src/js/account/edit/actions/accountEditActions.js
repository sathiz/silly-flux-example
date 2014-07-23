var accountConstants = require('../../shared/constants/accountConstants');
var accountDispatcher = require('../../shared/dispatchers/accountDispatcher');
var accountEditServerCalls = require('./accountEditServerCalls');

var actions = {
	abandonEdit: function () {
		accountDispatcher.handleViewAction({
			actionType: accountConstants.ABANDON_EDIT
		});
	}
};

module.exports = actions;
