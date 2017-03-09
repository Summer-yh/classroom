var mysql = require('mysql');

var pool = mysql.createPool({
    host : '127.0.0.1',
    user : 'root',
    password : '5206890102a',
    database : 'liveClass'
});

module.exports = pool;










// var mysql = require('mysql');
//
// var config = {
//     host : '127.0.0.1',
//     user : 'root',
//     password : '5206890102a',
//     database : 'liveClass'
// }
//
// var conn = '';
// var pool = {
//     // conn : '',
//     // 创建连接
//     connection:function (err) {
//         conn = mysql.createConnection(config);
//         // 创建连接后不论是否成功都会调用
//         conn.connect(function(err){
//             if(err) console.log(err);
//             console.log('connect success!');
//         });
//     },
//     // 关闭连接时调用
//     released:function(err){
//         //if(err) throw err;
//         console.log(err);
//         connection.release();
//     }
// }
//
// module.exports = pool;
