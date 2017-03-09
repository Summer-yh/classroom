// 所有模块都通过 define 来定义
define(function(require, exports, module) {
    var $ = require('jquery');
    var io = require('socket.io.js');


    $video = $('#myVideo')[0];

    //视频部分
    var Video = {
        init: function() {
            this.playOrPaused();
            this.time();
            this.fullScreen();
        },
        //播放与暂停
        playOrPaused: function() {
            $('.paused').click(function() {
                if ($video.paused) {
                    $video.play();
                } else {
                    $video.pause();
                }
            })
            // return false;
        },
        //转换时间格式
        dealTime: function(timeLenght) {
            var timeLenght = parseInt(timeLenght);
            var second = timeLenght % 60;
            var min = (timeLenght - second) / 60;
            second = second > 9 ? second : '0' + second;
            min = min > 9 ? min : '0' + min;
            return min + ':' + second;
        },
        //总时间和当前播放时刻
        time: function() {
            var _self = this;
            $video.onloadedmetadata = function() {
                var timer = _self.dealTime($video.duration)
                $('.duration_time').text(timer);
            }
            $video.ontimeupdate = function() {
                var timer = _self.dealTime($video.currentTime)
                $('.current_time').text(timer);
            }
        },
        //全屏
        fullScreen: function() {
            $('.full_screen').click(function() {
                console.log($video);
                //For Webkit
                if ($video.webkitEnterFullscreen) {
                    $video.webkitEnterFullscreen();
                } else if ($video.mozRequestFullScreen) {
                    $video.mozRequestFullScreen();
                } else if ($video.msRequestFullscreen) {
                    $video.msRequestFullscreen();
                }
                return false;
            })
        }
    };


    // 聊天窗部分
    var Chat = {
        socket:null,
        init: function() {
            this.socket = io.connect('ws://127.0.0.1:3000');
            // console.log(io)
            this.listener();
            this.startEnter();
        },
        addMessage: function(from, msg) {
            var li = document.createElement('li');
            li.innerHTML = '<span>' + from + '</span>' + ' : ' + msg;
            document.querySelector('#chat_container').appendChild(li);
            // 设置内容区的滚动条到底部
            document.querySelector('#chat').scrollTop = document.querySelector('#chat').scrollHeight;
            // 并设置焦点
            document.querySelector('textarea').focus();
        },
        enter:function () {
            this.socket.on('login', function(o){
				CHAT.updateSysMsg(o, 'login');
			});
        },
        //监听发送
        sendMessage: function() {
            var _self = this;
            this.socket.on('message', function(obj){
                // var isUser = (obj.userid == CHAT.userid) ? true : false;
                _self.addMessage(obj.username,obj.content);
                _self.scrollToBottom();
            });
        },
        startEnter: function() {
            this.socket.on('starChat', function() {
                var nickname = '我我我';
                this.socket.emit('join', nickname);
            });
            //检查是否已经存在聊天室（用于限制同时刻只能观看一个视频）
            _self.ws.on('nickname', function() {
                nickname = window.prompt('您已正在观看视频，请勿重复登录!')
                _self.ws.emit('join', nickname);
            });
            _self.ws.on('send.message', function(from, msg) {
                _self.addMessage(from, msg);
            });
            _self.ws.on('proclaim', function(from, msg) {
                _self.addMessage(from, msg);
            });
        },
        listener: function() {
            var _self = this;
            var textArea = document.querySelector('textarea'),
            btnSend = document.querySelector('.btn-send'),
            btnClear = document.querySelector('.btn-clear');
            textArea.addEventListener('keypress', function(event) {
                if (event.which == 13) { //enter键
                    _self.sendMessage();
                }
            });
            textArea.addEventListener('keydown', function(event) {
                if (event.which == 13) {
                    _self.sendMessage();
                }
            });
            btnSend.addEventListener('click', function() {
                _self.sendMessage();
            });

            btnClear.addEventListener('click', function() {
                document.querySelector('#chat_conatiner').innerHTML = '';
            });
        }
    }
    Video.init();
    // 或者通过 module.exports 提供整个接口
    // module.exports = Chat;

});
