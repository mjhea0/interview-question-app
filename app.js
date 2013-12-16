// dependecies
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users = require('./models/Users').Users;
var path = require('path');
var routes = require('./routes');
var api = require('./routes/api');
var app = express();

// passport local auth
passport.use(new LocalStrategy(function(username, password, done) {
	var users = new Users();
	users.authenticate(username, password, function(error, user) {
		if (error) {
			return done(error);
		}

		if (!user) {
			return done(null, false, { message: 'Incorrect password.' });
		}

		return done(null, user);
	});
}));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	var users = new Users();
	users.getById(id, function(error, user) {
		done(error, user);
	});
});

var auth = function(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	}
	else {
		res.send(401);
	}
};

// config - all environments
app.set('port', process.env.PORT || 1337);
app.set('views', path.join(__dirname, 'views'));
app.set('view options', {layout : false, pretty : true});
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('you-325sdsf69-will-4ddde2-never-8fc-e92ddd5cb708-know'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// config - development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

app.post('/login', passport.authenticate('local'), routes.login);
app.post('/logout', routes.logout);

app.get('/api/questions', api.questionsController.getAll);
app.get('/api/questions/:id', api.questionsController.getById);
app.get('/api/questions/:questionId/answers', api.answersController.getForQuestion);
app.get('/api/tags', api.questionsController.getAllTags);
app.get('/api/questions/tagged/:tag', api.questionsController.getByTag);
app.post('/api/questions', auth, api.questionsController.addQuestion);
app.post('/api/questions/:questionId/answers', auth, api.answersController.addAnswer);

app.get('/api/users', api.usersController.getAll);
app.get('/api/users/:id', api.usersController.getById);
app.get('/api/users/:id/questions', api.questionsController.getByUserId);
app.get('/api/users/:id/answers', api.answersController.getForUser);
app.post('/api/users', api.usersController.addUser);

// run server
app.listen(app.get('port'), function(){
  console.log('\nListening on port ' + app.get('port'));
});
