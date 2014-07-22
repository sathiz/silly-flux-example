var accountConstants = require('../../shared/constants/accountConstants');
var accountDispatcher = require('../../shared/dispatchers/accountDispatcher');
var accountSearchServerCalls = require('./accountSearchServerCalls');

var actions = {
	searchAccounts: function(search) {
		accountDispatcher.handleViewAction({
			actionType: accountConstants.SEARCHING_ACCOUNTS,
			search: search
		});
		accountSearchServerCalls.searchAccounts(search).end(function(err, res) {
			if(err || res.error) {
				return accountDispatcher.handleServerAction({
					actionType: accountConstants.ACCOUNT_SEARCH_ERROR,
					error: err || res.body
				});
			}
			accountDispatcher.handleServerAction({
				actionType: accountConstants.ACCOUNT_SEARCH_OK,
				results: res.body
			});
		});
	},
	sortSearchResults: function(field) {
		accountDispatcher.handleViewAction({
			actionType: accountConstants.SORT_SEARCH_RESULTS,
			field: field
		});
	},
	requestAccount: function(accountId) {
		accountDispatcher.handleViewAction({
			actionType: accountConstants.FETCHING_ACCOUNT,
			search: accountId
		});
		accountSearchServerCalls.getAccount(accountId).end(function(err, res) {
			if(err || res.error) {
				return accountDispatcher.handleServerAction({
					actionType: accountConstants.ACCOUNT_FETCH_ERROR,
					error: err || res.body
				});
			}
			accountDispatcher.handleServerAction({
				actionType: accountConstants.ACCOUNT_FETCH_OK,
				account: res.body
			});
		});
	}
};

module.exports = actions;
