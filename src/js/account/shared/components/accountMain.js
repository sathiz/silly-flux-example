/** @jsx React.DOM */
var React = require('react');
var store = require('../stores/accountStore');
var accountSearch = require('../../search/components/accountSearch');
var accountEdit = require('../../edit/components/accountEdit');

function getStateFromStore() {
	return {
		accountSelected: store.accountSelected()
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
