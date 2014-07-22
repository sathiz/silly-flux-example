/** @jsx React.DOM */
var React = require('react');
var accountStore = require('../../shared/stores/accountStore');
var errorView = require('../../shared/components/errorView');

function getStateFromStore() {
	return {
		error: accountStore.getAccountError(),
		account: accountStore.getAccount()
	};
}

var accountSearch = React.createClass({
	getInitialState: function () {
		return getStateFromStore();
	},
	componentWillMount: function () {
		accountStore.addChangeListener(this.onStoreChange);
	},
	componentWillUnmount: function () {
		accountStore.removeChangeListener(this.onStoreChange);
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
