var accountConstants = require('../constants/accountConstants');
var accountDispatcher = require('../dispatchers/accountDispatcher');

var actions = {
	closeMessage: function() {
		accountDispatcher.handleViewAction({
			actionType: accountConstants.CLOSE_MESSAGE
		});
	}
};

module.exports = actions;
