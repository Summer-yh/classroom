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
    numberVideo:function (req, res, callback) {
        pool.getConnection(function(err, connection) {
            // 建立连接，查询用户
            connection.query(sql.numberVideo,function(err, result) {
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
    },
    //通过期数查询视频
    selectByNumber:function(sTime,callback){
        pool.getConnection(function(err, connection) {
            // 建立连接，查询用户
            connection.query(sql.queryByNumber,[sTime],function(err, result) {
                callback(result);
                // 释放连接
                connection.release();
            });
        });
    },
    //查找所有文章
    queryArticle:function(callback){
        pool.getConnection(function(err, connection) {
            // 建立连接，查询用户
            connection.query(sql.queryArticle,function(err, result) {
                callback(result);
                // 释放连接
                connection.release();
            });
        });
    },
    //查找所有文章
    queryArticleById:function(aid,callback){
        pool.getConnection(function(err, connection) {
            // 建立连接，查询用户
            console.log('aid='+aid);
            connection.query(sql.queryArticleById,[aid],function(err, result) {
                callback(result);
                // 释放连接
                connection.release();
            });
        });
    },
    //更新文章已读
    updateReadById:function(aid,read,callback){
        pool.getConnection(function(err, connection) {
            // 建立连接，查询用户
            connection.query(sql.updateReadById,[read,aid],function(err, result) {
                callback(result);
                // 释放连接
                connection.release();
            });
        });
    }
}
module.exports = video;
