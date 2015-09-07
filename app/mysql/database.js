var config = require("../../config/development"),
    fs  = require("fs");

var knex = require("knex")({
   client: 'mysql',
   connection: {
	   host: 		config.db.url,  // your host
	   user: 		config.db.username, // your database user
	   password: 	config.db.password, // your database password
	   database: 	config.db.databasename
   }
});

module.exports.bookshelf 	= require('bookshelf')(knex);

module.exports.knex			= knex;

module.exports.init = function(fileName) {

    knex.schema
    .hasTable('user')
    .then(function(exists) {
        if(!exists) {
            // Extract SQL queries from files. Assumes no ';' in the fileNames
            var queries = fs.readFileSync(fileName).toString()
                .split(/(\r\n|\n|\r)/gm)
                .map(Function.prototype.call, String.prototype.trim)
                .filter(function(el) {return (el.length != 0) && (el.indexOf("--") != 0) && (el.indexOf("/\*") != 0)}) // remove comments
                .join(" ")
                .replace(/(\r\n|\n|\r)/gm," ") // remove newlines
                .replace(/\s+/g, ' ') // excess white space
                .split(";") // split into all statements
                .filter(function(el) {return (el.length != 0)}) // remove empty strings

            function recursivelyExecute(index) {
                console.log(queries[index]);
                knex.raw(queries[index++])
                .then(function(err, result) {
                    if(index < queries.length) {
                        recursivelyExecute(index);
                    }
                });
            };
            recursivelyExecute(0);
        }
    });
};
