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
	shouldComponentUpdate: function(nextProps, nextState) {
		return this.state.accountSelected != nextState.accountSelected;
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
				<h2>Search Accounts</h2>
				<accountSearchForm />
				<accountSearchResults />
			</div>
		);
	}
});
module.exports = accountSearch;
