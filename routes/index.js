var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index.html', function(req, res) {
  res.render('index', {
    title: 'Express',
    stylesheet: 'index'
});
});

module.exports = router;
