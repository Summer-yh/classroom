var express = require('express');
var router = express.Router();
var app = express();
var m_user = require('../model/m_user');
var m_video = require('../model/m_video');
/* GET home page. */
router.get('/index.html', function(req, res) {
    m_video.queryVideo(req, res, function(result){
        if(result.length > 0) {
            res.render('index', {
                title: '党校',
                stylesheet: 'index',
                jscript:'index',
                data: result
            });
            console.log(req.cookies.username);

        } else{
            res.render('login.html', {
                title: '党学讲堂'
            });
        }
    });

});
router.get('/login.html', function(req, res) {
    res.render('login', {
        title: '党学讲堂',
        stylesheet: 'index',
        jscript:'login',
        waha: [
            { title: '你是一只猪', content: '/images/test.jpg', id: 'icon1' },
            { title: '你是一只猪你是一只猪', content: '/images/test.jpg', id: 'icon2' },
            { title: '你是一只猪', content: '/images/vtest.jpg', id: 'icon3' },
            { title: 'aha', content: '/images/vtest.jpg', id: 'icon3' }
        ]
    });
});

router.post('/login', function(req, res, next) {
    m_user.login(req, res, function(result){
        if(result.length > 0) {
            for(var key in result[0]){
                res.cookie(
                    key,result[0][key],
                    { maxAge: 900000 }
                );
            }
            // res.json(result);
            res.redirect('/PartyLecture/index.html');
        } else{
            res.redirect('/PartyLecture/login.html');
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
