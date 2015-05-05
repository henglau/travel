var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//添加依赖模块,并设置视图母版.
var handlebars=require('express3-handlebars').create({defaultLayout:'main'});

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//设置视图引擎为handlebars
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('404  Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 404);
//     res.render('404');
//   });
// }

// 错误(404,500)的处理
app.use(function(req, res, next) {
  res.status(404);
  res.render('404');
});
app.use(function(err, req, res, next) {
  res.status(500);
  res.render('500');
});


module.exports = app;
