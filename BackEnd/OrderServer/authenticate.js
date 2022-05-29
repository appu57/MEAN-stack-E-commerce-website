var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Users = require('./models/user');
var config=require('../config');

var ExtractJwt=require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;
var jsonwebtoken= require('jsonwebtoken');



exports.local = passport.use(new LocalStrategy({
  usernameField:'Email',
  passwordField: 'password'//The findOne() takes a condition and a function 
},function(username, password, done) {
  Users.findOne({ username: username }, function(err, user) {

    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    if(user){return done(null,user);}

  });
}));
  

exports.getToken=(user)=>{
  return jsonwebtoken.sign(user,config.secretKey,{expiresIn:3600});
}

var opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
 console.log(jwt_payload);
 Users.findOne({_id:jwt_payload._id},(err,user)=>{
   if(err){
     return done(err,false);
   }
   if(!user){
     return done(null,false);
   }
   else if(user){
     return done(null,user);
   }
 })
}))

// exports.verifyUser = passport.authenticate('jwt',{session:false})

exports.verifyUser=(req,res,next)=>{
  var token =req.body.token || req.query.token ||req.headers['x-access-token'];
  if(token){
    jsonwebtoken.verify(token,config.secretKey,(err,user)=>{
      if(err){
        var err = new Error('You are not authenticated');
        err.status=403;
        return next(err);
      }
      else{
        req.user=user;
        next();
      }
    })
  }
  else{
    var err = new Error('No token');
        err.status=403;
        return next(err);
  }
};

exports.verifyAdmin= (req,res,next)=>{
       if(req.user.admin){
         next();
       }
       else{
        var err = new Error('You are not authenticated');
        err.status=403;
        return next(err);
       }
}

passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());
































//If we use passport it will take the strategy to use either local strategy or jwtstrategy and that strategy will take a value and callbackfunction