var express = require('express');
var videoObj = require('../model/m_video');
var router = express.Router();

/* GET users listing. */
router.get('/:id.html', function(req, res) {
    // var vid = res.params.id;
    // var vname = '';
    //     console.log(vid);
    // videoObj.selectVideo(vid,function (res) {
    //     console.log(res);
    //     vname = res.vname;
    // });
    res.render('video', {
        title: res.params.id,
        stylesheet: 'video',
        jscript:'video'
    });
});

module.exports = router;
