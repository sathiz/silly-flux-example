/** @jsx React.DOM */
var React = require('react');
var store = require('../stores/accountSearchStore');
var actions = require('../actions/accountSearchActions');
var accountSearchResult = require('./accountSearchResult');

function getStateFromStore() {
	return {
		results: store.searchResults,
		sortBy: store.sort
	};
}

var accountSearchResults = React.createClass({
	getInitialState: function () {
		return getStateFromStore();
	},
	componentWillMount: function () {
		store.addChangeListener(this.onStoreChange);
	},
	componentWillUnmount: function () {
		store.removeChangeListener(this.onStoreChange);
	},
	onStoreChange: function () {
		this.setState(getStateFromStore());
	},
	sortBy: function(field) {
		return function() {
			actions.sortSearchResults(field);
		};
	},
	render: function () {
		if(!this.state.results.length)
			return (<span></span>);

		var i = 6;
		var results = this.state.results.map(function (account) {
			return (
				<accountSearchResult key={account.id} account={account} tabIdx={++i} />
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
			<div className="table-responsive">
				<h4>Click a row to edit an account</h4>
				<table className="table table-hover">
					<thead>
						<tr tabindex="2">
							<th tabindex="3" onClick={this.sortBy('id')} className={cssClasses.name}>ID</th>
							<th tabindex="4" onClick={this.sortBy('name')} className={cssClasses.name}>Name</th>
							<th tabindex="5" onClick={this.sortBy('domainName')} className={cssClasses.domainName}>Domain</th>
							<th tabindex="6" onClick={this.sortBy('owner')} className={cssClasses.owner}>Owner</th>
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
