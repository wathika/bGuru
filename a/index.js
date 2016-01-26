var root = require('root');
var github = require('github-auth');
var express = require('express');
var path = require('path');

// var app = root();
var app = express();


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


app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.

app.get('/',function(req,res){
  res.sendFile('index.html');
  //It will find and locate index.html from View or Scripts
});

app.get('/about',function(req,res){
  res.sendFile('/about.html');
});

app.get('/sitemap',function(req,res){
  res.sendFile('/sitemap.html');
});

app.listen(3000);

console.log("Running at Port 3000");
