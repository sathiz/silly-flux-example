/** @jsx React.DOM */
var React = require('react');
var accountStore = require('../stores/accountStore');
var accountSearch = require('../../search/components/accountSearch');
var accountEdit = require('../../edit/components/accountEdit');

function getStateFromStore() {
	return {
		accountSelected: accountStore.getAccountSelected()
	};
}

var app = React.createClass({
	getInitialState: function () {
		return getStateFromStore();
	},
	componentWillMount: function () {
		accountStore.addChangeListener(this.onStoreChange);
	},
	componentWillUnmount: function () {
		accountStore.removeChangeListener(this.onStoreChange);
	},
	onStoreChange: function () {
		this.setState(getStateFromStore());
	},
	render: function() {
		if(!this.state.accountSelected) {
			return (
				<div>
					<accountSearch />
				</div>
			);
		}
		return (
			<div>
				<accountSearch />
				<accountEdit />
			</div>
		);
	}
});
module.exports = app;
