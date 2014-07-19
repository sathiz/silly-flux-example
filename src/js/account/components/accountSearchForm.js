/** @jsx React.DOM */
var React = require('react');
var AccountStore = require('../stores/accountStore');
var AccountActions = require('../actions/accountActions');

function getLastSearch() {
	return {search: AccountStore.getLastSearch()};
}

var AccountSearch = React.createClass({
	getInitialState: function () {
		return getLastSearch();
	},
	componentWillMount: function () {
		AccountStore.addChangeListener(this._onStoreChange);
	},
	componentWillUnmount: function () {
		AccountStore.removeChangeListener(this._onStoreChange);
	},
	_onStoreChange: function () {
		this.setState(getLastSearch());
	},
	_onChange: function (event) {
		if (!event) return;
		this.setState({search: event.target.search});
	},
	_onKeyDown: function (event) {
		// search on enter key
		if (event && event.keyCode === 13)
			this._search();
	},
	_search: function() {
		console.log("_search, this.state:", this.state, "event:", event);
		AccountActions.searchAccounts(this.state.search);
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
					onChange={this._onChange}
					onKeyDown={this._onKeyDown}
					autoFocus={true}
					/>
				</div>
				<button type="submit" onClick={this._search} className="btn btn-primary">Search</button>
			</div>
		);
	}
});
module.exports = AccountSearch;
