var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Express',
    stylesheet: 'index',
    waha: [
    {title:'hahaha',content:'54545'},
    {title:'haha',content:'54545'},
    {title:'hha',content:'54545'},
    {title:'aha',content:'54545'}
    ]
});
});

module.exports = router;
