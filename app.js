var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const dotenv = require('dotenv')
const userAgent = require('express-useragent')
const chalk = require('chalk')

const checkAuth = require('./utils/checkAuth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

dotenv.config();

app.use(cors())
app.use(userAgent.express())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client_build')));
app.use(express.static(path.join(__dirname, 'client_mobile')));

// app.get('*', express.static(path.resolve(__dirname, 'client_build')))
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/auth', authRouter);
// app.use(checkAuth)
app.get('*', (req, res) => {
  console.log(chalk.magentaBright('USER_AGENT'), req.useragent);
  if(req.useragent.isMobile) {
    res.sendFile(path.join(__dirname, 'client_mobile', 'index.html'))
  } else {
    res.sendFile(path.join(__dirname, 'client_build', 'index.html'))
  }

})
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
