var express = require('express');
var router = express.Router();
const BodyParser = require('body-parser');
const User = require('../models/user');
const passport = require('passport');

router.use(BodyParser.json());

/* GET users listing. */
router.get('/signup', function (req, res, next) {
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
  const { Username, password, Age, City, State, Email } = req.body;

  User.register({
    username: req.body.Email,
    password: req.body.password,
    Username: req.body, Username,
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
        console.log("2nd log", res)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          success: true,
          status: 'Registration Successful!'
        });
      });

    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {

  User.find(req.body).then((user) => {

  
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ status: 'Logged in' , user:user});
  })
});


router.get('/logout', (req, res, next) => {
  if (req.session) {
    console.log(req.session);
    req.session.destroy();
    res.clearCookie('session-id');
  }
})

module.exports = router;

