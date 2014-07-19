/** @jsx React.DOM */
var React = require('react');
var AccountStore = require('../stores/accountStore');

var AccountSearch = React.createClass({
	getInitialState: function () {
		return { results: AccountStore.getSearchResults() };
	},
	componentWillMount: function () {
		AccountStore.addChangeListener(this.onStoreChange);
	},
	componentWillUnmount: function () {
		AccountStore.removeChangeListener(this.onStoreChange);
	},
	onStoreChange: function () {
		this.setState({ results: AccountStore.getSearchResults() });
	},
	render: function () {
		// todo - make a component for each result
		var results = this.state.results.map(function (result, idx) {
			return (
				<tr>
					<td>{result.name}</td>
					<td>{result.domainName}</td>
					<td>{result.owner}</td>
				</tr>
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
module.exports = AccountSearch;
