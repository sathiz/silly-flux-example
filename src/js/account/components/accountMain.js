/** @jsx React.DOM */
var React = require('react');
var AccountSearchForm = require('../components/accountSearchForm');
var AccountSearchResults = require('../components/accountSearchResults');

var App = React.createClass({
	render: function() {
		return <div>
			<h1>Search</h1>
			<AccountSearchForm />
			<AccountSearchResults />
		</div>
	}
});
module.exports = App;
