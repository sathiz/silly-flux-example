/** @jsx React.DOM */
var React = require('react');
var accountSearch = require('../../search/components/accountSearch');
var accountEdit = require('../../edit/components/accountEdit');

var app = React.createClass({
	render: function() {
		return (
			<div>
				<accountSearch />
				<accountEdit />
			</div>
		);
	}
});
module.exports = app;
