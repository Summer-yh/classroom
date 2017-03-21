/// 模块依赖
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pool = require('./model/db');
var index = require('./routes/index');
var video = require('./routes/video');
var admin = require('./routes/admin');
var login = require('./routes/login');
var handlebars = require('express-handlebars');
var app = express();

/// 默认布局
app.engine('html', handlebars({
    defaultLayout: 'layout',
    extname: '.html'
}));
app.set('view engine', 'html');

///环境变量
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));///设置静态文件目录

///路径解析
app.use('/PartyLecture', index);
app.use('/admin', admin);
app.use('/videoWatching', video);
app.use('/login', login);
// app.use('/static', express.static('public'));

/// catch 404 and forwarding to error handler
/// 捕获404错误并且跳到error处理
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
///开发模式下的错误处理
/// development error handler
/// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
        layout:false,
            message: err.message,
            error: err
        });
    });
}


/// production error handler
/// no stacktraces leaked to user
/// 实际环境的错误处理
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        layout:false,
        message: err.message,
        error: {}
    });
});


module.exports = app;
