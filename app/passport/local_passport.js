var LocalStrategy	= require("passport-local").Strategy,	//Load local strategy
	UserModel		= require("../models/user-model"),			//Load bookshelf model
	bcrypt			= require("bcrypt-nodejs");

module.exports = function (passport) {

	//serialize the user for the session
	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	//deserialize user from the session
	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

	//define local signup strategy
	passport.use(
		"local-signup",
		new LocalStrategy(
			{
				usernameField: "username",
				passwordField: "password",
				passReqToCallback: true
			},
			function(req, username, password, done) {
				process.nextTick(function() {

					new UserModel()
					.getUser(username)
					.then(function(fetchedUser) {
						if(!!fetchedUser) {
							return done(null, false, req.flash("signupMessage", "The user '" + username + "' already exists."));
						} else {
							//create a new user
							var newUser = {
								'first_name':	req.body.firstname,
								'last_name': 	req.body.lastname,
								'user_name': 	username,
								'password': 	bcrypt.hashSync(password)
							};

							new UserModel()
							.addUser(newUser)
							.then(function (savedUser) {
								return done(null, savedUser)
							})
							.catch(function(err) {
								console.error("Error while saving user: " + JSON.stringify(err));
							});
						}
					});
				});
			}
		)
	);

	//define local signin strategy
	passport.use(
		"local-signin",
		new LocalStrategy(
			{
				usernameField: "username",
				passwordField: "password",
				passReqToCallback: true
			},
			function(req, username, password, done) {

				new UserModel()
				.getUser(username)
				.then(function(fetchedUser) {
					if(!fetchedUser) {
						//user does not exist
						return done(null, false, req.flash("signinMessage", "User '" + username + "' does not exist."));
					} else {
						fetchedUser = fetchedUser.toJSON();
						if(!bcrypt.compareSync(password, fetchedUser.password)) {
							//user is found, but password is incorrect
							return done(null, false, req.flash("signinMessage", "Password is incorrect."));
						} else {
							//return found user
							return done(null, fetchedUser);
						}
					}
				})
				.catch(function(err) {
					console.error("Error while loading user: " + JSON.stringify(err));
				});
			}
		)
	);
};
