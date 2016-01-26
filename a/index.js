var root = require('root');
var github = require('github-auth');
var express = require('express');
var path = require('path');

var app = root();


var gh = github('2a900d9e9871c1b4c27f', '450c8bd04e582370a1de97206268c6aa3e07840b', {
  users: ['wathika']
});


app.get('/login', gh.login);


app.all('*', gh.authenticate);
app.all('*', function(req, res, next) {
  if (!req.github) return res.send('<a href="/login">Please login</a>');
  if (!req.github.authenticated) return res.send('You shall not pass');
  next();
});


// app.get('/', function(req, res) {
//   res.send('<h2>Hello World!</h2>');
// });

// app.get('/render', function(req, res) {
//     res.render('login', {title: 'res vs app render'})
// })


// app.use(express.static(path.join(__dirname, 'public')));
//
//
// app.get('/', function(req, res, next){
//     res.render('./login.html');
// });

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/login.html'));
  //__dirname : It will resolve to your project folder.
});

// app.get('/', function(req, res) {
//   res.render('login.html');
// });

app.listen(3000);
