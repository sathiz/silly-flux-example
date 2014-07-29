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
	saveEdit: function(e) {
		e.preventDefault();
		actions.saveEdit(this.state.account);
		return false;
	},
	onChange: function(e) {
		this.state.account.ownerId = parseInt(event.target.value);
		this.setState({account: this.state.account});
	},
	render: function() {
		var account = this.state.account;
		if(!account)
			return (<span></span>);

		var possibleOwners = account.users.map(function (user) {
			var selected = user.id == account.ownerId ? 'selected' : '';
			return (
				<option key={user.id} value={user.id}>{user.name} &lt;{user.email}&gt;</option>
			);
		});

		// if nothing has changed or there's only 1 admin
		var formDisabled = account.ownerId == account.lastOwnerId;
		var ownerSelectDisabled = account.users.length === 1;

		var note = '';
		if(ownerSelectDisabled)
			note = "There's only 1 user in this account, so you can't make anyone else an owner.";

		return  (
			<div className="col-sm-5">
				<h2>Change Owner</h2>
				<button type="button" className="close" onClick={this.abandonEdit}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
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
						<button type="submit" className="btn btn-primary" disabled={formDisabled}>Save</button>
					</div>
				</form>
			</div>
		);
	}
});
module.exports = cls;
