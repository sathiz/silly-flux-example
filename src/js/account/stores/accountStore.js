var appDispatcher = require('../dispatchers/accountDispatcher');
var appConstants = require('../constants/accountConstants');
var merge = require('react/lib/merge');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _lastSearch = null;
var _searchResults = [];
var _sort = null;
var _error = null;

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
	getError: function() {
		return _error;
	},
	getSearchSort: function() {
		return _sort;
	},
	sortSearchResults: function(field) {
		if(!_searchResults.length) return;
		if(!_sort) _sort = {field: null, asc: true};

		// reversing existing sort
		if (_sort.field === field) {
			_sort.asc = !_sort.asc;
			_searchResults = _searchResults.reverse();
			return;
		}

		_sort = {field: field, asc: true};
		_searchResults = _.sortBy(_searchResults, _sort.field);
	},
	onDispatchedAction: appDispatcher.register(function (payload) {
		console.log('accountStore.onDispatchedAction, payload:', payload);

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

		actionHandlerMap[appConstants.SORT_SEARCH_RESULTS] = function (action) {
			accountStore.sortSearchResults(action.field);
			accountStore.emitChange();
		};

		var action = payload.action; // this is our action from appDispatcher.handleViewAction / handleServerAction
		if (actionHandlerMap[action.actionType])
			actionHandlerMap[action.actionType](action);

		return true;
	})
});

module.exports = accountStore;
