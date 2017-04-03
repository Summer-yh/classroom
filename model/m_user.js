var pool = require('./db');
var sql = require('./user_sql');
var cookieParser = require('cookie-parser');
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

var user = {
    //用户登录
    login:function (req, res, callback) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数组(此处指uid或者timeNumber)
            var param = req.body;
            // 建立连接，查询用户
            connection.query(sql.login, [param.uid,param.password], function(err, result) {
                callback(result);;
                // 释放连接
                connection.release();
            });
        });
    },
    // 添加成员
    addAllUser:function (data,callback) {
        pool.getConnection(function(err, connection) {
            // 建立连接，向表中插入值
            connection.query(sql.insert, [data.sTime,data.uid], function(err, result) {
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };
                    callback(result);
                } else{
                    console.log('error');
                }
                // 释放连接
                connection.release();
            });
        });
    },
    //查询成员
    searchMenberById:function (uid,callback) {
        pool.getConnection(function(err, connection) {
            // 建立连接，查询用户
            connection.query(sql.queryById, [uid], function(err, result) {
                callback(result);
                // console.log(result);
                // 释放连接
                connection.release();
            });
        });
    },
    //查看所有人电话
    searchTel:function (callback) {
        pool.getConnection(function(err, connection) {
            // 建立连接，查询用户
            connection.query(sql.queryAll, function(err, result) {
                callback(result);
                // console.log(result);
                // 释放连接
                connection.release();
            });
        });
    },
    //查询成员
    searchMenberByNumber:function (sTime,callback) {
        pool.getConnection(function(err, connection) {
            // 建立连接，查询用户
            connection.query(sql.queryByNumber, [sTime], function(err, result) {
                console.log(result);
                callback(result);
                // 释放连接
                connection.release();
            });
        });
    },
    //发布文章
    deliverArticle:function (title,content,callback) {
        pool.getConnection(function(err, connection) {
            // 建立连接，查询用户
            connection.query(sql.insertArticle, [title,content], function(err, result) {
                // console.log(result);
                callback(result);
                // 释放连接
                connection.release();
            });
        });
    }
}
module.exports = user;
