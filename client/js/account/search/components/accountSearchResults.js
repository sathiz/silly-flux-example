/** @jsx React.DOM */
var React = require('react');
var store = require('../stores/accountSearchStore');
var actions = require('../actions/accountSearchActions');
var accountSearchResult = require('./accountSearchResult');

var ENTER_KEY_CODE = 13;

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
		return function(event) {
			if(!event) return;
			if (event.keyCode && event.keyCode !== ENTER_KEY_CODE) return;
			actions.sortSearchResults(field);
		};
	},
	render: function () {
		if(!this.state.results.length)
			return (<span></span>);

		var i = 7;
		var results = this.state.results.map(function (account) {
			return (
				<accountSearchResult key={account.id} account={account} tabIndex={++i} />
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
						<tr>
							<th tabIndex="4" onKeyDown={this.sortBy('id')} onClick={this.sortBy('id')} className={cssClasses.name}>ID</th>
							<th tabIndex="5" onKeyDown={this.sortBy('name')} onClick={this.sortBy('name')} className={cssClasses.name}>Name</th>
							<th tabIndex="6" onKeyDown={this.sortBy('domainName')} onClick={this.sortBy('domainName')} className={cssClasses.domainName}>Domain</th>
							<th tabIndex="7" onKeyDown={this.sortBy('owner')} onClick={this.sortBy('owner')} className={cssClasses.owner}>Owner</th>
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
