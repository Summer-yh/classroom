// define(function(require, exports, module) {
    var express = require('express');
    var router = express.Router();
    var m_user = require('../model/m_user');
    var message = require('../model/message');


    /* GET users admin page. */
    router.get('/index.html', function(req, res) {
      res.render('admin', {
        title: 'Express',
        stylesheet: 'admin',
        jscript:'fe_admin',
        layout:false,
        option_year:['2017','2016','2015'],
        option_number:['18','19','20'],
        // userName:'{{userName}}',
        user:[{
            userName:'何宇虹',
            uid:'201330330103',
            sex:'女',
            tel:'18814127584',
            sTime:'18',
            year1:'2014',
            year2:'2015',
            year3:'2018',
            status:'入党积极分子',
            grade:'2013级',
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
    router.get('/searchMenber2', function(req, res, next) {
        var sTime = req.query.sTime;
        m_user.searchMenberByNumber(sTime,function(result){
            console.log(result);
            if(result.length > 0) {
                res.send(result);
            } else{
                // res.redirect('/PartyLecture/login.html');
            }
        });
    });
    router.post('/comfirm_add', function(req, res, next) {
        var data = req.body;
        m_user.addAllUser(data,function(result){
                console.log(result);
                res.send(result);
        })
    });
    router.post('/sendMessage', function(req, res, next) {
        m_user.searchTel(function(result){
            console.log(result);
            if(result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    message.init(result[i].tel);
                }
                res.send('短信发送成功');
            } else{
                console.log('error');
            }
        });
    });
    router.post('/deliverArticle', function(req, res, next) {
        var title = req.body.title;
        var content = req.body.content;
        m_user.deliverArticle(title,content,function(result){
                // console.log(result);
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };
                    res.send(result);
                } else{
                    console.log('error');
                }

        })
    });
    module.exports = router;
// });
