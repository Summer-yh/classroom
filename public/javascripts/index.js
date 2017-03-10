// 所有模块都通过 define 来定义
define(function(require, exports, module) {
    var $ = require('jquery');
    var data = {
        init:function () {
            this.setInfo();
            this.hoverInfo();
        },
        setInfo:function () {
            var data = document.cookie.split(',');
            console.log(data);
            $('.nav_bar_item').val(data.username);
            // $('.class_number').val() = document.cookie.intergral;
            // $('.class_done').val() = document.cookie.number;
            // $('.user_status').val() = document.cookie.status;
            // $('.nav_bar_item').val();
        },
        hoverInfo:function () {
            $(".user_nav").hover(
                function () {
                    $('.user_section').show();
                },
                function () {
                    $('.user_section').hide();
                }
            );
        }
    }
    data.init();

});
