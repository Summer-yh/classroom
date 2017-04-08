// 所有模块都通过 define 来定义
define(function(require, exports, module) {
    var $ = require('jquery');
    var temp = require('temp');
    var data = {
        init:function () {
            var json = [
                {"trigger":".user_nav","item":".user_section"},
                {"trigger":".user_section","item":".user_section"}
            ];
            this.setInfo();
            this.hoverInfo(json);
            this.selectList();
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
        },
        selectList:function () {
            $('.search_by_number').click(function () {
                var data = {
                    number:$('.select_number').val()
                }
                $.ajax({
                    url:'/PartyLecture/selectList',
                    type:'get',
                    data:data,
                    timeout:5000,    //超时时间
                    success:function(res){
                        var template = Handlebars.compile(temp.m4);
                        $('.content_block').empty();
                        for (var i = 0; i < res.length; i++) {
                            var html = template(res[i]);
                            $('.content_block').append(html);
                        }
                    },
            })
        })
    }
}
    data.init();

});
