/** @jsx React.DOM */
var React = require('react');
var store = require('../stores/accountStore');
var accountSearch = require('../../search/components/accountSearch');
var accountEdit = require('../../edit/components/accountEdit');
var errorView = require('./errorView');
var messageView = require('./messageView');
var actions = require('../actions/accountSharedActions');

function getStateFromStore() {
	return {
		accountSelected: store.accountSelected,
		error: store.error,
		message: store.message
	};
}

var app = React.createClass({
	getInitialState: function () {
		return getStateFromStore();
	},
	shouldComponentUpdate: function(nextProps, nextState) {
		return this.state.accountSelected != nextState.accountSelected
			|| this.state.error != nextState.error
			|| this.state.message != nextState.message;
	},
	componentWillMount: function () {
		store.addChangeListener(this.onStoreChange);
	},
	componentWillUnmount: function () {
		store.removeChangeListener(this.onStoreChange);
	},
	onStoreChange: function () {
		this.setState(getStateFromStore());
	},
	clearErrorAndMessage: function() {
		actions.closeMessage();
	},
	render: function() {
		var messageOrError = <span></span>;
		if(this.state.error)
			messageOrError = <errorView error={this.state.error} close={this.clearErrorAndMessage}/>;
		if(this.state.message)
			messageOrError = <messageView message={this.state.message} close={this.clearErrorAndMessage}/>;

		if(!this.state.accountSelected) {
			return (
				<div>
					{messageOrError}
					<accountSearch />
				</div>
			);
		}
		return (
			<div>
				{messageOrError}
				<accountSearch />
				<accountEdit />
			</div>
		);
	}
});
module.exports = app;
