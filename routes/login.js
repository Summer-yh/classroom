var express = require('express');
var router = express.Router();

/* GET users login page. */
router.get('/login.html', function(req, res, next) {
  	res.render('login', {
        errmsg:'页面出差'
    });
});
module.exports = router;
