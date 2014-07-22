/** @jsx React.DOM */
var React = require('react');
var accountSearchStore = require('../stores/accountSearchStore');
var accountSearchActions = require('../actions/accountSearchActions');
var accountSearchResult = require('./accountSearchResult');
var errorView = require('../../../shared/components/errorView');

function getStateFromStore() {
	return {
		results: accountSearchStore.getSearchResults(),
		sortBy: accountSearchStore.getSearchSort(),
		error: accountSearchStore.getError()
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
		var results = this.state.results.map(function (result) {
			return (
				<accountSearchResult key={result.id} result={result} />
			);
		});

		return (
			<div>
				<errorView error={this.state.error} />
				<table className="table table-hover">
					<thead>
						<tr>
							<th onClick={this.sortBy('name')}>Name</th>
							<th onClick={this.sortBy('domainName')}>Domain</th>
							<th onClick={this.sortBy('owner')}>Owner</th>
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
