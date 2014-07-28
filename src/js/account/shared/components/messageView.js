/** @jsx React.DOM */
var React = require('react');

var cls = React.createClass({
	propTypes: {
		close: React.PropTypes.func.isRequired,
		message: React.PropTypes.string
	},
	render: function () {
		if(!this.props.message) return (<span></span>);
		return (
			<div className="message-top bg-success" onClick={this.props.close}>
				<span>{this.props.message}</span>
				<button type="button" className="close" onClick={this.props.close}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
			</div>
		);
	}
});
module.exports = cls;
