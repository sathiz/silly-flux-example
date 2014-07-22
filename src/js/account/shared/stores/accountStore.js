var utils = require('../utils/utils');
var appDispatcher = require('../dispatchers/accountDispatcher');
var accountConstants = require('../constants/accountConstants');
var merge = require('react/lib/merge');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var state = {
	error: null,
	accountSelected: false
};

var actionHandlerMap = {};
actionHandlerMap[accountConstants.ACCOUNT_FETCH_OK] = function (action) {
	state.accountSelected = true;
	store.emitChange();
};
actionHandlerMap[accountConstants.ACCOUNT_SEARCH_ERROR] = function (action) {
	state.error = action.error;
	store.emitChange();
};
actionHandlerMap[accountConstants.ACCOUNT_FETCH_ERROR] = function (action) {
	state.error = action.error;
	store.emitChange();
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

	getError: utils.getWith(state, 'error'),
	getAccountSelected: utils.getWith(state, 'accountSelected'),

	onDispatchedAction: appDispatcher.register(function (payload) {
		var action = payload.action; // this is our action from appDispatcher.handleViewAction / handleServerAction
		if (actionHandlerMap[action.actionType])
			actionHandlerMap[action.actionType](action);

		return true;
	})
});

module.exports = store;
