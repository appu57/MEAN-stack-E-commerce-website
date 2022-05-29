var express = require('express');
var router = express.Router();
const BodyParser = require('body-parser');
const User = require('../models/user');
const passport = require('passport');
const config = require('../../config');
var authenticate = require('../authenticate');


router.use(BodyParser.json());

/* GET users listing. */
router.get('/signup', authenticate.verifyUser,function (req, res, next) {
  User.find({})
    .then((Users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(Users)
    })
});

router.delete('/signup', function (req, res, next) {

  User.remove(req.body)
    .then((Users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(Users);
    })
});
router.post('/signup', (req, res, next) => {
  if (config.AdminCode === req.body.Username && config.AdminPassword === req.body.password) {
    User.register({
      username: req.body.Email,
      password: req.body.password,
      Username: req.body.Username,
      Age: req.body.Age,
      City: req.body.City,
      State: req.body.State,
      Email: req.body.Email,
      Admin: req.body.Admin
    }, req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err, status: 'Unable to add' });
      }
      else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          success: true,
          status: 'Registration Successful!'
        });

      }
    })
  }
  else {
    User.register({
      username: req.body.Email,
      password: req.body.password,
      Username: req.body.Username,
      Age: req.body.Age,
      City: req.body.City,
      State: req.body.State,
      Email: req.body.Email
    }, req.body.password, (err, user) => {
      console.log(err)
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err, status: 'Unable to add' });
      }
      else {
        //{"Username":"err","password":"err","Age":"err","City":"err","State":"err","Email":"err"}
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({
            success: true,
            status: 'Registration Successful!'
          });
        });
      
      }
    });
  }});

router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });

  User.find(req.body).then((user) => {


    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ status: 'Logged in', token: token, user: user });
  })
});


router.get('/logout', (req, res, next) => {
  if (req.session) {
    console.log(req.session);
    req.session.destroy();
    res.clearCookie('session-id');
    res.json({ status: 'You are logged out' })
  }
});


router.post('/admin', (req, res, next) => {
  if (config.AdminCode === req.body.Username && config.AdminPassword === req.body.password) {
    User.register({
      username: req.body.Email,
      password: req.body.password,
      Username: req.body.Username,
      Age: req.body.Age,
      City: req.body.City,
      State: req.body.State,
      Email: req.body.Email,
      Admin: req.body.Admin
    }, req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err, status: 'Unable to add' });
      }
      else {
        //{"Username":"err","password":"err","Age":"err","City":"err","State":"err","Email":"err"}
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          success: true,
          status: 'Registration Successful!'
        });

      }
    })
  }
  else {
    var err = new Error('No Access');
    err.statusCode = 401;
    return next(err);

  }

});





router.get('/getadmin', (req, res, next) => {
  User.find({ Admin: "true" })
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    })
});

module.exports = router;

