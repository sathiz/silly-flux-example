/** @jsx React.DOM */
var React = require('react');
var store = require('../stores/accountStore');
var accountSearch = require('../../search/components/accountSearch');
var accountEdit = require('../../edit/components/accountEdit');
var errorView = require('./errorView');
var messageView = require('./messageView');

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
	componentWillMount: function () {
		store.addChangeListener(this.onStoreChange);
	},
	componentWillUnmount: function () {
		store.removeChangeListener(this.onStoreChange);
	},
	onStoreChange: function () {
		this.setState(getStateFromStore());
	},
	render: function() {
		var messageOrError = <span></span>;
		if(this.state.error)
			messageOrError = <errorView error={this.state.error}/>;
		if(this.state.message)
			messageOrError = <messageView message={this.state.message}/>;

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
