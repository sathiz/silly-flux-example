/** @jsx React.DOM */
var React = require('react');
var accountSearchForm = require('../components/accountSearchForm');
var accountSearchResults = require('../components/accountSearchResults');

var app = React.createClass({
	render: function() {
		return <div>
			<h1>Search</h1>
			<accountSearchForm />
			<accountSearchResults />
		</div>
	}
});
module.exports = app;
