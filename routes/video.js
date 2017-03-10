var express = require('express');
var m_video = require('../model/m_video');
var url = require('url')
var router = express.Router();

/* GET users listing. */
router.get('/:id.html', function(req, res) {
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

module.exports = router;
