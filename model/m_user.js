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
                callback(result);
                // 以json形式，把操作结果返回给前台页面
                // jsonWrite(res, result);
                // 释放连接
                connection.release();
            });
        });
    },
    //添加成员
    // addByUid:function (req, res, next) {
    //     pool.getConnection(function(err, connection) {
    //         // 获取前台页面传过来的参数组(此处指uid或者timeNumber)
    //         var param = req.query || req.params;
    //         // 建立连接，向表中插入值
    //         connection.query(sql.insert, [param.uid], function(err, result) {
    //             console.log(result);
    //             if(result) {
    //                 result = {
    //                     code: 200,
    //                     msg:'增加成功'
    //                 };
    //             }
    //             // 以json形式，把操作结果返回给前台页面
    //             jsonWrite(res, result);
    //             // 释放连接
    //             connection.release();
    //         });
    //     });
    // }

    //查询成员
    searchMenber:function (uid,callback) {
        pool.getConnection(function(err, connection) {
            // 建立连接，查询用户
            connection.query(sql.queryById, [uid], function(err, result) {
                callback(result);
                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);
                // 释放连接
                connection.release();
            });
        });
}
}
module.exports = user;
