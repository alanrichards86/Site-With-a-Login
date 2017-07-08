const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const path = require('path');
const session = require('express-session');
const validator = require('express-validator')

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());

app.use(session({
  secret: 'I Love Pie',
  resave: false,
  saveUninitialized: false
}));

app.get('/', function(req, res){
  if(!req.session.username && !req.session.password){
    res.redirect('/login');
  }else{
    res.render('main', {user: req.session});
  }

});

app.get('/login', function(req, res){

  if(req.session.username) {
    res.redirect('/');
  }else {
    res.render('login', {errors: messages});

    console.log(req.body);
  }

});

let messages = [];
app.post('/login', function(req, res){
  messages = [];
  console.log(req.body);
  req.checkBody('username', 'Please enter valid information').notEmpty();
  req.checkBody('password', 'Please enter valid information').notEmpty();

  let errors = req.validationErrors();

  if(errors) {
    errors.forEach(function(error){
      messages.push(error.msg);
      res.redirect('/login');
    });
  }else {
      req.session.username = req.body.username
      req.session.password = req.body.password
      console.log(req.session);
      res.redirect('/');

  }


});

app.listen(3000, function(req, res){
  console.log('Party Time !');
});
