var _ = require("lodash");

var onlineUsers = function() {

	this.users 	= [];

	this.addUser = function(user) {
		user.full_name = user.first_name + " " + user.last_name;
		this.users.push(user);
		_.sortBy(this.users, "full_name");
	};

	this.removeUser = function(user) {
		_.remove(this.users, "user_name", user.user_name);
	}

	this.getAllUsers = function() {
		return this.users;
	};

	this.getAllUsersString = function() {
		return JSON.stringify(this.users);
	};

	this.getUser = function(userName) {
		return this.users[_.findIndex(this.users, "user_name", userName)];
	};

	return this;
};

module.exports = onlineUsers;
