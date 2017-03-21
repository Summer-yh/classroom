var express = require('express');
var router = express.Router();
var m_user = require('../model/m_user');


/* GET users admin page. */
router.get('/index.html', function(req, res) {
  res.render('admin', {
    title: 'Express',
    stylesheet: 'admin',
    jscript:'fe_admin',
    layout:false,
    option_year:['2017','2016','2015'],
    option_number:['18期','19期','20期'],
    user:[{
        name:'何宇虹',
        stu_id:'201330330103',
        sex:'女',
        tel:'18814127584',
        number:'18期',
        year1:'2014',
        year2:'2015',
        year3:'2018',
        status:'入党积极分子',
        grade:'2013级',
        major:'软件工程1班'
      },
      {
          name:'何宇虹',
          stu_id:'201330330103',
          sex:'女',
          tel:'18814127584',
          number:'18期',
          year1:'2014',
          year2:'2015',
          year3:'2016',
          status:'入党积极分子',
          grade:'2013',
          major:'软件工程1班'
        }]
});
});


router.get('/searchMenber', function(req, res, next) {
    var uid = req.query.uid;
    m_user.searchMenberById(uid,function(result){
        if(result.length > 0) {
            res.send(result);
        } else{
            // res.redirect('/PartyLecture/login.html');
        }
    });
});
module.exports = router;
