var express = require('express');
var m_video = require('../model/m_video');
var url = require('url')
var router = express.Router();

/* GET users listing. */
router.get('/videoWatching/:id.html', function(req, res) {
    var arg = url.parse(req.url, true).query;
    var vid = arg.vid;
    m_video.selectVideo(req,res,vid,function(result){
        if(result.length > 0) {
            var title = result[0].vname;
            var path = result[0].path;
            console.log(title);
            res.render('video', {
                title: title,
                stylesheet: 'video',
                jscript:'video',
                path:path
            });
        } else{
            res.render('login.html', {
                title: '党学讲堂'
            });
        }
    });
});

router.get('/articleReading/:id.html', function(req, res) {
    var arg = url.parse(req.url, true).query;
    var aid = arg.aid;
    m_video.queryArticleById(aid,function(result){
        if(result.length > 0) {
            var articleTitle = result[0].title;
            var author = result[0].author;
            var time = result[0].time;
            var read = result[0].readNumber;
            var newRead = read + 1;
            m_video.updateReadById(aid,newRead,function (result) {
                if(result.affectedRows>0){
                    console.log('更新成功');
                }
            });
            res.render('articleReading', {
                title: '党学讲堂-专题时刊',
                articleTitle:articleTitle,
                author: author,
                time: time,
                read: read,
                stylesheet: 'video',
                jscript:''
            });
        } else{
            res.render('login.html', {
                title: '党学讲堂'
            });
        }
    });
});
module.exports = router;
