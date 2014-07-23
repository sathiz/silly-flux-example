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
actionHandlerMap[accountConstants.ABANDON_EDIT] = function (action) {
	state.accountSelected = false;
	store.emitChange();
};

var mapped = _.reduce(state, function(result, value, key) {
	result[key] = function() { return state[key]; };
	return result;
}, {});

var store = merge(mapped, merge(EventEmitter.prototype, {
	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function (listener) {
		this.on(CHANGE_EVENT, listener);
	},
	removeChangeListener: function (listener) {
		this.removeListener(CHANGE_EVENT, listener);
	},

	onDispatchedAction: appDispatcher.register(function (payload) {
		var action = payload.action; // this is our action from appDispatcher.handleViewAction / handleServerAction
		if (actionHandlerMap[action.actionType])
			actionHandlerMap[action.actionType](action);

		return true;
	})
}));

module.exports = store;
