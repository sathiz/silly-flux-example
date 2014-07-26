/** @jsx React.DOM */
var React = require('react');
var store = require('../stores/accountEditStore');
var actions = require('../actions/accountEditActions');

function getStateFromStore() {
	return {
		account: store.account
	};
}

var cls = React.createClass({
	getInitialState: function () {
		return getStateFromStore();
	},
	shouldComponentUpdate: function(nextProps, nextState) {
		return this.state.account != nextState.account;
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
	abandonEdit: function() {
		actions.abandonEdit();
	},
	saveEdit: function() {
		actions.saveEdit(this.state.account);
		return false;
	},
	onChange: function(event) {
		this.state.account.ownerId = event.target.value;
		this.setState({account: this.state.account});
	},
	render: function() {
		var account = this.state.account;
		if(!account)
			return (<span></span>);

		var possibleOwners = account.teamMembers.map(function (user) {
			var selected = user.administratorId == account.ownerId ? 'selected' : '';
			return (
				<option key={user.administratorId} value={user.administratorId}>{user.administratorName} &lt;{user.administratorEmail}&gt;</option>
			);
		});

		// if nothing has changed or there's only 1 admin
		var formDisabled = account.ownerId == account.lastOwnerId;

		var ownerSelectDisabled = account.teamMembers.length === 1;

		var note = '';
		if(ownerSelectDisabled)
			note = "There's only 1 Administrator in this account, so you can't make anyone else an owner.";

		return  (
			<div className="col-sm-5">
				<h2>Change Owner</h2>
				<span>{note}</span>
				<p>Account: {account.domainName} ({account.name})</p>
				<form className="form-vertical" onSubmit={this.saveEdit}>
					<div className="form-group">
						<label className="sr-only" htmlFor="selectOwner">Owner</label>
						<select name="selectOwner" value={account.ownerId} onChange={this.onChange} disabled={ownerSelectDisabled}>
						{possibleOwners}
						</select>
					</div>
					<div className="form-group">
						<button type="button" className="btn" onClick={this.abandonEdit}>Close</button>
						<button type="submit" className="btn btn-primary" disabled={formDisabled}>Save</button>
					</div>
				</form>
			</div>
		);
	}
});
module.exports = cls;
