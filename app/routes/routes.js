module.exports = function(express, app, passport) {
	var config = require("../../config/development.js"),
		router = express.Router();

	//Home page
	router.get("/", function(req, res) {
		res.redirect("/signin");
	});

	//Login page
	router.get("/signin", function(req, res) {
		res.render("signin", {message: req.flash("signinMessage")});
	});
	//Process Signin form
	router.post("/signin", passport.authenticate('local-signin', {
		successRedirect: '/chatroom',
		failureRedirect: '/signin'
	}));

	//Signup page
	router.get("/signup", function(req, res) {
		res.render("signup", {message: req.flash("signupMessage")});
	});
	//Process Signup form
	router.post("/signup", passport.authenticate('local-signup', {
		successRedirect: '/signin',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	//Profile page
	router.get("/profile", isLoggedIn, function(req, res) {
		res.render("profile", {user: req.user, message: req.flash("profileMessage")});
	});

	//Classroom Chat page
	router.get("/chatroom", isLoggedIn, function(req, res) {
		res.render("chatroom", {user:req.user, config: config});
	});

	//Process logout
	router.get("/signout", function(req, res) {
		req.logout();
		res.redirect("/signin");
	});

	app.use(router);
};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/signin");
	}
}
