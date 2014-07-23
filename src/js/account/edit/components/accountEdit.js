/** @jsx React.DOM */
var React = require('react');
var store = require('../stores/accountEditStore');
var actions = require('../actions/accountEditActions');

function getStateFromStore() {
	return {
		account: store.account
	};
}

var cls = React.createClass({
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
	abandonEdit: function() {
		actions.abandonEdit();
	},
	render: function () {
		return  (
			<div className="col-sm-5">
				<h1>Edit</h1>
				<pre>Debug: {JSON.stringify(this.state.account)}</pre>
				<button type="button" className="btn" onClick={this.abandonEdit}>Cancel</button>
			</div>
		);
	}
});
module.exports = cls;
