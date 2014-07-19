var AppDispatcher = require('../dispatchers/accountDispatcher');
var AppConstants = require('../constants/accountConstants');
var merge = require('react/lib/merge');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

// this would normally come from the server
var _accounts = _.map(_.range(0, 10), function (i) {
	return {
		id: i,
		name: 'Account ' + i,
		domainName: 'account' + i + '.mindflash.com',
		owner: 'owner@domain' + i + '.com'
	};
});

var _lastSearch;
var _searchResults;

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
	searchForAccount: function (search) {
		_lastSearch = search;
		this.emitChange();
		//
	},
	dispatcherIndex: AppDispatcher.register(function (payload) {
		console.log('AccountStore, payload:', payload);

		var actionHandlerMap = {};
		actionHandlerMap[AppConstants.SEARCH_ACCOUNTS] = function (action) {
			_lastSearch = action.search;
			AccountStore.emitChange();
			// TODO - setTimeout, fill accounts, dispatch SEARCH_RESULTS action
		};

		actionHandlerMap[AppConstants.SEARCH_RESULTS] = function (action) {
			_searchResults = action.results;
			// TODO - fill accounts from action.accounts
		};

		var action = payload.action; // this is our action from AppDispatcher.handleViewAction
		if (actionHandlerMap[action.actionType])
			actionHandlerMap[action.actionType](action);

		return true;
	})
});

module.exports = AccountStore;
