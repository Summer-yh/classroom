var pool = require('./db');

var user = {
    //用户登录
    login:function(loginid,password,callback){
        conn.query('SELECT * FROM `user` WHERE `uid`=? AND `password`=?',[loginid,password],function(err,res){
            if(err){
                throw err;
            }
            callback(res);
        })
    },
    //添加成员
    addSingleMenber:function (uid,callback) {
        conn.query('SELECT * FROM `allUser` WHERE `uid`=? ',[uid],function(err,res){
            if(err){
                throw err;
            }
            callback(res);
        })
    },
    //确认添加
    addAllMenber:function (err,data) {
        conn.query(INSERT INTO user VALUES (data);
    },
    //查询成员
    searchMenber:function (number,callback) {
        conn.query('SELECT * FROM `user` WHERE `uid`=?',[number],function(){
            if (err) {
                throw err;
            }
            callback(res);
        })
    }
}
exports.user = user;
