/** @jsx React.DOM */
var Account = require('./account/components/accountMain');
var React = require('react');

React.renderComponent(
	<Account />,
	document.getElementById('main')
);
