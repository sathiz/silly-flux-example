var Dispatcher = require('./dispatcher');
var merge = require('react/lib/merge');

var AccountDispatcher = merge(Dispatcher.prototype, {
	handleViewAction: function(action) {
		console.log('AccountDispatcher.handleViewAction, action:', action);
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});
	},
	handleServerAction: function(action) {
		console.log('AccountDispatcher.handleServerAction, action:', action);
		this.dispatch({
			source: 'SERVER_ACTION',
			action: action
		});
	}
});

module.exports = AccountDispatcher;
