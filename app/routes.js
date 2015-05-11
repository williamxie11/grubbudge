module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.redirect('/login.html');
	})

	app.get('/signup', function(req, res) {
		res.redirect('/signup.html');
	});

	app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
		res.redirect('/#/home');
	});

	app.get('/login', function(req, res) {
		res.redirect('/login.html');
	});

	app.post('/login', passport.authenticate('local-login',
	{
		successRedirect: '/#/home',
    failureRedirect: '/signup'
	}));

	app.get('/profile', isLoggedIn, function(req, res) {
		res.json({
			user: req.user
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login.html');
	});

	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated())
			return next();

		return function(req, res) { res.redirect('/login.html'); }
	}

};
