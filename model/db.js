var mysql = require('mysql');

var config = {
    host : '127.0.0.1',
    user : 'root',
    password : '123',
    database : 'test'
}

var pool = {
    // 创建连接
    connection:function (err) {
        var conn = mysql.createConnection(config);
        // 创建连接后不论是否成功都会调用
        conn.connect(function(err){
            if(err) throw err;
            console.log('connect success!');
        });
    },
    // 关闭连接时调用
    released:function(err){
        //if(err) throw err;
        console.log(err);
        connection.release();
    }
}

module.exports = pool;
