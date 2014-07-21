/** @jsx React.DOM */
var React = require('react');
var accountStore = require('../stores/accountStore');
var accountSearchResult = require('./accountSearchResult');

function getSearchResults() {
	return { results: accountStore.getSearchResults() };
}

var accountSearchResults = React.createClass({
	getInitialState: function () {
		return getSearchResults();
	},
	componentWillMount: function () {
		accountStore.addChangeListener(this.onStoreChange);
	},
	componentWillUnmount: function () {
		accountStore.removeChangeListener(this.onStoreChange);
	},
	onStoreChange: function () {
		this.setState(getSearchResults());
	},
	render: function () {
		// todo - make a component for each result
		var results = this.state.results.map(function (result, idx) {
			return (
				<accountSearchResult key={result.id} result={result}/>
			);
		});

		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Name</th>
						<th>Domain</th>
						<th>Owner</th>
					</tr>
				</thead>
				<tbody>
              {results}
				</tbody>
			</table>
		);
	}
});
module.exports = accountSearchResults;
