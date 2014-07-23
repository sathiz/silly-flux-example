/** @jsx React.DOM */
var React = require('react');
var accountSearchStore = require('../stores/accountSearchStore');
var accountSearchActions = require('../actions/accountSearchActions');
var accountSearchResult = require('./accountSearchResult');

function getStateFromStore() {
	return {
		results: accountSearchStore.getSearchResults(),
		sortBy: accountSearchStore.getSearchSort()
	};
}

var accountSearchResults = React.createClass({
	getInitialState: function () {
		return getStateFromStore();
	},
	componentWillMount: function () {
		accountSearchStore.addChangeListener(this.onStoreChange);
	},
	componentWillUnmount: function () {
		accountSearchStore.removeChangeListener(this.onStoreChange);
	},
	onStoreChange: function () {
		this.setState(getStateFromStore());
	},
	sortBy: function(field) {
		return function() {
			accountSearchActions.sortSearchResults(field);
		};
	},
	render: function () {
		if(!this.state.results.length)
			return (<span></span>);

		var results = this.state.results.map(function (account) {
			return (
				<accountSearchResult key={account.id} account={account} />
			);
		});

		// todo - create a style for the sort arrows etc
		var cssClasses = {
			name: null,
			domainName: null,
			owner: null
		};
		var sortBy = this.state.sortBy;
		if(sortBy.field)
			cssClasses[sortBy.field] = 'sort' + (sortBy.asc ? 'Asc' : 'Desc');

		return (
			<div>
				<h3>Click a row to edit an account</h3>
				<table className="table table-hover">
					<thead>
						<tr>
							<th onClick={this.sortBy('name')} className={cssClasses.name}>Name</th>
							<th onClick={this.sortBy('domainName')} className={cssClasses.domainName}>Domain</th>
							<th onClick={this.sortBy('owner')} className={cssClasses.owner}>Owner</th>
						</tr>
					</thead>
					<tbody>
					{results}
					</tbody>
				</table>
			</div>
		);
	}
});
module.exports = accountSearchResults;