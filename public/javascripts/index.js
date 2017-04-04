// 所有模块都通过 define 来定义
define(function(require, exports, module) {
    var $ = require('jquery');
    var data = {
        init:function () {
            var json = [
                {"trigger":".user_nav","item":".user_section"},
                {"trigger":".user_section","item":".user_section"}
            ];
            this.setInfo();
            this.hoverInfo(json);
        },
        setInfo:function () {
            var data = document.cookie.split(',');
            // console.log(data);
            $('.nav_bar_item').val(data.username);
            // $('.class_number').val() = document.cookie.intergral;
            // $('.class_done').val() = document.cookie.number;
            // $('.user_status').val() = document.cookie.status;
            // $('.nav_bar_item').val();
        },
        hoverInfo:function (data) {
            for(var i=0; i<data.length; i++){
                var index=i;
                var timer;
                $(data[i].trigger).hover(
                    function () {
                        if(timer){
                            clearTimeout(timer);
                        }
                        // console.log($(this));
                        $(data[index].item).fadeIn();
                    },
                    function () {
                        timer = setTimeout(function () {
                            $(data[index].item).fadeOut();
                        },200);
                    }//注意闭包问题
                );
            }(i)
        }
    }
    data.init();

});
