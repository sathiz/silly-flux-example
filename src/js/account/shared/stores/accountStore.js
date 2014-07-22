var appDispatcher = require('../dispatchers/accountDispatcher');
var accountConstants = require('../constants/accountConstants');
var merge = require('react/lib/merge');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

// search
var accountSearch = {
	lastSearch: null,
	searchResults: [],
	sort: {field: null, asc: true},
	error: null
};

// account edit
var accountEdit = {
	account: null,
	error: null
};

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
		return accountSearch.lastSearch;
	},
	getSearchResults: function() {
		return accountSearch.searchResults;
	},
	getSearchError: function() {
		return accountSearch.error;
	},
	getSearchSort: function() {
		return accountSearch.sort;
	},
	sortSearchResults: function(field) {
		if(!accountSearch.searchResults.length) return;

		// reversing existing sort
		if (accountSearch.sort.field === field) {
			accountSearch.sort.asc = !accountSearch.sort.asc;
			accountSearch.searchResults = accountSearch.searchResults.reverse();
			return;
		}

		accountSearch.sort = {field: field, asc: true};
		accountSearch.searchResults = _.sortBy(accountSearch.searchResults, accountSearch.sort.field);
	},
	getAccount: function() {
		return accountEdit.account;
	},
	getAccountError: function() {
		return accountEdit.error;
	},
	onDispatchedAction: appDispatcher.register(function (payload) {
		console.log('accountStore.onDispatchedAction, payload:', payload);

		var actionHandlerMap = {};
		actionHandlerMap[accountConstants.SEARCH_ACCOUNTS] = function (action) {
			accountSearch.lastSearch = action.search;
			_error = null;
			accountStore.emitChange();
		};

		actionHandlerMap[accountConstants.ACCOUNT_SEARCH_RESULTS_OK] = function (action) {
			accountSearch.searchResults = action.results;
			accountStore.emitChange();
		};

		actionHandlerMap[accountConstants.ACCOUNT_SEARCH_RESULTS_ERROR] = function (action) {
			_error = action.error;
			accountStore.emitChange();
		};

		actionHandlerMap[accountConstants.SORT_SEARCH_RESULTS] = function (action) {
			accountStore.sortSearchResults(action.field);
			accountStore.emitChange();
		};

		actionHandlerMap[accountConstants.REQUEST_ACCOUNT] = function (action) {
			_error = null;
			// TODO
			accountStore.emitChange();
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

module.exports = accountStore;
