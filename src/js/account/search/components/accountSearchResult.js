/** @jsx React.DOM */
var React = require('react');
var accountSearchActions = require('../actions/accountSearchActions');

var searchResult = React.createClass({
	onClick: function (event) {
		if (!event) return;
		accountSearchActions.requestAccount(this.props.account.id);
	},
	render: function () {
		var account = this.props.account;
		return (
			<tr onClick={this.onClick}>
				<td>{account.name}</td>
				<td>{account.domainName}</td>
				<td>{account.owner}</td>
			</tr>
		);
	}
});
module.exports = searchResult;
