var appDispatcher = require('../../shared/dispatchers/accountDispatcher');
var accountConstants = require('../../shared/constants/accountConstants');
var _ = require('lodash');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var actionHandlerMap = {};
actionHandlerMap[accountConstants.ACCOUNT_FETCH_OK] = function (action) {
	action.account.lastOwnerId = action.account.ownerId;
	store.account = action.account;
	store.emitChange();
};
// optimistic
actionHandlerMap[accountConstants.SAVING_ACCOUNT] = closeAccount;
actionHandlerMap[accountConstants.ACCOUNT_FETCH_ERROR] = closeAccount;
actionHandlerMap[accountConstants.ABANDON_EDIT] = closeAccount;
actionHandlerMap[accountConstants.SEARCHING_ACCOUNTS] = closeAccount;

function closeAccount() {
	store.account = null;
	store.emitChange();
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
	account: null,

	onDispatchedAction: appDispatcher.register(function (payload) {
		var action = payload.action;
		if (actionHandlerMap[action.actionType])
			actionHandlerMap[action.actionType](action);

		return true;
	})
});

module.exports = store;
