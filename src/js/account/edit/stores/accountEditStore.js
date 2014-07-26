var appDispatcher = require('../../shared/dispatchers/accountDispatcher');
var accountConstants = require('../../shared/constants/accountConstants');
var merge = require('react/lib/merge');
var _ = require('lodash');
var Store = require('../../../lesspain/store');

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

var store = merge(Store, {
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
