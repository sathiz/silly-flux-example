var accountSearchConstants = require('../constants/accountSearchConstants');
var accountDispatcher = require('../../dispatchers/accountDispatcher');
var accountSearchServerCalls = require('./accountSearchServerCalls');

var accountActions = {
	searchAccounts: function(search) {
		accountDispatcher.handleViewAction({
			actionType: accountSearchConstants.SEARCH_ACCOUNTS,
			search: search
		});
		accountSearchServerCalls.searchAccounts(search).end(function(err, res) {
			if(err || res.error) {
				return accountDispatcher.handleServerAction({
					actionType: accountSearchConstants.ACCOUNT_SEARCH_RESULTS_ERROR,
					error: err || res.body
				});
			}
			accountDispatcher.handleServerAction({
				actionType: accountSearchConstants.ACCOUNT_SEARCH_RESULTS_OK,
				results: res.body
			});
		});
	},
	sortSearchResults: function(field) {
		accountDispatcher.handleViewAction({
			actionType: accountSearchConstants.SORT_SEARCH_RESULTS,
			field: field
		});
	}
};

module.exports = accountActions;
