var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var testAPIRouter = require('./routes/testAPI');
var apiTreeRouter = require('./routes/apiTree');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/testAPI', testAPIRouter);
app.use('/api/tree', apiTreeRouter);

app.use((req, res, next) => {
    let link = req.path;
    num = link.indexOf('/');

    counter = 0;
    while (num != -1 && counter < 2){
        num = link.indexOf('/', num+1);
        counter++;
    }
    if (counter <= 2 && num == -1){
        num = link.length;
    }
    let arr = link.slice(0, num).split('/');
    if (arr.length <=2 ){
        res.sendStatus('404');
    }
    let obj = {'user': arr[1], 'repo': arr[2]};
    res.send(obj);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
