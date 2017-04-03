var pool = require('./db');
var sql = require('./video_sql');
var video = {
    queryVideo:function (req, res, callback) {
        pool.getConnection(function(err, connection) {
            // 建立连接，查询用户
            connection.query(sql.queryAll,function(err, result) {
                callback(result);
                // 释放连接
                connection.release();
            });
        });
    },
    //通过vid查询单个视频信息
    selectVideo:function(req,res,vid,callback){
        pool.getConnection(function(err, connection) {
            // 建立连接，查询用户
            connection.query(sql.queryById,[vid],function(err, result) {
                callback(result);
                // 释放连接
                connection.release();
            });
        });
    }
}
module.exports = video;
