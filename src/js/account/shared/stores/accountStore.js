var appDispatcher = require('../dispatchers/accountDispatcher');
var accountConstants = require('../constants/accountConstants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var actionHandlerMap = {};
actionHandlerMap[accountConstants.ACCOUNT_FETCH_OK] = function (action) {
	store.error = null;
	store.message = null;
	store.accountSelected = true;
	store.emitChange();
};
// optimistic - assume save will work
actionHandlerMap[accountConstants.SAVING_ACCOUNT] = function (action) {
	var account = action.account;
	store.error = null;
	store.message = "Account: " + account.domainName + " (" + account.name + ") saved.";
	store.accountSelected = false;
	store.emitChange();
};
actionHandlerMap[accountConstants.ABANDON_EDIT] = resetState;
actionHandlerMap[accountConstants.SEARCHING_ACCOUNTS] = resetState;
actionHandlerMap[accountConstants.ACCOUNT_SEARCH_ERROR] = handleError("An error occurred while searching, please try again.");
actionHandlerMap[accountConstants.ACCOUNT_FETCH_ERROR] = handleError("An error occurred while fetching that account, please try again.");

actionHandlerMap[accountConstants.ACCOUNT_SAVE_ERROR] = function (action) {
	var account = action.account;
	var error = action.error;
	store.error = "An error occurred while saving Account: " + account.domainName + " (" + account.name + "). Error: " + error;
	store.message = null;
	store.emitChange();
};

function resetState() {
	store.error = null;
	store.message = null;
	store.accountSelected = false;
	store.emitChange();
}

function handleError(msg) {
	return function (action) {
		store.error = msg + 'Error: ' + action.error;
		store.message = null;
		store.emitChange();
	}
}

var store = merge(EventEmitter.prototype, {
	emitChange: function () {
		this.emit('change');
	},
	addChangeListener: function (listener) {
		this.on('change', listener);
	},
	removeChangeListener: function (listener) {
		this.removeListener('change', listener);
	},
	message: null,
	error: null,
	accountSelected: false,

	onDispatchedAction: appDispatcher.register(function (payload) {
		var action = payload.action;
		if (actionHandlerMap[action.actionType])
			actionHandlerMap[action.actionType](action);

		return true;
	})
});

module.exports = store;
