var utils = require('../../shared/utils/utils');
var appDispatcher = require('../../shared/dispatchers/accountDispatcher');
var accountConstants = require('../../shared/constants/accountConstants');
var merge = require('react/lib/merge');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var state = {
	account: null,
	error: null
};

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

	getAccount: utils.getWith('account')(state),
	getAccountError: utils.getWith('error')(state),

	onDispatchedAction: appDispatcher.register(function (payload) {
		var actionHandlerMap = {};
		actionHandlerMap[accountConstants.FETCHING_ACCOUNT] = function (action) {
			state.error = null;
			store.emitChange();
		};

		actionHandlerMap[accountConstants.ACCOUNT_FETCH_OK] = function (action) {
			state.error = null;
			state.account = action.account;
			store.emitChange();
		};

		actionHandlerMap[accountConstants.ACCOUNT_FETCH_ERROR] = function (action) {
			state.error = action.error;
			store.emitChange();
		};

		var action = payload.action; // this is our action from appDispatcher.handleViewAction / handleServerAction
		if (actionHandlerMap[action.actionType])
			actionHandlerMap[action.actionType](action);

		return true;
	})
});

module.exports = store;
