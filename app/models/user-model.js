var Model       = require("./db-model"),	//Load bookshelf model
    Promise     = require("bluebird"),
    _           = require("lodash");

module.exports = function() {
    /**
     * @function
     * @name getUser
     * @description Gets user from the database.
     *
     * @param {String} userName: Username to fetch the user.
     *
     * @return {Object - Promise}
     */
    this.getUser = function (userName) {
        return new Promise(function(resolve, reject) {
            new Model.User({'user_name': userName})
            .fetch()
            .then(function(fetchedUser) {
                resolve(fetchedUser);
            });
        });
    };

    /**
     * @function
     * @name getUser
     * @description Gets user from the database.
     *
     * @param {String} userName: Username to fetch the user.
     *
     * @return {Object - Promise}
     */
    this.getUsers = function (userNames) {
        return new Promise(function(resolve, reject) {
            var usersModel = new Model.User();
            usersModel.query(function(qb) {
                qb.whereIn("user_name", userNames);
            })
            .fetchAll()
            .then(function (fetchedUsers) {
                var usersObject = {};
                _.each(fetchedUsers.toJSON(), function(user) {
                   usersObject[user.user_name] = user;
               });
               resolve(usersObject);
            });
        });
    };

    /**
     * @function
     * @name addUser
     * @description Adds user to the database.
     *
     * @param {Object} user: User data obect to be saved.
     *
     * @return {Object - Promise}
     */
    this.addUser = function(user) {
        return new Promise(function(resolve, reject) {
            new Model.User(user)
            .save()
            .then(function(savedUser) {
                resolve(savedUser);
            });
        });
    };
};
