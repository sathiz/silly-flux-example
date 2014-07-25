/** @jsx React.DOM */
var React = require('react');

var cls = React.createClass({
	render: function () {
		var message = this.props.message;
		if(!message) return (<span></span>);

		return (
			<div className="message">{message}</div>
		);
	}
});
module.exports = cls;
