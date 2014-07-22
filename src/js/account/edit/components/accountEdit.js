/** @jsx React.DOM */
var React = require('react');
var accountEditStore = require('../stores/accountEditStore');
var errorView = require('../../shared/components/errorView');

function getStateFromStore() {
	return {
		error: accountEditStore.getAccountError(),
		account: accountEditStore.getAccount()
	};
}

var accountSearch = React.createClass({
	getInitialState: function () {
		return getStateFromStore();
	},
	componentWillMount: function () {
		accountEditStore.addChangeListener(this.onStoreChange);
	},
	componentWillUnmount: function () {
		accountEditStore.removeChangeListener(this.onStoreChange);
	},
	onStoreChange: function () {
		this.setState(getStateFromStore());
	},
	render: function () {
		var editor = (
			<div className="col-sm-4">
				<h1>Edit</h1>
				<errorView error={this.state.error} />
			</div>
		);

		if(!this.state.account) {
			editor = (
				<span></span>
			);
		}

		return editor;
	}
});
module.exports = accountSearch;
