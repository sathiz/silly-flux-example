/** @jsx React.DOM */
var React = require('react');
var store = require('../stores/accountSearchStore');
var actions = require('../actions/accountSearchActions');

function getLastSearch() {
	return { search: store.lastSearch };
}

var cls = React.createClass({
	getInitialState: function () {
		return getLastSearch();
	},
	shouldComponentUpdate: function(nextProps, nextState) {
		return this.state.search != nextState.search;
	},
	componentWillMount: function () {
		store.addChangeListener(this.onStoreChange);
	},
	componentWillUnmount: function () {
		store.removeChangeListener(this.onStoreChange);
	},
	onStoreChange: function () {
		this.setState(getLastSearch());
	},
	onChange: function (event) {
		if (!event) return;
		this.setState({ search: event.target.value });
	},
	onKeyDown: function (event) {
		// search on enter key
		if (event && event.keyCode === 13)
			this.search();
	},
	search: function () {
		actions.searchAccounts(this.state.search);
		return false;
	},
	render: function () {
		return (
			<form className="form-inline" onSubmit={this.search}>
				<div className="form-group">
					<label className="sr-only" htmlFor="inputSearch">Search</label>
					<input type="text" className="form-control" id="inputSearch" placeholder="Search" value={this.state.search}
						onChange={this.onChange} onKeyDown={this.onKeyDown} autoFocus={true} />
				</div>
				<button className="btn btn-primary" type="submit">Search</button>
			</form>
		);
	}
});
module.exports = cls;
