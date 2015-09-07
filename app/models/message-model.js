var Model       = require("./db-model"),	//Load bookshelf model
    Promise     = require("bluebird");

module.exports = function() {

    /**
     * @function
     * @name getHistoryMessages
     * @description Gets message from the database.
     *
     * @param {Object} carrier: All the uncommitted created/updated/retrieved rows
     *
     * @return {Object - Promise}
     */
    this.getHistoryMessages = function (refObjects) {
        return new Promise(function(resolve, reject) {
            new Model.Message()
            .query(function(qb){
                qb.orderBy('datetime','ASC');
            })
            .fetchAll()
            .then(function(fetchedMessages) {
                resolve(fetchedMessages.toJSON());
            });
        });
    };

    /**
     * @function
     * @name addMessage
     * @description Adds message to the database.
     *
     * @param {Object} messageObject: Message data object to be saved
     *
     * @return {Object - Promise}
     */
    this.addMessage = function(messageObject) {
        console.log("ADDING MESSAGE");
        console.log(messageObject);
        return new Promise(function(resolve, reject) {
            new Model.Message(messageObject)
            .save()
            .then(function(savedMessage) {
                resolve(savedMessage);
            });
        });
    };
};
