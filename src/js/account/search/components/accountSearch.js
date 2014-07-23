/** @jsx React.DOM */
var React = require('react');
var accountSearchForm = require('./accountSearchForm');
var accountSearchResults = require('./accountSearchResults');
var store = require('../stores/accountSearchStore');

function getStateFromStore() {
	return {
		accountSelected: store.accountSelected
	};
}

var accountSearch = React.createClass({
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
	render: function () {
		return (
			<div className={this.state.accountSelected ? "col-sm-7" : "col-sm-12"}>
				<h1>Search Accounts</h1>
				<accountSearchForm />
				<accountSearchResults />
			</div>
		);
	}
});
module.exports = accountSearch;
