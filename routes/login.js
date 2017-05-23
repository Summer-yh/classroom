var express = require('express');
var router = express.Router();
var m_user = require('../model/m_user');

/* GET users login page. */
router.get('/index.html', function(req, res) {
    res.render('login', {
        title: '登陆页面',
        stylesheet: 'login',
        layout:false,
        jscript:'login'
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
module.exports = router;
