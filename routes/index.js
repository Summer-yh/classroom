var express = require('express');
var router = express.Router();
var app = express();
var m_user = require('../model/m_user');
var m_video = require('../model/m_video');
var m_article = require('../model/m_article');
var async = require('async');
/* GET home page. */
router.get('/index.html', function(req, res) {
    async.series([
        function(callback){
            m_video.queryVideo(req, res, function(result){
                callback(null,result);
            });
        },
        function(callback){
            m_article.queryArticle(req, res, function(result){
                callback(null,result);
            });
        }
    ], function(err, result){
        console.log(result[0]);
        if(result.length > 0) {
            res.render('index', {
                title: '党校课堂-首页',
                stylesheet: 'index',
                jscript:'index',
                video: result[0],
                article:result[1]
            });
            console.log(req.cookies.username);
        } else{
            res.render('login.html', {
                title: '党校课堂-登陆'
            });
        }
    });
});

router.get('/videoCollection.html', function(req, res) {
    m_video.numberVideo(req, res, function(result){
        var s = result[0].sTime;
        var arr = [];
        var number = [];
        for (var i = s; i > 0; i--) {
            number.push(i);
        }
        if(result.length > 0) {
            for (var i = 0; i < result.length; i++) {
                if(result[i].sTime = s){
                    arr.push(result[i]);
                }
                else{
                    break;
                }
            }
            res.render('videoCollection', {
                title: '党校课堂-课程',
                stylesheet: 'index',
                jscript:'index',
                video: arr,
                number:number
            });
        } else{
            res.render('login.html', {
                title: '登陆页面'
            });
        }
    });
});
router.get('/selectList', function(req, res, next) {
    var data = req.query.number;
    m_video.selectByNumber(data,function(result){
        if(result.length > 0) {
            res.send(result);
        } else{
            res.send(0);
        }
    });
});


router.get('/newsCollection.html', function(req, res) {
    m_video.queryArticle(function(result){
        if(result.length > 0) {
            res.render('newsCollection', {
                title: '党校课堂-专题时刊',
                stylesheet: 'index',
                jscript:'index',
                article:result
            });
        } else{
            res.render('login.html', {
                title: '登陆页面'
            });
        }
    });
});

module.exports = router;
