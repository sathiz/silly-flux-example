var appDispatcher = require('../../shared/dispatchers/accountDispatcher');
var accountConstants = require('../../shared/constants/accountConstants');
var merge = require('react/lib/merge');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

// account edit
var accountEdit = {
	account: null,
	error: null
};

var accountEditStore = merge(EventEmitter.prototype, {
	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function (listener) {
		this.on(CHANGE_EVENT, listener);
	},
	removeChangeListener: function (listener) {
		this.removeListener(CHANGE_EVENT, listener);
	},
	getAccount: function() {
		return accountEdit.account;
	},
	getAccountError: function() {
		return accountEdit.error;
	},
	onDispatchedAction: appDispatcher.register(function (payload) {
		console.log('accountEditStore.onDispatchedAction, payload:', payload);

		var actionHandlerMap = {};
		actionHandlerMap[accountConstants.SEARCH_ACCOUNTS] = function (action) {
			accountEdit.error = null;
			accountEdit.account = null;
			accountEditStore.emitChange();
		};

		actionHandlerMap[accountConstants.REQUEST_ACCOUNT] = function (action) {
			accountEdit.error = null;
			// TODO
			accountEditStore.emitChange();
		};

		actionHandlerMap[accountConstants.ACCOUNT_FETCHED] = function (action) {
			// TODO
		};

		actionHandlerMap[accountConstants.ACCOUNT_FETCH_ERROR] = function (action) {
			// TODO
		};

		var action = payload.action; // this is our action from appDispatcher.handleViewAction / handleServerAction
		if (actionHandlerMap[action.actionType])
			actionHandlerMap[action.actionType](action);

		return true;
	})
});

module.exports = accountEditStore;
