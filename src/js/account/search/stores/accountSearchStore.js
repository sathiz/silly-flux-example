var utils = require('../../shared/utils/utils');
var appDispatcher = require('../../shared/dispatchers/accountDispatcher');
var accountConstants = require('../../shared/constants/accountConstants');
var merge = require('react/lib/merge');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var state = {
	lastSearch: null,
	searchResults: [],
	sort: {field: null, asc: true},
	accountSelected: false
};

function sortSearchResults(field) {
	if(!state.searchResults.length) return;

	// reversing existing sort
	if (state.sort.field === field) {
		state.sort.asc = !state.sort.asc;
		state.searchResults = state.searchResults.reverse();
		return;
	}

	state.sort = {field: field, asc: true};
	state.searchResults = _.sortBy(state.searchResults, state.sort.field);
}

var actionHandlerMap = {};
actionHandlerMap[accountConstants.SEARCHING_ACCOUNTS] = function (action) {
	state.lastSearch = action.search;
	store.emitChange();
};

actionHandlerMap[accountConstants.ACCOUNT_SEARCH_OK] = function (action) {
	state.searchResults = action.results;
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
	state.accountSelected = true;
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

	getLastSearch: utils.getWith(state, 'lastSearch'),
	getSearchResults: utils.getWith(state, 'searchResults'),
	getSearchSort:  utils.getWith(state, 'sort'),
	getAccountSelected:  utils.getWith(state, 'accountSelected'),
	sortSearchResults: sortSearchResults,

	onDispatchedAction: appDispatcher.register(function (payload) {
		var action = payload.action; // this is our action from appDispatcher.handleViewAction / handleServerAction
		if (actionHandlerMap[action.actionType])
			actionHandlerMap[action.actionType](action);

		return true;
	})
});

module.exports = store;
