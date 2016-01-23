var root = require('root');
var github = require('github-auth');
var app = root();


var gh = github('56d3b718497c147e3828', 'f10210d9e68b38bed3fea2c86bb727c58b8a932a', {
  users: ['wathika']
});


app.get('/login', gh.login);


app.all('*', gh.authenticate);
app.all('*', function(req, res, next) {
  if (!req.github) return res.send('<a href="/login">Please login</a>');
  if (!req.github.authenticated) return res.send('You shall not pass');
  next();
});


app.get('/', function(req, res) {
  res.send('<h2>Hello World!</h2>');
});


app.listen(3000);
