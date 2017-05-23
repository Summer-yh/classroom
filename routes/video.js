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
            var content = result[0].content;
            var year = result[0].time.getFullYear();
            var month = result[0].time.getMonth()+1;
            var date = result[0].time.getDate();
            var time = year + '年' + month +'月' + date + '日';
            var read = result[0].readNumber;
            var newRead = read + 1;
            m_video.updateReadById(aid,'2016-1-22',function (result) {
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
                content: content,
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
