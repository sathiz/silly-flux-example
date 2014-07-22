/** @jsx React.DOM */
var Account = require('./account/search/components/accountMain');
var React = require('react');

React.renderComponent(
	<Account />,
	document.getElementById('main')
);
