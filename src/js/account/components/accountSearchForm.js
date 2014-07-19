/** @jsx React.DOM */
var React = require('react');
var AccountStore = require('../stores/accountStore');
var AccountActions = require('../actions/accountActions');

var AccountSearch = React.createClass({
	getInitialState: function () {
		return {
			search: AccountStore.getLastSearch()
		};
	},
	componentWillMount: function () {
		AccountStore.addChangeListener(this.onStoreChange);
	},
	componentWillUnmount: function () {
		AccountStore.removeChangeListener(this.onStoreChange);
	},
	onStoreChange: function () {
		this.setState({
			search: AccountStore.getLastSearch()
		});
	},
	onChange: function (event) {
		if (!event) return;
		this.setState({search: event.target.value});
	},
	onKeyDown: function (event) {
		// search on enter key
		if (event && event.keyCode === 13)
			this.search();
	},
	search: function () {
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
module.exports = AccountSearch;
