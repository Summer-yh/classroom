// 所有模块都通过 define 来定义
define(function(require, exports, module) {
    var $ = require('jquery');

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
            $('.full_btn').click(function() {
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

    Video.init();
    // 或者通过 module.exports 提供整个接口
    // module.exports = Chat;

});
