/** @jsx React.DOM */
var React = require('react');
var store = require('../stores/accountEditStore');

function getStateFromStore() {
	return {
		account: store.getAccount()
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
		return  (
			<div className="col-sm-5">
				<h1>Edit</h1>
			</div>
		);
	}
});
module.exports = accountSearch;
