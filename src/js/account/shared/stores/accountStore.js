var appDispatcher = require('../dispatchers/accountDispatcher');
var accountConstants = require('../constants/accountConstants');
var merge = require('react/lib/merge');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var actionHandlerMap = {};
actionHandlerMap[accountConstants.ACCOUNT_FETCH_OK] = function (action) {
	store.accountSelected = true;
	store.emitChange();
};
actionHandlerMap[accountConstants.ABANDON_EDIT] = function (action) {
	store.accountSelected = false;
	store.emitChange();
};
actionHandlerMap[accountConstants.ACCOUNT_SEARCH_ERROR] = handleError("An error occurred while searching, please try again.");
actionHandlerMap[accountConstants.ACCOUNT_FETCH_ERROR] = handleError("An error occurred while fetching that account, please try again.");

actionHandlerMap[accountConstants.ACCOUNT_SAVE_ERROR] = function (action) {
	var account = action.account;
	var error = action.error;
	store.message = "An error occurred while saving Account: " + account.domainName + " (" + account.name + "). Error: " + error;
	store.emitChange();
};

actionHandlerMap[accountConstants.ACCOUNT_SAVE_OK] = function (action) {
	var account = action.account;
	store.message = "Account: " + account.domainName + " (" + account.name + ") saved.";
	store.emitChange();
};

function handleError(msg) {
	return function(action) {
		store.error = msg + 'Error: ' + action.error;
		store.emitChange();
	}
}

var store = merge(EventEmitter.prototype, {
	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function (listener) {
		this.on(CHANGE_EVENT, listener);
	},
	removeChangeListener: function (listener) {
		this.removeListener(CHANGE_EVENT, listener);
	},

	message: null,
	error: null,
	accountSelected: false,

	onDispatchedAction: appDispatcher.register(function (payload) {
		var action = payload.action;
		console.log('accountStore.onDispatchedAction, action:', action);
		if (actionHandlerMap[action.actionType])
			actionHandlerMap[action.actionType](action);

		return true;
	})
});

module.exports = store;
