/** @jsx React.DOM */
var React = require('react');

var searchResult = React.createClass({
	componentWillMount: function () {
		//
	},
	componentWillUnmount: function () {
		//
	},
	render: function () {
		var result = this.props.result;
		return (
			<tr>
				<td>{result.name}</td>
				<td>{result.domainName}</td>
				<td>{result.owner}</td>
			</tr>
		);
	}
});
module.exports = searchResult;
