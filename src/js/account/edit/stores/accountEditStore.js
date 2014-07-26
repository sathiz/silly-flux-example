var appDispatcher = require('../../shared/dispatchers/accountDispatcher');
var accountConstants = require('../../shared/constants/accountConstants');
var merge = require('react/lib/merge');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var actionHandlerMap = {};
// optimistic
actionHandlerMap[accountConstants.SAVING_ACCOUNT] = function (action) {
	store.account = action.account;
	store.account.lastOwnerId = store.account.ownerId;
	store.emitChange();
};
actionHandlerMap[accountConstants.ACCOUNT_FETCH_OK] = function (action) {
	action.account.lastOwnerId = action.account.ownerId;
	store.account = action.account;
	store.emitChange();
};
actionHandlerMap[accountConstants.ACCOUNT_FETCH_ERROR] = closeAccount;
actionHandlerMap[accountConstants.ABANDON_EDIT] = closeAccount;
actionHandlerMap[accountConstants.SEARCHING_ACCOUNTS] = closeAccount;

function closeAccount() {
	store.account = null;
	store.emitChange();
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
	account: null,
	onDispatchedAction: appDispatcher.register(function (payload) {
		var action = payload.action;
		console.log('accountEditStore.onDispatchedAction, action:', action);
		if (actionHandlerMap[action.actionType])
			actionHandlerMap[action.actionType](action);

		return true;
	})
});

module.exports = store;
