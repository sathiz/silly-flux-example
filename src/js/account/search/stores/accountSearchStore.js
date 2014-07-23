var utils = require('../../shared/utils/utils');
var appDispatcher = require('../../shared/dispatchers/accountDispatcher');
var accountConstants = require('../../shared/constants/accountConstants');
var merge = require('react/lib/merge');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

function sortSearchResults(field) {
	if(!store.searchResults.length) return;

	// reversing existing sort
	if (store.sort.field === field) {
		store.sort.asc = !store.sort.asc;
		store.searchResults = store.searchResults.reverse();
		return;
	}

	store.sort = {field: field, asc: true};
	store.searchResults = _.sortBy(store.searchResults, store.sort.field);
}

var actionHandlerMap = {};
actionHandlerMap[accountConstants.SEARCHING_ACCOUNTS] = function (action) {
	store.lastSearch = action.search;
	store.emitChange();
};
actionHandlerMap[accountConstants.ACCOUNT_SEARCH_OK] = function (action) {
	store.searchResults = action.results;
	store.emitChange();
};
actionHandlerMap[accountConstants.ACCOUNT_SEARCH_ERROR] = function (action) {
	//
};
actionHandlerMap[accountConstants.SORT_SEARCH_RESULTS] = function (action) {
	store.sortSearchResults(action.field);
	store.emitChange();
};
actionHandlerMap[accountConstants.ACCOUNT_FETCH_OK] = function (action) {
	store.accountSelected = true;
	store.emitChange();
};
actionHandlerMap[accountConstants.ABANDON_EDIT] = function (action) {
	store.accountSelected = false;
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
	
	lastSearch: null,
	searchResults: [],
	sort: {field: null, asc: true},
	accountSelected: false,
	sortSearchResults: sortSearchResults,

	onDispatchedAction: appDispatcher.register(function (payload) {
		var action = payload.action; // this is our action from appDispatcher.handleViewAction / handleServerAction
		if (actionHandlerMap[action.actionType])
			actionHandlerMap[action.actionType](action);

		return true;
	})
});

console.log(store);

module.exports = store;
