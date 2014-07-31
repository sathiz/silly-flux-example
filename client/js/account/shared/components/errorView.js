/** @jsx React.DOM */
var React = require('react');

var cls = React.createClass({
	propTypes: {
		close: React.PropTypes.func.isRequired,
		error: React.PropTypes.string
	},
	render: function () {
		if(!this.props.message) return (<span></span>);
		return (
			<div className="message-top bg-danger" onClick={this.props.close}>
				<p>{this.props.message}</p>
				<button type="button" className="close" onClick={this.props.close}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
			</div>
		);
	}
});
module.exports = cls;
