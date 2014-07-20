var appDispatcher = require('../dispatchers/accountDispatcher');
var appConstants = require('../constants/accountConstants');
var merge = require('react/lib/merge');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _lastSearch = null;
var _searchResults = [];

var accountStore = merge(EventEmitter.prototype, {
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
	dispatcherIndex: appDispatcher.register(function (payload) {
		console.log('accountStore, payload:', payload);

		var actionHandlerMap = {};
		actionHandlerMap[appConstants.SEARCH_ACCOUNTS] = function (action) {
			_lastSearch = action.search;
			accountStore.emitChange();
		};

		actionHandlerMap[appConstants.ACCOUNT_SEARCH_RESULTS_OK] = function (action) {
			_searchResults = action.results;
			accountStore.emitChange();
		};

		actionHandlerMap[appConstants.ACCOUNT_SEARCH_RESULTS_ERROR] = function (action) {
			console.log(action.error); // TODO
		};

		var action = payload.action; // this is our action from appDispatcher.handleViewAction / handleServerAction
		if (actionHandlerMap[action.actionType])
			actionHandlerMap[action.actionType](action);

		return true;
	})
});

module.exports = accountStore;
