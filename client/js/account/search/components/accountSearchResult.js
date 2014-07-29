/** @jsx React.DOM */
var React = require('react');
var actions = require('../actions/accountSearchActions');

var cls = React.createClass({
	onClick: function (event) {
		if (!event) return;
		actions.requestAccount(this.props.account.id);
	},
	render: function () {
		var account = this.props.account;
		return (
			<tr onClick={this.onClick}>
				<td>{account.id}</td>
				<td>{account.name}</td>
				<td>{account.domainName}</td>
				<td>{account.owner}</td>
			</tr>
		);
	}
});
module.exports = cls;
