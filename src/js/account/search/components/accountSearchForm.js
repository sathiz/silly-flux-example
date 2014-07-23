/** @jsx React.DOM */
var React = require('react');
var store = require('../stores/accountSearchStore');
var actions = require('../actions/accountSearchActions');

function getLastSearch() {
	return { search: accountSearchStore.getLastSearch() };
}

var cls = React.createClass({
	getInitialState: function () {
		return getLastSearch();
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
		// update search state as the input changes
		this.setState({ search: event.target.value });
	},
	onKeyDown: function (event) {
		// search on enter key
		if (event && event.keyCode === 13)
			this.search();
	},
	search: function () {
		actions.searchAccounts(this.state.search);
	},
	render: function () {
		return (
			<div className="form-inline">
				<div className="form-group">
					<label className="sr-only" htmlFor="inputSearch">Search</label>
					<input type="text" className="form-control" id="inputSearch" placeholder="Search" value={this.state.search}
						onChange={this.onChange} onKeyDown={this.onKeyDown} autoFocus={true} />
				</div>
				<button className="btn btn-primary" type="submit" onClick={this.search}>Search</button>
			</div>
		);
	}
});
module.exports = cls;
