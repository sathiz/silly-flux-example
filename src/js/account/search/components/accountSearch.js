/** @jsx React.DOM */
var React = require('react');
var accountSearchForm = require('./accountSearchForm');
var accountSearchResults = require('./accountSearchResults');
var accountSearchStore = require('../../shared/stores/accountStore');
var errorView = require('../../shared/components/errorView');

function getStateFromStore() {
	return {
		error: accountSearchStore.getSearchError()
	};
}

var accountSearch = React.createClass({
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
	render: function () {
		return (
			<div className="col-sm-8">
				<h1>Search Accounts</h1>
				<accountSearchForm />
				<errorView error={this.state.error} />
				<accountSearchResults />
			</div>
		);
	}
});
module.exports = accountSearch;
