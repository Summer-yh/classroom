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
                title: '党校课堂',
                stylesheet: 'index',
                jscript:'index',
                video: result[0],
                article:result[1]
            });
            console.log(req.cookies.username);
        } else{
            res.render('login.html', {
                title: '登陆页面'
            });
        }
    });
});

router.get('/videoCollection.html', function(req, res) {
    res.render('videoCollection', {
        title: '党校课堂',
        stylesheet: 'index',
        waha: [
            { title: '党校课堂', content: '/images/test.jpg', id: 'icon1' },
            { title: '你是一只猪你是一只猪', content: '/images/test.jpg', id: 'icon2' },
            { title: '你是一只猪', content: '/images/vtest.jpg', id: 'icon3' },
            { title: 'aha', content: '/images/vtest.jpg', id: 'icon3' }
        ]
    });
});
router.get('/newsCollection.html', function(req, res) {
    res.render('index', {
        title: '时事热点',
        stylesheet: 'index',
        waha: [
            { title: '时事热点', content: '/images/test.jpg', id: 'icon1' },
            { title: '你是一只猪你是一只猪', content: '/images/test.jpg', id: 'icon2' },
            { title: '你是一只猪', content: '/images/vtest.jpg', id: 'icon3' },
            { title: 'aha', content: '/images/vtest.jpg', id: 'icon3' }
        ]
    });
});

module.exports = router;
