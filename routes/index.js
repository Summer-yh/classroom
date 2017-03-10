var express = require('express');
var router = express.Router();
var app = express();
var m_user = require('../model/m_user');
var m_video = require('../model/m_video');
/* GET home page. */
router.get('/index.html', function(req, res) {
    m_video.queryVideo(req, res, function(result){
        if(result.length > 0) {
            res.render('index', {
                title: '党校',
                stylesheet: 'index',
                jscript:'index',
                data: result
            });
            console.log(req.cookies.username);

        } else{
            res.render('login.html', {
                title: '党学讲堂'
            });
        }
    });

});
router.get('/login.html', function(req, res) {
    res.render('login', {
        title: '党学讲堂',
        stylesheet: 'index',
        jscript:'login',
        waha: [
            { title: '你是一只猪', content: '/images/test.jpg', id: 'icon1' },
            { title: '你是一只猪你是一只猪', content: '/images/test.jpg', id: 'icon2' },
            { title: '你是一只猪', content: '/images/vtest.jpg', id: 'icon3' },
            { title: 'aha', content: '/images/vtest.jpg', id: 'icon3' }
        ]
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
router.get('/videoCollection.html', function(req, res) {
    res.render('videoCollection', {
        title: '党校课堂',
        stylesheet: 'index',
        waha: [
            { title: '党校课堂', content: '/images/test.jpg', id: 'icon1' },
            { title: '你是一只猪你是一只猪', content: '/images/test.jpg', id: 'icon2' },
            { title: '你是一只猪', content: '/images/vtest.jpg', id: 'icon3' },
            { title: 'aha', content: '/images/vtest.jpg', id: 'icon3' }
        ]
    });
});
router.get('/newsCollection.html', function(req, res) {
    res.render('index', {
        title: '时事热点',
        stylesheet: 'index',
        waha: [
            { title: '时事热点', content: '/images/test.jpg', id: 'icon1' },
            { title: '你是一只猪你是一只猪', content: '/images/test.jpg', id: 'icon2' },
            { title: '你是一只猪', content: '/images/vtest.jpg', id: 'icon3' },
            { title: 'aha', content: '/images/vtest.jpg', id: 'icon3' }
        ]
    });
});




// //在线用户
// var onlineUsers = {};
// //当前在线人数
// var onlineCount = 0;
//

// var ws = io.listen(http);
// console.log('a ');
// ws.on('connection', function(socket) {
//     console.log('a user connected');
// });
// ws.on('disconnect', function(socket) {
//     console.log('a user disconnect!!!!!!!!!!!!!!!!!!!!');
// });
// io.on('connection', function(socket){
//     console.log('a user connected');

// 	//监听新用户加入
// 	// socket.on('login', function(obj){
// 		//将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
// 		socket.name = obj.userid;
//
// 		//检查在线列表，如果不在里面就加入
// 		if(!onlineUsers.hasOwnProperty(obj.userid)) {
// 			onlineUsers[obj.userid] = obj.username;
// 			//在线人数+1
// 			onlineCount++;
// 		}
//
// 		//向所有客户端广播用户加入
// 		io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
// 		console.log(obj.username+'加入了聊天室');
// 	});
//
// 	//监听用户退出
// 	socket.on('disconnect', function(){
// 		//将退出的用户从在线列表中删除
// 		if(onlineUsers.hasOwnProperty(socket.name)) {
// 			//退出用户的信息
// 			var obj = {userid:socket.name, username:onlineUsers[socket.name]};
//
// 			//删除
// 			delete onlineUsers[socket.name];
// 			//在线人数-1
// 			onlineCount--;
//
// 			//向所有客户端广播用户退出
// 			io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
// 			console.log(obj.username+'退出了聊天室');
// 		}
// 	});
//
// 	//监听用户发布聊天内容
// 	socket.on('message', function(obj){
// 		//向所有客户端广播发布的消息
// 		io.emit('message', obj);
// 		console.log(obj.username+'说：'+obj.content);
// 	});
//
// });

module.exports = router;
