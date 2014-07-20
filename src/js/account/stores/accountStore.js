var AppDispatcher = require('../dispatchers/accountDispatcher');
var AppConstants = require('../constants/accountConstants');
var AppActions = require('../actions/accountActions');
var merge = require('react/lib/merge');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _lastSearch = null;
var _searchResults = [];

var AccountStore = merge(EventEmitter.prototype, {
	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function (listener) {
		this.on(CHANGE_EVENT, listener);
	},
	removeChangeListener: function (listener) {
		this.removeListener(CHANGE_EVENT, listener);
	},
	getLastSearch: function() {
		return _lastSearch;
	},
	getSearchResults: function() {
		return _searchResults;
	},
	dispatcherIndex: AppDispatcher.register(function (payload) {
		console.log('AccountStore, payload:', payload);

		var actionHandlerMap = {};
		actionHandlerMap[AppConstants.SEARCH_ACCOUNTS] = function (action) {
			_lastSearch = action.search;
			AccountStore.emitChange();
		};

		actionHandlerMap[AppConstants.ACCOUNT_SEARCH_RESULTS_OK] = function (action) {
			_searchResults = action.results;
			AccountStore.emitChange();
		};

		actionHandlerMap[AppConstants.ACCOUNT_SEARCH_RESULTS_ERROR] = function (action) {
			console.log(action.error); // TODO
		};

		var action = payload.action; // this is our action from AppDispatcher.handleViewAction / handleServerAction
		if (actionHandlerMap[action.actionType])
			actionHandlerMap[action.actionType](action);

		return true;
	})
});

module.exports = AccountStore;
