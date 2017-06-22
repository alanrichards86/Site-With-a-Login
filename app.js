const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const path = require('path');
const session = require('express-session');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: 'I Love Pie',
  resave: false,
  saveUninitialized: false
}));

app.get('/', function(req, res){
  if(!req.session.username){
    res.redirect('/login');
  }else{
    res.render('main');
  }

});

app.get('/login', function(req, res){
  if(req.session.username) {
    res.redirect('/');
  }else {
    res.render('login');
    console.log(req.body);
  }

});

app.get('/userInfo', function(req, res){
  res.render('user-info');
});

app.post('/userInfo', function(req, res){
  console.log(req.body);
  req.session.username = req.body.username
  res.redirect('/userInfo');
});








app.listen(3000, function(req, res){
  console.log('Party Time !');
});
