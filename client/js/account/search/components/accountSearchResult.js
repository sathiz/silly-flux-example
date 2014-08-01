/** @jsx React.DOM */
var React = require('react');
var actions = require('../actions/accountSearchActions');

var ENTER_KEY_CODE = 13;

var cls = React.createClass({
	onClick: function (event) {
		if (!event) return;
		actions.requestAccount(this.props.account.id);
	},
	onKeyDown: function(event) {
		console.log('onKeyDown');
		if (!event || event.keyCode !== ENTER_KEY_CODE) return;
		actions.requestAccount(this.props.account.id);
	},
	render: function () {
		var account = this.props.account;
		return (
			<tr onClick={this.onClick} tabIndex={this.props.tabIndex} onKeyDown={this.onKeyDown}>
				<td>{account.id}</td>
				<td>{account.name}</td>
				<td>{account.domainName}</td>
				<td>{account.owner}</td>
			</tr>
		);
	}
});
module.exports = cls;
