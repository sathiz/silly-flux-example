/** @jsx React.DOM */
var Account = require('./account/shared/components/accountMain');
var React = require('react');

React.renderComponent(
	<Account />,
	document.getElementById('main')
);
