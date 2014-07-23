/** @jsx React.DOM */
var accountMain = require('./account/shared/components/accountMain');
var React = require('react');

React.renderComponent(
	<accountMain />,
	document.getElementById('main')
);
