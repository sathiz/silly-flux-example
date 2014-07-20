/** @jsx React.DOM */
var React = require('react');
var accountStore = require('../stores/accountStore');
var accountActions = require('../actions/accountActions');

function getLastSearch() {
	return { search: accountStore.getLastSearch() };
}

var accountSearch = React.createClass({
	getInitialState: function () {
		return getLastSearch();
	},
	componentWillMount: function () {
		accountStore.addChangeListener(this.onStoreChange);
	},
	componentWillUnmount: function () {
		accountStore.removeChangeListener(this.onStoreChange);
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
		accountActions.searchAccounts(this.state.search);
	},
	render: function () {
		return (
			<div className="form-inline">
				<div className="form-group">
					<label className="sr-only" htmlFor="inputSearch">Search</label>
					<input type="text"
					className="form-control"
					id="inputSearch"
					placeholder="Search"
					value={this.state.search}
					onChange={this.onChange}
					onKeyDown={this.onKeyDown}
					autoFocus={true}
					/>
				</div>
				<button className="btn btn-primary" type="submit" onClick={this.search}>Search</button>
			</div>
		);
	}
});
module.exports = accountSearch;
