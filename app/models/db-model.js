var database 	= require('../mysql/database'),
	bookshelf 	= database.bookshelf,
	knex		= database.knex;

var User = bookshelf.Model.extend({
   tableName: 'user'
});

var Message = bookshelf.Model.extend({
   tableName: 'message'
});

module.exports = {
   User: User,
   Message: Message,
   knex: knex
};
