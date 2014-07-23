/** @jsx React.DOM */
var React = require('react');

var cls = React.createClass({
	render: function () {
		var error = this.props.error;
		if(!error) return (<span></span>);

		return (
			<div className="error">{error}</div>
		);
	}
});
module.exports = cls;
