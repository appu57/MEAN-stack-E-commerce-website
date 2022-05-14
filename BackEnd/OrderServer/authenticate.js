var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Users = require('./models/user');


exports.local = passport.use(new LocalStrategy({
  usernameField:'Email',
  passwordField: 'password'
},

//The findOne() takes a condition and a function 

function(username, password, done) {
  Users.findOne({ username: username }, function(err, user) {

    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    if(user){return done(null,user);}

  });
}));
  
  
      passport.serializeUser(Users.serializeUser());
      passport.deserializeUser(Users.deserializeUser());
