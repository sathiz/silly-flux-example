var appDispatcher = require('../../shared/dispatchers/accountDispatcher');
var accountConstants = require('../../shared/constants/accountConstants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

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
	store.accountSelected = false;
	store.emitChange();
};
actionHandlerMap[accountConstants.ACCOUNT_SEARCH_OK] = function (action) {
	store.searchResults = action.results;
	store.emitChange();
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
// optimistic - update the account in the list before the server returns
actionHandlerMap[accountConstants.SAVING_ACCOUNT] = function (action) {
	var account = action.account;

	_.each(store.searchResults, function(result, key) {
		if(account.id != account.id) return;
		var owner = _.find(account.users, {id: account.ownerId});
		if(owner) {
			store.searchResults[key].$oldOwner = store.searchResults[key].owner;
			store.searchResults[key].ownerId = owner.id;
			store.searchResults[key].owner = owner.name + ' <' + owner.email + '>';
		}
	});
	store.accountSelected = false;
	store.emitChange();
};
// error saving, reset account in list
actionHandlerMap[accountConstants.ACCOUNT_SAVE_ERROR] = function (action) {
	var account = action.account;
	_.each(store.searchResults, function(result, key) {
		if(account.id != account.id) return;

		if(account.$oldOwner)
			store.searchResults[key].owner = store.searchResults[key].$oldOwner
	});
	store.emitChange();
};

var store = merge(EventEmitter.prototype, {
	emitChange: function () {
		this.emit('change');
	},
	addChangeListener: function (listener) {
		this.on('change', listener);
	},
	removeChangeListener: function (listener) {
		this.removeListener('change', listener);
	},
	lastSearch: null,
	searchResults: [],
	sort: {field: null, asc: true},
	accountSelected: false,
	sortSearchResults: sortSearchResults,

	onDispatchedAction: appDispatcher.register(function (payload) {
		var action = payload.action;
		if (actionHandlerMap[action.actionType])
			actionHandlerMap[action.actionType](action);

		return true;
	})
});

module.exports = store;
